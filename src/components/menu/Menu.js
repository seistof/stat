export class Menu {
  constructor() {
    this.main = document.querySelector(
        '.navigation__button-main');
    this.constructor = document.querySelector(
        '.navigation__button-constructor');
    this.upload = document.querySelector('.navigation__button-upload');
    this.export = document.querySelector('.navigation__button-export');
    this.exit = document.querySelector('.navigation__button-exit');
  }

  addListener(selector, event, func) {
    selector.addEventListener(event, func);
  }
}
