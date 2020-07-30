import {logger} from '@/core/utils';
import {COMMENTS} from '@/index';

export class DomMethods {
  constructor() {
    this.CENTER = this.initialize('.center');
    this.DISPLAY = this.initialize('.display');
    this.MENU = this.initialize('.menu');
    this.FILTERS = this.initialize('.filter');
    this.SEARCH = this.initialize('.header__search-box');
    this.BODY = this.initialize('body');
  }

  initialize(selector, single = true) {
    if (single) {
      logger(`initialize(${selector});`, false, false);
      return document.querySelector(selector);
    } else {
      logger(`initialize(${selector});`, false, false);
      return document.querySelectorAll(selector);
    }
  }

  renderHTML(root, html, position = 'beforeend') {
    try {
      root.insertAdjacentHTML(position, html);
      logger(`renderHTML();`, this, COMMENTS);
    } catch (e) {
      logger(`renderHTML(); ` + e, this, COMMENTS);
    }
  }

  insertElement(root, element, position = 'beforeend') {
    try {
      root.insertAdjacentElement(position, element);
      logger(`insertElement();`, this, false);
    } catch (e) {
      logger(`insertElement(); ` + e, this, false);
    }
  }

  addListener(selector, event, func, once = false) {
    try {
      selector.addEventListener(event, func, {once: once});
      logger(
          `addListener(${selector.classList[0]}) on ${event}`,
          this, false);
    } catch (e) {
      logger(
          `addListener();` + e, this, false);
    }
  }

  removeListener(selector, event, func) {
    try {
      selector.removeEventListener(event, func);
      logger(
          `removeListener(); selector: ${selector.className} event: ${event}`,
          this, false);
    } catch (e) {
      logger(
          `addListener();` + e, this, false);
    }
  }
}
