import {logger} from '@/core/utils';

const COMMENTS = false;

export class DomMethods {
  constructor() {
  }

  initialize(selector, single = true) {
    if (single) {
      logger(`initialize(); selector: ${selector}`, false, false);
      return document.querySelector(selector);
    } else {
      logger(`initialize(); selector: ${selector}`, false, false);
      return document.querySelectorAll(selector);
    }
  }

  // renderHTML(root, html) {
  //   try {
  //     if (typeof root === 'string') {
  //       document.querySelector(root).innerHTML = html;
  //     } else {
  //       root.innerHTML = html;
  //     }
  //     logger(`renderHTML();`, this, COMMENTS);
  //   } catch (e) {
  //     logger(`renderHTML(); ` + e, this, COMMENTS);
  //   }
  // }

  renderHTML(root, html) {
    try {
      root.appendChild(html);
      logger(`renderHTML();`, this, COMMENTS);
    } catch (e) {
      logger(`renderHTML(); ` + e, this, COMMENTS);
    }
  }

  addListener(selector, event, func, once = false) {
    try {
      selector.addEventListener(event, func, {once: once});
      logger(
          `addListener(); selector: ${selector.className} event: ${event}`,
          this, COMMENTS);
    } catch (e) {
      logger(
          `addListener();` + e, this, COMMENTS);
    }
  }

  removeListener(selector, event, func) {
    try {
      selector.removeEventListener(event, func);
      logger(
          `removeListener(); selector: ${selector.className} event: ${event}`,
          this, COMMENTS);
    } catch (e) {
      logger(
          `addListener();` + e, this, COMMENTS);
    }
  }
}
