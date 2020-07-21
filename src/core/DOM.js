import {logger} from './utils';

export class DOM {
  constructor() {
  }

  renderHTML(root, html) {
    logger(`renderHTML(); root: ${root}`, this);
    if (typeof root === 'string') {
      document.querySelector(root).innerHTML = html;
    } else {
      root = html;
    }
  }

  addListener(selector, event, func) {
    logger(
        `addListener(); selector: ${selector.className} event: ${event}`,
        this);
    selector.addEventListener(event, func);
  }

  removeListener(selector, event, func) {
    logger(
        `removeListener(); selector: ${selector.className} event: ${event}`,
        this);
    selector.removeEventListener(event, func);
  }
}
