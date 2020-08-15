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
  linkerObjectMainUniqueCode.classList.add('linker-object-unique-code');
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
  currentPage.style.display = 'none';
  const next = document.createElement('span');
  next.classList.add('pagination__nav-next', 'button', 'material-icons');
  next.textContent = 'chevron_right';
  /* TEST */
  const pagination1 = document.createElement('div');
  pagination1.classList.add('pagination__nav-1');
  pagination1.textContent = '1';
  pagination1.style.display = 'none';
  const pagination2 = document.createElement('div');
  pagination2.classList.add('pagination__nav-2');
  pagination2.textContent = '2';
  pagination2.style.display = 'none';
  const pagination3 = document.createElement('div');
  pagination3.classList.add('pagination__nav-3');
  pagination3.textContent = '3';
  pagination3.style.display = 'none';
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination__nav-div');
  paginationDiv.textContent = '...';
  paginationDiv.style.display = 'none';
  const paginationDiv2 = document.createElement('div');
  paginationDiv2.classList.add('pagination__nav-div-2');
  paginationDiv2.textContent = '...';
  paginationDiv2.style.display = 'none';
  const pagination4 = document.createElement('div');
  pagination4.classList.add('pagination__nav-4');
  pagination4.textContent = '4';
  pagination4.style.display = 'none';
  const pagination5 = document.createElement('div');
  pagination5.classList.add('pagination__nav-5');
  pagination5.textContent = '5';
  pagination5.style.display = 'none';
  const pagination6 = document.createElement('div');
  pagination6.classList.add('pagination__nav-6');
  pagination6.textContent = '6';
  pagination6.style.display = 'none';
  const pagination7 = document.createElement('div');
  pagination7.classList.add('pagination__nav-7');
  pagination7.textContent = '7';
  pagination7.style.display = 'none';
  /* TEST */
  nav.appendChild(prev);
  // TEST
  nav.appendChild(pagination1);
  nav.appendChild(paginationDiv);
  nav.appendChild(pagination2);
  nav.appendChild(pagination3);
  nav.appendChild(currentPage);
  nav.appendChild(pagination4);
  nav.appendChild(pagination5);
  nav.appendChild(pagination6);
  nav.appendChild(paginationDiv2);
  nav.appendChild(pagination7);
  // TEST
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

