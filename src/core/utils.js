import {COMMENTS} from '@/index';

export function logger(text, context = false, show = COMMENTS) {
  if (show) {
    if (context) {
      console.log(`[${context.constructor.name}] ${text}`);
    } else {
      console.log(text);
    }
  }
}

export function addressBarText(text = '') {
  document.location.hash = text.toString();
}
