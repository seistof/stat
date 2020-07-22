import {DOM} from './DOM';
import {initialize, logger} from './utils';

const COMMENTS = false;

export class MainView extends DOM {
  constructor(root, display) {
    super();
    this.root = root;
    this.display = document.querySelector(display);
  }

  enableOverlay() {
    logger(`enableOverlay()`, this, COMMENTS);
    const overlay = document.createElement('div');
    const indicator = document.createElement('div');
    overlay.classList.add('overlay');
    indicator.classList.add('overlay__indicator');
    overlay.appendChild(indicator);
    this.display.appendChild(overlay);
  }

  disableOverlay() {
    logger(`disableOverlay()`, this, COMMENTS);
    const overlay = initialize('.overlay');
    overlay.parentNode.removeChild(overlay);
  }
}