export function hierarchyNode() {
  const hierarchy = document.createElement('div');
  hierarchy.classList.add('hierarchy-view');
  const hierarchyViewWrapper = document.createElement('div');
  hierarchyViewWrapper.classList.add('hierarchy-view-wrapper');
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  hierarchy.appendChild(hierarchyViewWrapper);
  hierarchy.appendChild(pagination);
  const header = document.createElement('div');
  header.classList.add('hierarchy-view__header');
  const container = document.createElement('div');
  container.classList.add('hierarchy-view__object-container');
  hierarchyViewWrapper.appendChild(header);
  hierarchyViewWrapper.appendChild(container);
  const year = document.createElement('div');
  year.classList.add('hierarchy-view__header-item', 'hierarchy-view__header-year', 'hierarchy-view-size-year');
  const ready = document.createElement('div');
  ready.classList.add('hierarchy-view__header-item', 'hierarchy-view__header-ready', 'hierarchy-view-size-ready');
  const code = document.createElement('div');
  code.classList.add('hierarchy-view__header-item', 'hierarchy-view__header-code', 'hierarchy-view-size-code');
  const info = document.createElement('div');
  info.classList.add('hierarchy-view__header-item', 'hierarchy-view__header-info', 'hierarchy-view-size-info');
  const name = document.createElement('div');
  name.classList.add('hierarchy-view__header-item', 'hierarchy-view__header-name', 'hierarchy-view-size-name');
  year.textContent = 'Год';
  ready.textContent = 'Готово';
  code.textContent = 'Код';
  info.textContent = 'Министерство, территория, программа';
  name.textContent = 'Название';
  header.appendChild(year);
  header.appendChild(ready);
  header.appendChild(code);
  header.appendChild(info);
  header.appendChild(name);
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
  currentPage.style.display = 'none';
  const next = document.createElement('span');
  next.classList.add('pagination__nav-next', 'button', 'material-icons');
  next.textContent = 'chevron_right';
  /* TEST */
  const pagination1 = document.createElement('div');
  pagination1.classList.add('pagination__nav-1');
  pagination1.textContent = '1';
  pagination1.style.display = 'none';
  const pagination2 = document.createElement('div');
  pagination2.classList.add('pagination__nav-2');
  pagination2.textContent = '2';
  pagination2.style.display = 'none';
  const pagination3 = document.createElement('div');
  pagination3.classList.add('pagination__nav-3');
  pagination3.textContent = '3';
  pagination3.style.display = 'none';
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination__nav-div');
  paginationDiv.textContent = '...';
  paginationDiv.style.display = 'none';
  const paginationDiv2 = document.createElement('div');
  paginationDiv2.classList.add('pagination__nav-div-2');
  paginationDiv2.textContent = '...';
  paginationDiv2.style.display = 'none';
  const pagination4 = document.createElement('div');
  pagination4.classList.add('pagination__nav-4');
  pagination4.textContent = '4';
  pagination4.style.display = 'none';
  const pagination5 = document.createElement('div');
  pagination5.classList.add('pagination__nav-5');
  pagination5.textContent = '5';
  pagination5.style.display = 'none';
  const pagination6 = document.createElement('div');
  pagination6.classList.add('pagination__nav-6');
  pagination6.textContent = '6';
  pagination6.style.display = 'none';
  const pagination7 = document.createElement('div');
  pagination7.classList.add('pagination__nav-7');
  pagination7.textContent = '7';
  pagination7.style.display = 'none';
  /* TEST */
  nav.appendChild(prev);
  // TEST
  nav.appendChild(pagination1);
  nav.appendChild(paginationDiv);
  nav.appendChild(pagination2);
  nav.appendChild(pagination3);
  nav.appendChild(currentPage);
  nav.appendChild(pagination4);
  nav.appendChild(pagination5);
  nav.appendChild(pagination6);
  nav.appendChild(paginationDiv2);
  nav.appendChild(pagination7);
  // TEST
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
  return hierarchy;
}

export function uploadNode() {
  const upload = document.createElement('div');
  upload.className = 'upload';
  const uploadBox = document.createElement('div');
  uploadBox.className = 'upload-box';
  upload.appendChild(uploadBox);

  const uploadForm = document.createElement('div');
  uploadForm.className = 'upload-form';
  const sendButton = document.createElement('button');
  sendButton.classList.add('upload__button-send', 'button');
  sendButton.id = 'press';
  sendButton.textContent = 'Отправить';
  uploadBox.appendChild(uploadForm);
  uploadBox.appendChild(sendButton);

  for (let i = 0; i < 3; i++) {
    const item = document.createElement('div');
    item.className = 'upload-form__item';
    const title = document.createElement('div');
    title.className = 'upload-form__item-title';
    const input = document.createElement('input');
    if (i===0) {
      title.textContent = 'Каталог:';
      input.type = 'file';
      input.id = 'main-input';
      input.name = 'main';
      input.accept = 'text/plain';
    }
    if (i===1) {
      title.textContent = 'Данные:';
      input.type = 'file';
      input.id = 'additional-input';
      input.name = 'additional';
      input.accept = 'text/plain';
    }
    if (i===2) {
      title.textContent = 'Год:';
      input.type = 'number';
      input.id = 'year-input';
      input.name = 'year';
      input.value = '';
      input.min = '2011';
      input.max = '2100';
    }
    item.appendChild(title);
    item.appendChild(input);
    uploadForm.appendChild(item);
  }
  return upload;
}

