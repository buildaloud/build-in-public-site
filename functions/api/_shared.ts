// Shared Cloudflare Pages Function scaffolding. No @cloudflare/workers-types
// dep — see 519258e on main for why.
export type PagesFunction<E> = (context: { request: Request; env: E }) => Promise<Response>;

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
