export default function decorate(block) {
  // Support both a single 2-column row (older structure) and two stacked
  // single-cell rows (xwalk/JCR structure: text row + image row). Collect all
  // leaf cells from every row and classify each as image or content.
  const cells = [...block.children].flatMap((row) => {
    const inner = [...row.children];
    // a row may itself be the cell (single-column) or contain multiple cells
    return inner.length ? inner : [row];
  });

  cells.forEach((col) => {
    const pic = col.querySelector('picture');
    const bareImg = col.querySelector(':scope > p > img, :scope > img');
    if ((pic || bareImg) && col.children.length === 1) {
      // image column
      col.classList.add('featured-article-img-col');
      return;
    }

    // content column
    col.classList.add('featured-article-content');

    // eyebrow / pretitle — first paragraph with no link or image (plain bold text)
    const eyebrow = col.querySelector(':scope > p:first-child');
    if (eyebrow && !eyebrow.querySelector('a, img')) {
      eyebrow.classList.add('featured-article-eyebrow');
    }

    // promote the CTA link to a flat yellow button (secondary sections are
    // not auto-promoted by decorateButtons, so do it here)
    const lastP = col.querySelector(':scope > p:last-child');
    const link = lastP && lastP.querySelector(':scope > a');
    if (link && lastP.textContent.trim() === link.textContent.trim()) {
      link.classList.add('button');
    }
  });
}
