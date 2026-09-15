/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-hero (base: carousel).
 * Source: https://wknd.site/us/en.html — selector: .carousel.cmp-carousel--hero
 * Generated: 2026-09-15
 *
 * Container block. Each slide (.cmp-carousel__item) becomes one row with two cells:
 *   - image cell  → field:image  (imageAlt collapses into the <img> alt attribute)
 *   - text  cell  → field:text   (title + description + CTA as richtext)
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.cmp-carousel__item');
  const cells = [];

  items.forEach((item) => {
    const img = item.querySelector('.cmp-teaser__image img, .cmp-image img, img');
    const title = item.querySelector('.cmp-teaser__title, h2, h1, h3');
    const description = item.querySelector('.cmp-teaser__description');
    let ctas = Array.from(item.querySelectorAll('a.cmp-teaser__action-link'));
    if (!ctas.length) ctas = Array.from(item.querySelectorAll('.cmp-teaser__action-container a'));

    // Image cell — field:image (alt text is carried on the <img> alt attribute = imageAlt)
    const imageCell = [];
    if (img) {
      imageCell.push(document.createComment(' field:image '));
      imageCell.push(img);
    }

    // Text cell — field:text (richtext: title, description, CTA)
    const textNodes = [];
    if (title) textNodes.push(title);
    if (description) textNodes.push(description);
    ctas.forEach((c) => textNodes.push(c));

    const textCell = [];
    if (textNodes.length) {
      textCell.push(document.createComment(' field:text '));
      textCell.push(...textNodes);
    }

    cells.push([imageCell.length ? imageCell : '', textCell.length ? textCell : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
