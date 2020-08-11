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

export function linkerNode() {
  const linker = document.createElement('div');
  linker.classList.add('linker');
  const topContainer = document.createElement('div');
  topContainer.classList.add('linker__top-container');
  const bottomContainer = document.createElement('div');
  bottomContainer.classList.add('linker__bottom-container');
  const pagination = document.createElement('div');
  linker.appendChild(topContainer);
  linker.appendChild(bottomContainer);
  linker.appendChild(pagination);
  const linkerObject = document.createElement('div');
  linkerObject.classList.add('linker__object');
  const linkerControl = document.createElement('div');
  linkerControl.classList.add('linker__control');
  topContainer.appendChild(linkerObject);
  topContainer.appendChild(linkerControl);
  const objectTitle = document.createElement('div');
  const objectBox = document.createElement('div');
  objectTitle.classList.add('linker__object-title');
  objectBox.classList.add('linker__object-box');
  linkerObject.appendChild(objectTitle);
  linkerObject.appendChild(objectBox);
  const linkerObjectTitle = document.createElement('div');
  linkerObjectTitle.classList.add('linker__object-title');
  const linkerObjectTitleCode = document.createElement('div');
  linkerObjectTitleCode.classList.add('linker__object-title-code', 'linker__object-size-code');
  linkerObjectTitleCode.textContent = 'Код';
  const linkerObjectTitleYear = document.createElement('div');
  linkerObjectTitleYear.classList.add('linker__object-title-year', 'linker__object-size-year');
  linkerObjectTitleYear.textContent = 'Год';
  const linkerObjectTitleName = document.createElement('div');
  linkerObjectTitleName.classList.add('linker__object-title-name', 'linker__object-size-name');
  linkerObjectTitleName.textContent = 'Название';
  objectTitle.appendChild(linkerObjectTitleCode);
  objectTitle.appendChild(linkerObjectTitleYear);
  objectTitle.appendChild(linkerObjectTitleName);
  const linkerObjectMain = document.createElement('div');
  linkerObjectMain.classList.add('linker__object-main');
  const linkerObjectAdditionalContainer = document.createElement('div');
  linkerObjectAdditionalContainer.classList.add('linker__object-additional-container');
  objectBox.appendChild(linkerObjectMain);
  objectBox.appendChild(linkerObjectAdditionalContainer);
  const linkerObjectMainBox = document.createElement('div');
  const linkerObjectMainSelect = document.createElement('span');
  const linkerObjectMainAdd = document.createElement('span');
  linkerObjectMainBox.classList.add('linker__object-main-box');
  linkerObjectMainSelect.classList.add('linker__object-main-select', 'button', 'material-icons');
  linkerObjectMainSelect.textContent = 'playlist_add_check';
  linkerObjectMainAdd.classList.add('linker__object-main-add', 'button', 'material-icons');
  linkerObjectMainAdd.textContent = 'add';
  linkerObjectMain.appendChild(linkerObjectMainBox);
  linkerObjectMain.appendChild(linkerObjectMainSelect);
  linkerObjectMain.appendChild(linkerObjectMainAdd);
  const linkerObjectMainUniqueCode = document.createElement('div');
  linkerObjectMainUniqueCode.classList.add('linker-main-unique-code');
  linkerObjectMainUniqueCode.style.display = 'none';
  const linkerObjectMainId = document.createElement('div');
  linkerObjectMainId.classList.add('linker-object-id');
  linkerObjectMainId.style.display = 'none';
  const linkerObjectMainCode = document.createElement('div');
  linkerObjectMainCode.classList.add('linker__object-main-code', 'linker__object-size-code', 'linker-object-code');
  const linkerObjectMainYear = document.createElement('div');
  linkerObjectMainYear.classList.add('linker__object-main-year', 'linker__object-size-year', 'linker-object-year');
  const linkerObjectMainName = document.createElement('div');
  linkerObjectMainName.classList.add('linker__object-main-name', 'linker__object-size-name', 'linker-object-name');
  const mainNameTooltip = document.createElement('div');
  mainNameTooltip.className = 'tooltip';
  linkerObjectMainName.appendChild(mainNameTooltip);
  linkerObjectMainBox.appendChild(linkerObjectMainUniqueCode);
  linkerObjectMainBox.appendChild(linkerObjectMainId);
  linkerObjectMainBox.appendChild(linkerObjectMainCode);
  linkerObjectMainBox.appendChild(linkerObjectMainYear);
  linkerObjectMainBox.appendChild(linkerObjectMainName);
  const controlSimilarity = document.createElement('div');
  const controlButtons = document.createElement('div');
  controlSimilarity.classList.add('linker__control-similarity');
  controlButtons.classList.add('linker__control-buttons');
  linkerControl.appendChild(controlSimilarity);
  linkerControl.appendChild(controlButtons);
  const controlSimilarityBox = document.createElement('div');
  controlSimilarityBox.classList.add('linker__control-similarity-box');
  controlSimilarity.appendChild(controlSimilarityBox);
  const selectSimilarityLabel = document.createElement('label');
  selectSimilarityLabel.setAttribute('for', 'select-similarity');
  selectSimilarityLabel.textContent = 'Совпадение:';
  controlSimilarityBox.appendChild(selectSimilarityLabel);
  const controlSimilarityLabel = document.createElement('label');
  controlSimilarityBox.appendChild(controlSimilarityLabel);
  const selectSimilarityDisplay = document.createElement('input');
  selectSimilarityDisplay.classList.add('select-similarity-display');
  selectSimilarityDisplay.setAttribute('type', 'text');
  selectSimilarityDisplay.setAttribute('value', '75');
  selectSimilarityDisplay.setAttribute('max', '100');
  selectSimilarityDisplay.setAttribute('min', '0');
  controlSimilarityLabel.appendChild(selectSimilarityDisplay);
  const selectSimilarity = document.createElement('input');
  selectSimilarity.setAttribute('type', 'range');
  selectSimilarity.setAttribute('max', '100');
  selectSimilarity.setAttribute('min', '0');
  selectSimilarity.classList.add('select-similarity');
  selectSimilarity.id = 'select-similarity';
  controlSimilarity.appendChild(selectSimilarity);
  const linkerControlSave = document.createElement('button');
  linkerControlSave.classList.add('button', 'linker__control-save');
  linkerControlSave.textContent = 'Сохранить';
  const linkerControlCheck = document.createElement('button');
  linkerControlCheck.classList.add('button', 'linker__control-check-objects');
  linkerControlCheck.textContent = 'Проверить существующие объекты';
  const linkerControlSimilarity = document.createElement('button');
  linkerControlSimilarity.classList.add('button', 'linker__control-show-similar');
  linkerControlSimilarity.textContent = 'Отобразить похожие записи';
  const linkerControlDelete = document.createElement('button');
  linkerControlDelete.classList.add('button', 'linker__control-delete');
  linkerControlDelete.textContent = 'Удалить';
  const linkerControlReset = document.createElement('button');
  linkerControlReset.classList.add('button', 'linker__control-reset');
  linkerControlReset.textContent = 'Сбросить';
  const linkerControlMain = document.createElement('button');
  linkerControlMain.classList.add('button', 'linker__control-main-page');
  linkerControlMain.textContent = 'На главную';
  controlButtons.appendChild(linkerControlSave);
  controlButtons.appendChild(linkerControlCheck);
  controlButtons.appendChild(linkerControlSimilarity);
  controlButtons.appendChild(linkerControlDelete);
  controlButtons.appendChild(linkerControlReset);
  controlButtons.appendChild(linkerControlMain);
  const linkerListHeaders = document.createElement('div');
  linkerListHeaders.classList.add('linker__list-header');
  const listCode = document.createElement('div');
  listCode.classList.add('linker__list-header-code', 'linker__list-size-code');
  listCode.textContent = 'Код';
  const listYear = document.createElement('div');
  listYear.classList.add('linker__list-header-year', 'linker__list-size-year');
  listYear.textContent = 'Год';
  const listReady = document.createElement('div');
  listReady.classList.add('linker__list-header-ready', 'linker__list-size-ready');
  listReady.textContent = 'Готово';
  const listMinistry = document.createElement('div');
  listMinistry.classList.add('linker__list-header-ministry', 'linker__list-size-ministry');
  listMinistry.textContent = 'Министерство';
  const listTerritory = document.createElement('div');
  listTerritory.classList.add('linker__list-header-territory', 'linker__list-size-territory');
  listTerritory.textContent = 'Территория';
  const listProgram = document.createElement('div');
  listProgram.classList.add('linker__list-header-program', 'linker__list-size-program');
  listProgram.textContent = 'Программа';
  const listName = document.createElement('div');
  listName.classList.add('linker__list-header-name', 'linker__list-size-name');
  listName.textContent = 'Название';
  const listDetails = document.createElement('div');
  listDetails.classList.add('linker__list-header-details', 'linker__list-size-details');
  listDetails.textContent = 'Выбрать';
  bottomContainer.appendChild(linkerListHeaders);
  linkerListHeaders.appendChild(listCode);
  linkerListHeaders.appendChild(listYear);
  linkerListHeaders.appendChild(listReady);
  linkerListHeaders.appendChild(listMinistry);
  linkerListHeaders.appendChild(listTerritory);
  linkerListHeaders.appendChild(listProgram);
  linkerListHeaders.appendChild(listName);
  linkerListHeaders.appendChild(listDetails);
  const linkerList = document.createElement('div');
  linkerList.classList.add('linker__list');
  bottomContainer.appendChild(linkerList);
  pagination.classList.add('pagination');
  const moveTo = document.createElement('div');
  moveTo.classList.add('pagination__moveto');
  const nav = document.createElement('div');
  nav.classList.add('pagination__nav');
  const infoP = document.createElement('div');
  infoP.classList.add('pagination__info');
  pagination.appendChild(moveTo);
  pagination.appendChild(nav);
  pagination.appendChild(infoP);
  const moveToInput = document.createElement('input');
  moveToInput.classList.add('pagination__moveto-input');
  moveToInput.type = 'number';
  const moveToButton = document.createElement('button');
  moveToButton.classList.add('pagination__moveto-button', 'button');
  moveToButton.textContent = 'Перейти';
  moveTo.appendChild(moveToInput);
  moveTo.appendChild(moveToButton);
  const prev = document.createElement('span');
  prev.classList.add('pagination__nav-prev', 'button', 'material-icons');
  prev.textContent = 'chevron_left';
  const currentPage = document.createElement('div');
  currentPage.classList.add('pagination__nav-display');
  currentPage.textContent = '1';
  const next = document.createElement('span');
  next.classList.add('pagination__nav-next', 'button', 'material-icons');
  next.textContent = 'chevron_right';
  nav.appendChild(prev);
  nav.appendChild(currentPage);
  nav.appendChild(next);
  const totalPages = document.createElement('div');
  totalPages.classList.add('pagination__info-pages');
  const totalPagesTitle = document.createElement('div');
  totalPagesTitle.classList.add('pagination__info-pages-title');
  totalPagesTitle.textContent = 'Страниц:';
  const totalPagesValue = document.createElement('div');
  totalPagesValue.classList.add('pagination__info-pages-value');
  const totalObjects = document.createElement('div');
  totalObjects.classList.add('pagination__info-objects');
  const totalObjectsTitle = document.createElement('div');
  totalObjectsTitle.classList.add('pagination__info-objects-title');
  totalObjectsTitle.textContent = 'Объектов:';
  const totalObjectsValue = document.createElement('div');
  totalObjectsValue.classList.add('pagination__info-objects-value');
  totalPages.appendChild(totalPagesTitle);
  totalPages.appendChild(totalPagesValue);
  totalObjects.appendChild(totalObjectsTitle);
  totalObjects.appendChild(totalObjectsValue);
  infoP.appendChild(totalPages);
  infoP.appendChild(totalObjects);
  return linker;
}
