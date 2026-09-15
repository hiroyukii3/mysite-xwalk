/* eslint-disable */
/* global WebImporter */
/**
 * Parser for featured-article.
 * Source: https://wknd.site/us/en.html — selector: .teaser.cmp-teaser--featured
 * Generated: 2026-09-15
 *
 * Simple block, 1 column. Model fields (in order): text (richtext), image, imageAlt.
 * imageAlt collapses into the <img> alt attribute (no comment).
 *   Row 1: block name
 *   Row 2: field:text — pretitle + title + description + CTA (richtext)
 *   Row 3: field:image — the teaser image
 */
export default function parse(element, { document }) {
  const pretitle = element.querySelector('.cmp-teaser__pretitle');
  const title = element.querySelector('.cmp-teaser__title, h2, h1, h3');
  const description = element.querySelector('.cmp-teaser__description');
  let ctas = Array.from(element.querySelectorAll('a.cmp-teaser__action-link'));
  if (!ctas.length) ctas = Array.from(element.querySelectorAll('.cmp-teaser__action-container a'));
  const img = element.querySelector('.cmp-teaser__image img, .cmp-image img, img');

  const cells = [];

  // Text row — field:text (richtext)
  const textNodes = [];
  if (pretitle) textNodes.push(pretitle);
  if (title) textNodes.push(title);
  if (description) textNodes.push(description);
  ctas.forEach((c) => textNodes.push(c));
  if (textNodes.length) {
    cells.push([[document.createComment(' field:text '), ...textNodes]]);
  }

  // Image row — field:image (alt carried on <img> alt attribute = imageAlt)
  if (img) {
    cells.push([[document.createComment(' field:image '), img]]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'featured-article', cells });
  element.replaceWith(block);
}
