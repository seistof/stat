import {comment} from '../../core/utils';

export class Display {
  renderHTML(html) {
    comment('Display.renderHTML();');
    const root = document.querySelector('.display');
    root.innerHTML = html;
  }
}
