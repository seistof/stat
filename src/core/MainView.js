import {DOM} from './DOM';
import {logger} from './utils';

export class MainView extends DOM {
  constructor(display) {
    super();
    this.display = document.querySelector(display);
  }

  enableOverlay() {
    logger(`enableOverlay()`, this);
    const overlay = document.createElement('div');
    const indicator = document.createElement('div');
    overlay.classList.add('overlay');
    indicator.classList.add('overlay__indicator');
    overlay.appendChild(indicator);
    this.display.appendChild(overlay);
  }

  disableOverlay() {
    logger(`disableOverlay()`, this);
    const overlay = document.createElement('div');
    this.display.removeChild(overlay);
  }
}
