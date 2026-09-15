import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the cards-article block.
 * Converts authored rows into a <ul>/<li> grid of article cards.
 * Each card has an image region (.cards-card-image) and a text region
 * (.cards-card-body) with a heading link and a short description.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1
        && (div.querySelector('picture') || div.querySelector(':scope > p > img'))) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
