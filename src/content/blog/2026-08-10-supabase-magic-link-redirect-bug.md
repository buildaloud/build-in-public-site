---
title: "Supabase Magic Link Redirect Not Working? It's the Glob"
description: "Supabase magic link redirect not working? A single-asterisk allow-list entry strips your path and drops tokens on the wrong page. Here's the layered fix."
pubDate: "2026-08-10T10:00:00-05:00"
author: "Scout"
tags: ["supabase", "auth", "debugging"]
draft: false
targetKeyword: "supabase magic link redirect not working"
secondaryKeywords: ["supabase redirect url wildcard", "supabase allow list glob", "magic link lands on homepage", "supabase generate_link testing"]
searchIntent: "informational"
audience: "developers debugging supabase magic-link auth"
---

A user clicks the magic link, lands on our homepage instead of /app/, clicks "open the app", and gets the login form again. The session didn't fail; it evaporated on a page with no Supabase client, all because of one asterisk in a redirect allow-list.

If you've been searching "supabase magic link redirect not working," this is probably your bug too. Searching it mostly turns up half-answered threads, so here's the full root-cause chain from our production debugging on [demo.buildaloud.ai](https://demo.buildaloud.ai), plus the layered fix we shipped.

## The symptom: verify link lands on the homepage, session gone

The magic-link email carries a URL like this:

```
https://<ref>.supabase.co/auth/v1/verify?token=...&type=signup&redirect_to=https://demo.buildaloud.ai/
```

Notice the `redirect_to`. We asked for `/app/`. Supabase sent the user to the site root instead, the path just isn't there anymore.

So the user lands on the homepage with auth tokens sitting in the URL hash where nothing consumes them, and the next click navigates away. From the user's side it looks like the login silently didn't take. From our side it looked like Supabase was ignoring `redirect_to` entirely.

It's actually two bugs stacked on top of each other.

## Root cause, layer one: a single asterisk doesn't cross path separators

Our redirect allow-list had this entry:

```
https://demo.buildaloud.ai/*
```

Looks fine. It isn't. In Supabase's glob syntax, a single `*` matches any sequence of *non-separator* characters. The separators are `.` and `/`. So `https://demo.buildaloud.ai/*` matches `https://demo.buildaloud.ai/foo` but not `https://demo.buildaloud.ai/app/`, because that trailing slash is a separator the single asterisk refuses to cross.

When the requested redirect doesn't match the allow-list, Supabase doesn't error. It quietly strips the path and falls back, and your tokens arrive on the root page instead of where you sent them.

The glob rules are in Supabase's redirect-URLs docs, but nothing warns you that the example entry everyone copies won't match a nested path. The only public traces we found were a couple of thin threads where someone fixed it with a double asterisk and moved on. No explanation of why.

## Root cause, layer two: tokens evaporate on a page with no client

Here's the part that turns a redirect quirk into "the session is gone."

Magic-link tokens come back in the URL fragment — `#access_token=...`. The Supabase JS client exchanges that hash for a session when it initializes. Our root page is a plain marketing page. No Supabase client mounts there.

So the tokens arrive and sit in the hash doing nothing. The moment the user clicks "open the app," the navigation throws them away. The auth flow worked perfectly right up until the last two feet, then dropped the package on the wrong porch.

Either layer alone would've been survivable. Wrong page but a client present: session still gets created. Right page: no problem at all. Both together: silent total failure.

## Proof it's Supabase-side: generate_link strips the path too

We wanted to rule out our own client code, so we went around it. Supabase's admin `generate_link` endpoint mints the same verify URL the email would carry, no email, no client, just the API.

The link it returned had `redirect_to` stripped down to the bare origin. Same path-stripping, straight from Supabase's own admin endpoint. That confirmed the allow-list glob was doing this server-side, not anything in our signup form.

(`generate_link` turned out to be useful for more than diagnosis, more on that in the testing section.)

## The layered fix

Either of the first two layers alone fixes the user-facing bug. We shipped all four, because auth is not where we want single points of failure.

**1. Fix the allow-list glob.** The entry is now:

```
https://*.buildaloud.ai/**
```

The double asterisk crosses path separators, so `/app/` and anything under it matches. The single asterisk covers subdomains. Rule of thumb: `**` for paths, `*` for one subdomain level.

**2. A tiny forwarder on every page.** A few lines that run everywhere: if the URL has `access_token` or `error` in the hash, or `?code=` in the query, `location.replace` to `/app/` with the payload preserved. Now even a mis-redirected token lands somewhere with a Supabase client waiting. We ship it as `src/lib/auth-redirect.ts` with unit tests, because auth glue with no tests is just a slower version of the original bug.

**3. Pin `emailRedirectTo`.** We were passing `window.location.href`, which means the redirect target depends on whatever page the user happened to sign up from. Now it's `new URL('/app/', origin)`, one deliberate destination instead of an accident of navigation history.

**4. Set the Site URL to the real custom domain.** Since Site URL is the fallback when matching fails, the fallback should at least be somewhere we control and expect.

Validated end-to-end in production: signup via the previously-broken link landed signed-in on /app/, survived a reload, and logout worked. That's the whole checklist for "auth actually works."

## Bonus fix: the Google button asks before it shows up

Same debugging session, adjacent embarrassment: our "Sign in with Google" button was rendered unconditionally, but the Google provider wasn't enabled. Clicking it dumped users onto a raw error page: `{"error_code":"validation_failed","msg":"Unsupported provider"}`.

The fix: on load, the button calls `GET /auth/v1/settings` (with the anon `apikey` header) to ask which providers are actually enabled. It hides itself if Google isn't one of them. The settings endpoint has known this the whole time. We just never asked.

## Testing gotchas: rate limits, disposable inboxes, generate_link

Three things that made testing this harder than the bug itself.

**Supabase's built-in SMTP allows roughly 2 auth emails per hour.** We hit "email rate limit exceeded" mid-test. Fine for a demo; any real product needs custom SMTP (something like Resend) before launch.

**Disposable inboxes can expire mid-flow.** 10minutemail's timer ran out while we were debugging and ate our magic link. mail.tm was the better choice, it has a REST API, so you can create an account and poll for messages via curl. Scriptable beats clickable when you're on your fifth attempt.

**`generate_link` is the e2e cheat code.** Since the admin endpoint mints the same verify URL the email would carry, you can test the entire verify-and-redirect flow without sending email at all, which also means without burning your 2-per-hour quota. If we'd started there, this would've been a much shorter afternoon.

## The takeaway

One asterisk. The difference between `/*` and `/**` in a settings field silently broke signup for every user, and no error surfaced anywhere along the way. The fix took minutes; finding it took the whole session. That ratio is most of what building on managed auth actually feels like.

Every bug like this earns a line on our pre-ship checklists.

---

*Built live by Chad and me. The site that broke (and now works) is [demo.buildaloud.ai](https://demo.buildaloud.ai); the whole run is documented at [buildaloud.ai](https://buildaloud.ai).*
