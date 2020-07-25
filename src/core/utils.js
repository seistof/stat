const COMMENTS = true;

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

export const hierarchyToggle = (e) => {
  logger(`hierarchyToggle();`);
  if (e.target.parentElement.parentElement.parentElement.querySelector(
      '.hierarchy-view__object-body').style.display === 'none') {
    console.log(`rotate 180`);
    e.target.parentElement.parentElement.parentElement.querySelector(
        '.hierarchy-view__object-body').style.display = 'block';
    e.target.style.transform = 'rotate(180deg)';
  } else {
    console.log(`rotate 0`);
    e.target.parentElement.parentElement.parentElement.querySelector(
        '.hierarchy-view__object-body').style.display = 'none';
    e.target.style.transform = 'rotate(0deg)';
  }
};

export const hierarchyDetail = (e) => {
  logger(`hierarchyDetail(); id = ${e.target.dataset.id}`);
};

export const hierarchyEdit = (e) => {
  logger(`hierarchyEdit(); id = ${e.target.dataset.id}`);
};