export function dictionaryNode(ministry = false, territory = false, program = false) {
  if (ministry) {
    const ministry = document.createElement('div');
    const title = document.createElement('div');
    const titleName = document.createElement('div');
    const titleSearch = document.createElement('input');
    const header = document.createElement('div');
    const headerName = document.createElement('div');
    const headerYear = document.createElement('div');
    const headerCode = document.createElement('div');
    const headerControl = document.createElement('div');
    const addNewButton = document.createElement('span');
    const list = document.createElement('div');

    // const item = document.createElement('div');
    // const itemName = document.createElement('div');
    // const itemNameTooltip = document.createElement('div');
    // const itemYear = document.createElement('div');
    // const itemCode = document.createElement('div');
    // const itemControl = document.createElement('div');
    // const itemControlEdit = document.createElement('span');
    // const itemControlDelete = document.createElement('span');

    ministry.className = 'ministry';
    title.className = 'ministry-title';
    titleName.className = 'ministry-title__name';
    titleSearch.className = 'ministry-title__search';
    addNewButton.classList.add('ministry-title__add-new', 'material-icons', 'button');
    header.className = 'ministry-header';
    headerName.className = 'ministry-header__name';
    headerYear.className = 'ministry-header__year';
    headerCode.className = 'ministry-header__code';
    headerControl.className = 'ministry-header__control';
    list.className = 'ministry-list';

    titleSearch.type = 'text';
    titleSearch.placeholder = 'поиск';

    // item.className = 'item';
    // itemName.className = 'item__name';
    // itemNameTooltip.className = 'tooltip';
    // itemYear.className = 'item__year';
    // itemCode.className = 'item__code';
    // itemControl.className = 'item__control';
    // itemControlEdit.classList.add('item__control-edit', 'material-icons', 'button');
    // itemControlDelete.classList.add('item__control-delete', 'material-icons', 'button');

    titleName.textContent = 'Справочник: Министерства';
    headerName.textContent = 'Название';
    headerYear.textContent = 'Год';
    headerCode.textContent = 'Код';
    headerControl.textContent = 'Изменить';
    addNewButton.textContent = 'add';
    // itemControlEdit.textContent = 'create';
    // itemControlDelete.textContent = 'delete_forever';
    //
    // itemName.textContent = 'dwfawfaggdwfawfaggdwfawfaggdwfawfaggdwfawfaggdwfawfaggdwfawfaggdwfawfaggdwfawfaggdwfawfaggdwfawfagg';
    // itemYear.textContent = '(2011 - 2012)';
    // itemCode.textContent = '1453333444440';

    ministry.appendChild(title);
    ministry.appendChild(header);
    ministry.appendChild(list);

    title.appendChild(titleName);
    title.appendChild(titleSearch);
    title.appendChild(addNewButton);

    header.appendChild(headerName);
    header.appendChild(headerYear);
    header.appendChild(headerCode);
    header.appendChild(headerControl);

    // list.appendChild(item);

    // item.appendChild(itemName);
    // itemName.appendChild(itemNameTooltip);
    // item.appendChild(itemYear);
    // item.appendChild(itemCode);
    // item.appendChild(itemControl);
    //
    // itemControl.appendChild(itemControlEdit);
    // itemControl.appendChild(itemControlDelete);

    return ministry;
  }
  if (territory) {
    return '';
  }
  if (program) {
    return '';
  }
}

export function fillMinistryOrTerritory(data, container) {
  data.forEach((entry, i) => {
    const item = document.createElement('div');
    const itemName = document.createElement('div');
    const itemNameTooltip = document.createElement('div');
    const itemYear = document.createElement('div');
    const itemCode = document.createElement('div');
    const itemControl = document.createElement('div');
    const itemControlEdit = document.createElement('span');
    const itemControlDelete = document.createElement('span');

    item.classList.add('item', `item-${i}`);
    itemName.className = 'item__name';
    itemNameTooltip.className = 'tooltip';
    itemYear.className = 'item__year';
    itemCode.className = 'item__code';
    itemControl.className = 'item__control';
    itemControlEdit.classList.add('item__control-edit', 'material-icons', 'button');
    itemControlDelete.classList.add('item__control-delete', 'material-icons', 'button');
    itemControlEdit.textContent = 'create';
    itemControlDelete.textContent = 'delete_forever';

    // itemName.textContent = (entry.shortName !== null && entry.shortName !== '') ? entry.shortName : entry.name;
    itemName.textContent = entry.name;
    itemNameTooltip.textContent = entry.name;
    itemYear.textContent = parseInt(entry.fromYear) === parseInt(entry.toYear) ?
      `(${entry.fromYear})` : `(${entry.fromYear} - ${entry.toYear})`;
    itemCode.textContent = entry.code;
    itemControlEdit.dataset.index = `${i}`;
    itemControlDelete.dataset.index = `${i}`;

    item.appendChild(itemName);
    itemName.appendChild(itemNameTooltip);
    item.appendChild(itemYear);
    item.appendChild(itemCode);
    item.appendChild(itemControl);
    itemControl.appendChild(itemControlEdit);
    itemControl.appendChild(itemControlDelete);

    container.appendChild(item);
  });
}

