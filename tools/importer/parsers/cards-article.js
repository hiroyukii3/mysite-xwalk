/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article (base: cards).
 * Source: https://wknd.site/us/en.html — selector: .image-list.list
 * Generated: 2026-09-15
 *
 * Container block. Each card (.cmp-image-list__item) becomes one row with two cells:
 *   - image cell → field:image (imageAlt collapses into the <img> alt attribute)
 *   - text  cell → field:text  (title + description as richtext, wrapped in the title link)
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.cmp-image-list__item');
  const cells = [];

  items.forEach((item) => {
    const img = item.querySelector('.cmp-image-list__item-image img, .cmp-image img, img');
    const titleLink = item.querySelector('a.cmp-image-list__item-title-link');
    const titleText = item.querySelector('.cmp-image-list__item-title');
    const description = item.querySelector('.cmp-image-list__item-description');
    const href = titleLink ? titleLink.getAttribute('href') : null;

    // Image cell — field:image (alt carried on <img> alt attribute = imageAlt)
    const imageCell = [];
    if (img) {
      imageCell.push(document.createComment(' field:image '));
      imageCell.push(img);
    }

    // Text cell — field:text (richtext). Build a heading link (title) + description.
    const textNodes = [];
    if (titleText) {
      const titleContent = titleText.textContent.trim();
      if (titleContent) {
        const h3 = document.createElement('h3');
        if (href) {
          const a = document.createElement('a');
          a.setAttribute('href', href);
          a.textContent = titleContent;
          h3.appendChild(a);
        } else {
          h3.textContent = titleContent;
        }
        textNodes.push(h3);
      }
    }
    if (description) {
      const descText = description.textContent.trim();
      if (descText) {
        const p = document.createElement('p');
        p.textContent = descText;
        textNodes.push(p);
      }
    }

    const textCell = [];
    if (textNodes.length) {
      textCell.push(document.createComment(' field:text '));
      textCell.push(...textNodes);
    }

    cells.push([imageCell.length ? imageCell : '', textCell.length ? textCell : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
