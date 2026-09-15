export default function decorate(block) {
  // hero-overlay: a full-bleed background image with an overlaid content card
  // (heading, description, CTA). The xwalk/JCR structure delivers the cells as
  // stacked single-cell rows (an image row and a text/richtext row), while an
  // older table structure may deliver a single 2-column row. Collect all leaf
  // cells from every row and classify each as the background image or content.
  const cells = [...block.children].flatMap((row) => {
    const inner = [...row.children];
    return inner.length ? inner : [row];
  });

  cells.forEach((col) => {
    const pic = col.querySelector('picture');
    const bareImg = col.querySelector(':scope > p > img, :scope > img');
    if ((pic || bareImg) && col.children.length === 1) {
      // background image cell — rendered full-bleed behind the content card
      col.classList.add('hero-overlay-image');
      return;
    }

    // content card cell — heading, description, CTA
    col.classList.add('hero-overlay-content');

    // promote a standalone trailing link to a button (secondary sections are
    // not auto-promoted by decorateButtons, so do it here)
    const lastP = col.querySelector(':scope > p:last-child');
    const link = lastP && lastP.querySelector(':scope > a');
    if (link && lastP.textContent.trim() === link.textContent.trim()) {
      link.classList.add('button');
    }
  });
}
