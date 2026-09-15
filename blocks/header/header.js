// eslint-disable-next-line import/no-cycle
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * Toggle the mobile menu open/closed.
 * @param {Element} nav the nav element
 * @param {boolean|null} forceExpanded force a state, or null to toggle
 */
function toggleMenu(nav, forceExpanded = null) {
  const expanded = forceExpanded !== null
    ? !forceExpanded
    : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  if (button) {
    button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  }
  document.body.style.overflowY = (!expanded && !isDesktop.matches) ? 'hidden' : '';
}

/**
 * Build the search control from the nav fragment's "Search" placeholder section.
 * The fragment only carries the label text; the input/form is created here.
 * @param {Element} section the section that holds the search placeholder
 */
function decorateSearch(section) {
  section.textContent = '';
  const form = document.createElement('form');
  form.className = 'nav-search-form';
  form.setAttribute('role', 'search');
  form.action = '/us/en/search';

  const icon = document.createElement('span');
  icon.className = 'nav-search-icon';
  icon.setAttribute('aria-hidden', 'true');

  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.placeholder = 'SEARCH';
  input.setAttribute('aria-label', 'Search');

  form.append(icon, input);
  section.append(form);
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Load the header fragment. Try the site-local fragments folder first
  // (content source layout), then fall back to the conventional root paths so
  // it still resolves on localhost and DA/EDS production.
  let fragment = await loadFragment('/content/us/en/fragments/header');
  if (!fragment) fragment = await loadFragment('/us/en/fragments/header');
  if (!fragment) fragment = await loadFragment('/content/nav');
  if (!fragment) fragment = await loadFragment('/nav');
  if (!fragment) return;

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // The nav fragment references images with a relative "images/..." path, which
  // would otherwise resolve against the current page URL. Re-root them to the
  // content images folder so they load on any page.
  nav.querySelectorAll('img[src]').forEach((img) => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('/')) {
      img.src = new URL(`/${src.replace(/^\.?\//, '')}`, window.location.origin).href;
    }
  });

  // WKND header sections: utility bar, brand, nav links, search
  const classes = ['utility', 'brand', 'sections', 'search'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // strip auto-applied button styling from the brand logo link
  const navBrand = nav.querySelector('.nav-brand');
  if (navBrand) {
    const brandLink = navBrand.querySelector('a');
    if (brandLink) {
      brandLink.classList.remove('button');
      const wrap = brandLink.closest('.button-container');
      if (wrap) wrap.classList.remove('button-container');
    }
  }

  // strip button styling from utility links (Sign In, locale)
  const navUtility = nav.querySelector('.nav-utility');
  if (navUtility) {
    navUtility.querySelectorAll('a.button').forEach((a) => {
      a.classList.remove('button');
      const wrap = a.closest('.button-container');
      if (wrap) wrap.classList.remove('button-container');
    });
  }

  // build the search input from the placeholder section
  const navSearch = nav.querySelector('.nav-search');
  if (navSearch) decorateSearch(navSearch);

  // group brand + nav links + search into one centered "main bar" row,
  // leaving the utility bar as the full-width row above it
  const mainRow = document.createElement('div');
  mainRow.className = 'nav-main-row';
  [navBrand, nav.querySelector('.nav-sections'), navSearch].forEach((el) => {
    if (el) mainRow.append(el);
  });
  if (navUtility) navUtility.after(mainRow);
  else nav.prepend(mainRow);

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  // reset menu state when crossing the desktop/mobile breakpoint
  isDesktop.addEventListener('change', () => toggleMenu(nav, false));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