export function addNewWindowMinistryOrTerritory() {
  const addNew = document.createElement('div');
  const title = document.createElement('div');
  const data = document.createElement('div');
  const nameBox = document.createElement('div');
  const nameTitle = document.createElement('div');
  const nameValue = document.createElement('textarea');
  const shortBox = document.createElement('div');
  const shortTitle = document.createElement('div');
  const shortValue = document.createElement('input');
  const yearBox = document.createElement('div');
  const yearTitle = document.createElement('div');
  const yearFrom = document.createElement('input');
  const yearDiv = document.createElement('div');
  const yearTo = document.createElement('input');
  const codeBox = document.createElement('div');
  const codeTitle = document.createElement('div');
  const codeValue = document.createElement('input');
  const buttonsBox = document.createElement('div');
  const buttonsSave = document.createElement('div');
  const buttonsCancel = document.createElement('div');

  addNew.className = 'add-new-window';
  title.className = 'add-new-title';
  data.className = 'add-new-data';
  nameBox.classList.add('name-box', 'add-new-data-box');
  nameTitle.className = 'name-title';
  nameValue.className = 'name-value';
  shortBox.classList.add('short-box', 'add-new-data-box');
  shortTitle.className = 'short-title';
  shortValue.className = 'short-value';
  yearBox.classList.add('year-box', 'add-new-data-box');
  yearTitle.className = 'year-title';
  yearFrom.className = 'year-from';
  yearDiv.className = 'year-div';
  yearTo.className = 'year-to';
  codeBox.classList.add('code-box', 'add-new-data-box');
  codeTitle.className = 'code-title';
  codeValue.className = 'code-value';
  buttonsBox.className = 'buttons-box';
  buttonsSave.classList.add('buttons-save', 'button');
  buttonsCancel.classList.add('buttons-cancel', 'button');

  title.textContent = 'Создание новой записи';
  nameTitle.textContent = 'Название:';
  shortTitle.textContent = 'Краткое назване:';
  yearTitle.textContent = 'Год:';
  codeTitle.textContent = 'Код:';
  buttonsSave.textContent = 'Сохранить';
  buttonsCancel.textContent = 'Отмена';
  yearDiv.textContent = '-';
  shortValue.type = 'text';
  yearFrom.type = 'number';
  yearFrom.min = '1900';
  yearFrom.max = '2100';
  yearTo.type = 'number';
  yearTo.min = '1900';
  yearTo.max = '2100';

  addNew.appendChild(title);
  addNew.appendChild(data);
  addNew.appendChild(buttonsBox);
  data.appendChild(nameBox);
  data.appendChild(shortBox);
  data.appendChild(yearBox);
  data.appendChild(codeBox);
  nameBox.appendChild(nameTitle);
  nameBox.appendChild(nameValue);
  shortBox.appendChild(shortTitle);
  shortBox.appendChild(shortValue);
  yearBox.appendChild(yearTitle);
  yearBox.appendChild(yearFrom);
  yearBox.appendChild(yearDiv);
  yearBox.appendChild(yearTo);
  codeBox.appendChild(codeTitle);
  codeBox.appendChild(codeValue);
  buttonsBox.appendChild(buttonsSave);
  buttonsBox.appendChild(buttonsCancel);
  return addNew;
}
