const COMMENTS = true;

export function logger(text, a = false, show = COMMENTS) {
  if (show) {
    if (a) {
      console.log(a.constructor.name);
    }
    console.log(text);
    console.log(`+++`);
  }
}

export function initialize(selector, single = true) {
  if (single) {
    logger(`initialize(); selector: ${selector}`, false, false);
    return document.querySelector(selector);
  } else {
    return document.querySelectorAll(selector);
  }
}

export function addressBarText(text = '') {
  document.location.hash = text.toString();
}
