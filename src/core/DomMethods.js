import {logger} from '@/core/utils';

const COMMENTS = true;

export class DomMethods {
  constructor() {
  }

  initialize(selector, single = true) {
    if (single) {
      logger(`initialize(); selector: ${selector}`, false, false);
      return document.querySelector(selector);
    } else {
      return document.querySelectorAll(selector);
    }
  }

  renderHTML(root, html) {
    logger(`renderHTML();`, this, COMMENTS);
    if (typeof root === 'string') {
      document.querySelector(root).innerHTML = html;
    } else {
      root.innerHTML = html;
    }
  }

  addListener(selector, event, func) {
    logger(
        `addListener(); selector: ${selector.className} event: ${event}`,
        this, COMMENTS);
    selector.addEventListener(event, func);
  }

  removeListener(selector, event, func) {
    logger(
        `removeListener(); selector: ${selector.className} event: ${event}`,
        this, COMMENTS);
    selector.removeEventListener(event, func);
  }
}
