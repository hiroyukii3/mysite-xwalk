/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND site-wide cleanup.
 * All selectors verified against migration-work/cleaned.html (source: https://wknd.site/us/en.html).
 * Removes non-authorable site chrome so the import contains only page-level authorable content.
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Non-authorable widgets/overlays that could interfere with block parsing.
    // Verified in cleaned.html:
    //   <iframe id="destination_publishing_iframe_wkndsite_0" ...> (Adobe ID syncing) - line 566
    //   <div id="toggleNav"> mobile nav toggle - line 568
    //   <div id="mobileNav"> mobile navigation - line 574
    WebImporter.DOMUtils.remove(element, [
      '#destination_publishing_iframe_wkndsite_0',
      '#toggleNav',
      '#mobileNav',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome. Verified in cleaned.html:
    //   <header class="experiencefragment cmp-experiencefragment--header"> - line 5 (logo, main nav, language nav, sign-in, search)
    //   <footer class="experiencefragment cmp-experiencefragment--footer"> - line 471 (footer nav, follow-us, copyright)
    //   <iframe> - line 566 (also removed in beforeTransform; kept here as safety)
    //   stray empty <meta> tags inside cmp-image blocks - lines 183, 204, 227, 271, 334, 378
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      'iframe',
      'meta',
    ]);
  }
}
