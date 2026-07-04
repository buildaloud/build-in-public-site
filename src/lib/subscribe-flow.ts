// Progressive-profiling subscribe: email first (already captured), then a
// two-question box. Skippable; answers become Buttondown tags.
// Built with DOM methods only — no HTML strings, nothing user-supplied
// ever renders as markup.

const ROLES: [string, string][] = [
  ['role-developer', 'developer'],
  ['role-founder', 'founder'],
  ['role-building-with-ai', 'building with AI'],
  ['role-marketing', 'marketing'],
  ['role-watching', 'just watching'],
];
const INTERESTS: [string, string][] = [
  ['int-how-to', 'how-to guides'],
  ['int-war-stories', 'war stories'],
  ['int-ai-meta', 'the AI-runs-this story'],
  ['int-launches', 'product launches'],
  ['int-numbers', 'the numbers'],
];

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function checkboxGroup(title: string, opts: [string, string][]): HTMLFieldSetElement {
  const group = el('fieldset', 'sub-group');
  group.appendChild(el('legend', undefined, title));
  for (const [tag, label] of opts) {
    const wrap = el('label', 'sub-opt');
    const box = el('input');
    box.type = 'checkbox';
    box.value = tag;
    wrap.appendChild(box);
    wrap.appendChild(document.createTextNode(` ${label}`));
    group.appendChild(wrap);
  }
  return group;
}

async function post(email: string, tags?: string[]): Promise<boolean> {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tags ? { email, tags } : { email }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function wireSubscribeForms(selector: string): void {
  for (const form of document.querySelectorAll<HTMLFormElement>(selector)) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.querySelector<HTMLInputElement>('input[type="email"]')?.value ?? '';
      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (button) button.disabled = true;

      const ok = await post(email);
      if (!ok) {
        if (button) button.disabled = false;
        form.querySelector('.sub-error')?.remove();
        form.appendChild(el('p', 'sub-error', "That didn't go through. Try again?"));
        return;
      }

      const box = el('div', 'sub-profile');
      box.appendChild(el('p', 'sub-thanks', "You're in. Two quick questions so the right stuff lands in your inbox?"));
      box.appendChild(checkboxGroup('I am a…', ROLES));
      box.appendChild(checkboxGroup('Send me more…', INTERESTS));
      const actions = el('div', 'sub-actions');
      const save = el('button', 'sub-save', 'Save');
      save.type = 'button';
      const skip = el('button', 'sub-skip', 'skip');
      skip.type = 'button';
      actions.append(save, skip);
      box.appendChild(actions);
      form.replaceWith(box);

      const done = (msg: string) => {
        box.replaceChildren(el('p', 'sub-thanks', msg));
      };
      skip.addEventListener('click', () => done('All set. Talk soon.'));
      save.addEventListener('click', async () => {
        const tags = [...box.querySelectorAll<HTMLInputElement>('input:checked')].map((i) => i.value);
        if (tags.length) await post(email, tags);
        done('Noted. Talk soon.');
      });
    });
  }
}
