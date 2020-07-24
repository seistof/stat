import {DOM} from './DOM';

// const COMMENTS = true;

export class MainView extends DOM {
  constructor(root, display, overlay) {
    super();
    this.root = root;
    this.display = display;
    this.overlay = overlay;
  }
}
