// eslint-disable-next-line import/no-cycle
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // metadata-independent dual-fetch: /content first (localhost), then root (DA/EDS prod)
  let fragment = await loadFragment('/content/footer');
  if (!fragment) fragment = await loadFragment('/footer');
  if (!fragment) return;

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // re-root relative "images/..." refs so they load on any page
  footer.querySelectorAll('img[src]').forEach((img) => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('/')) {
      img.src = new URL(`/${src.replace(/^\.?\//, '')}`, window.location.origin).href;
    }
  });

  block.append(footer);
}
