/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-overlay (base: hero).
 * Source: https://wknd.site/us/en.html — selector: .teaser.cmp-teaser--hero.cmp-teaser--imagebottom
 * Generated: 2026-09-15
 *
 * Simple block, 1 column, exactly 3 rows (never more). Model fields: image, imageAlt, text.
 * imageAlt collapses into the <img> alt attribute (no comment).
 *   Row 1: block name
 *   Row 2: field:image — background image
 *   Row 3: field:text  — title + description + CTA (richtext)
 */
export default function parse(element, { document }) {
  const img = element.querySelector('.cmp-teaser__image img, .cmp-image img, img');
  const title = element.querySelector('.cmp-teaser__title, h1, h2, h3');
  const description = element.querySelector('.cmp-teaser__description');
  let ctas = Array.from(element.querySelectorAll('a.cmp-teaser__action-link'));
  if (!ctas.length) ctas = Array.from(element.querySelectorAll('.cmp-teaser__action-container a'));

  const cells = [];

  // Image row — field:image (alt carried on <img> alt attribute = imageAlt)
  if (img) {
    cells.push([[document.createComment(' field:image '), img]]);
  }

  // Text row — field:text (richtext)
  const textNodes = [];
  if (title) textNodes.push(title);
  if (description) textNodes.push(description);
  ctas.forEach((c) => textNodes.push(c));
  if (textNodes.length) {
    cells.push([[document.createComment(' field:text '), ...textNodes]]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}
