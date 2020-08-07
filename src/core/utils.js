import {COMMENTS, HIERARCHY, LINKER, SEARCH} from '@/index';

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

export function removeInactiveListeners() {
  try {
    HIERARCHY.removeListeners();
    LINKER.linkerListSelectRemoveListeners();
    LINKER.controlButtonsRemoveListeners();
    SEARCH.removeListeners();
  } catch (e) {
    logger(`>>> No other listeners detected. ` + e, false, COMMENTS);
  }
}
