/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document: document2 }) {
    const items = element.querySelectorAll(".cmp-carousel__item");
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector(".cmp-teaser__image img, .cmp-image img, img");
      const title = item.querySelector(".cmp-teaser__title, h2, h1, h3");
      const description = item.querySelector(".cmp-teaser__description");
      let ctas = Array.from(item.querySelectorAll("a.cmp-teaser__action-link"));
      if (!ctas.length) ctas = Array.from(item.querySelectorAll(".cmp-teaser__action-container a"));
      const imageCell = [];
      if (img) {
        imageCell.push(document2.createComment(" field:image "));
        imageCell.push(img);
      }
      const textNodes = [];
      if (title) textNodes.push(title);
      if (description) textNodes.push(description);
      ctas.forEach((c) => textNodes.push(c));
      const textCell = [];
      if (textNodes.length) {
        textCell.push(document2.createComment(" field:text "));
        textCell.push(...textNodes);
      }
      cells.push([imageCell.length ? imageCell : "", textCell.length ? textCell : ""]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/featured-article.js
  function parse2(element, { document: document2 }) {
    const pretitle = element.querySelector(".cmp-teaser__pretitle");
    const title = element.querySelector(".cmp-teaser__title, h2, h1, h3");
    const description = element.querySelector(".cmp-teaser__description");
    let ctas = Array.from(element.querySelectorAll("a.cmp-teaser__action-link"));
    if (!ctas.length) ctas = Array.from(element.querySelectorAll(".cmp-teaser__action-container a"));
    const img = element.querySelector(".cmp-teaser__image img, .cmp-image img, img");
    const cells = [];
    const textNodes = [];
    if (pretitle) textNodes.push(pretitle);
    if (title) textNodes.push(title);
    if (description) textNodes.push(description);
    ctas.forEach((c) => textNodes.push(c));
    if (textNodes.length) {
      cells.push([[document2.createComment(" field:text "), ...textNodes]]);
    }
    if (img) {
      cells.push([[document2.createComment(" field:image "), img]]);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "featured-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse3(element, { document: document2 }) {
    const items = element.querySelectorAll(".cmp-image-list__item");
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector(".cmp-image-list__item-image img, .cmp-image img, img");
      const titleLink = item.querySelector("a.cmp-image-list__item-title-link");
      const titleText = item.querySelector(".cmp-image-list__item-title");
      const description = item.querySelector(".cmp-image-list__item-description");
      const href = titleLink ? titleLink.getAttribute("href") : null;
      const imageCell = [];
      if (img) {
        imageCell.push(document2.createComment(" field:image "));
        imageCell.push(img);
      }
      const textNodes = [];
      if (titleText) {
        const titleContent = titleText.textContent.trim();
        if (titleContent) {
          const h3 = document2.createElement("h3");
          if (href) {
            const a = document2.createElement("a");
            a.setAttribute("href", href);
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
          const p = document2.createElement("p");
          p.textContent = descText;
          textNodes.push(p);
        }
      }
      const textCell = [];
      if (textNodes.length) {
        textCell.push(document2.createComment(" field:text "));
        textCell.push(...textNodes);
      }
      cells.push([imageCell.length ? imageCell : "", textCell.length ? textCell : ""]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-overlay.js
  function parse4(element, { document: document2 }) {
    const img = element.querySelector(".cmp-teaser__image img, .cmp-image img, img");
    const title = element.querySelector(".cmp-teaser__title, h1, h2, h3");
    const description = element.querySelector(".cmp-teaser__description");
    let ctas = Array.from(element.querySelectorAll("a.cmp-teaser__action-link"));
    if (!ctas.length) ctas = Array.from(element.querySelectorAll(".cmp-teaser__action-container a"));
    const cells = [];
    if (img) {
      cells.push([[document2.createComment(" field:image "), img]]);
    }
    const textNodes = [];
    if (title) textNodes.push(title);
    if (description) textNodes.push(description);
    ctas.forEach((c) => textNodes.push(c));
    if (textNodes.length) {
      cells.push([[document2.createComment(" field:text "), ...textNodes]]);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#destination_publishing_iframe_wkndsite_0",
        "#toggleNav",
        "#mobileNav"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        "iframe",
        "meta"
      ]);
    }
  }

  // tools/importer/transformers/wknd-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function querySection(root, selectors) {
    for (const sel of selectors) {
      const el = root.querySelector(sel);
      if (el) return el;
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = querySection(element, section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || querySection(element, section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-home.js
  var parsers = {
    "carousel-hero": parse,
    "featured-article": parse2,
    "cards-article": parse3,
    "hero-overlay": parse4
  };
  var PAGE_TEMPLATE = {
    name: "home",
    description: "WKND home page: hero carousel, featured article, article card grids, and an overlay hero.",
    urls: [
      "https://wknd.site/us/en.html"
    ],
    blocks: [
      {
        name: "carousel-hero",
        instances: [".carousel.cmp-carousel--hero"]
      },
      {
        name: "featured-article",
        instances: [".teaser.cmp-teaser--featured"]
      },
      {
        name: "cards-article",
        instances: [".image-list.list"]
      },
      {
        name: "hero-overlay",
        instances: [".teaser.cmp-teaser--hero.cmp-teaser--imagebottom"]
      }
    ],
    sections: [
      {
        id: "rc1",
        name: "hero-carousel",
        selector: [".carousel.cmp-carousel--hero"],
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: []
      },
      {
        id: "rc2c1",
        name: "featured-article",
        selector: [".teaser.cmp-teaser--featured"],
        style: null,
        blocks: ["featured-article"],
        defaultContent: []
      },
      {
        id: "rc2c3",
        name: "recent-articles",
        selector: [".cmp-layout-container--fixed:nth-of-type(1)", ".image-list.list"],
        style: null,
        blocks: ["cards-article"],
        defaultContent: []
      },
      {
        id: "rc3",
        name: "climbing-hero-overlay",
        selector: [".teaser.cmp-teaser--hero.cmp-teaser--imagebottom"],
        style: null,
        blocks: ["hero-overlay"],
        defaultContent: []
      },
      {
        id: "rc4c2",
        name: "where-to-go",
        selector: [".cmp-layout-container--fixed:nth-of-type(2)", ".image-list.list"],
        style: null,
        blocks: ["cards-article"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_home_default = {
    transform: (payload) => {
      const { document: document2, url, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();
