import {hierarchyNode, logger} from '@core/utils';
import {COMMENTS} from '@/index';
import {Search} from '@/components/search/Search';

export class Hierarchy extends Search {
  constructor(
      hierarchyContainer,
      currentUniqueCode,
      hierarchyDetailWindow,
      hierarchyDetailCloseButton,
      hierarchyDetailExportButton,
      currentPage,
      totalPages,
      totalObjects,
  ) {
    super();
    this.hierarchyContainer = hierarchyContainer;
    this.hierarchyButtons = [];
    this.hierarchyButtonFunctions = [
      this.objectDropdown.bind(this),
      this.objectDetails.bind(this),
      this.objectEdit.bind(this),
    ];
    this.currentData = [];
    this.currentUniqueCode = currentUniqueCode;
    this.hierarchyDetailWindow = hierarchyDetailWindow;
    this.hierarchyDetailCloseButton = hierarchyDetailCloseButton;
    this.hierarchyDetailExportButton = hierarchyDetailExportButton;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.totalObjects = totalObjects;
    this.uniqueCodeToEdit = '';
    this.lastState = '';
    this.lastPage = 1;
  }

  async hierarchyInit() {
    logger(``, false, COMMENTS);
    logger(`init();`, this, COMMENTS);
    this.SEARCH.sourceView = 'hierarchy';
    this.filterReset.click();
    this.removeInactiveListeners();
    await this.enableOverlay(true);
    this.clearDisplay();
    super.insertElement(this.DISPLAY, hierarchyNode());
    this.totalObjects = super.initialize('.pagination__info-objects-value');
    this.currentPage = super.initialize('.pagination__nav-display');
    this.totalPages = super.initialize('.pagination__info-pages-value');
    await this.SEARCH.searchInit();
    let options = '';
    if (this.lastState !== '') {
      options = this.lastState;
      this.lastState = '';
    } else {
      this.lastPage = 1;
    }
    await this.fill(await super.sendQuery(this.hierarchyURL + options));
    this.SEARCH.currentPage.textContent = this.lastPage;
    await super.enableOverlay(false);
    await super.disableUI(false,
        this.MENU,
        this.SEARCH.nextButton,
        this.SEARCH.prevButton,
        this.SEARCH.goToButton,
        this.SEARCHBOX,
        this.FILTERS,
    );
    this.SEARCH.checkPagination();
    this.SEARCH.paginationNumbersHandler();
  }

  async fill(data) {
    try {
      console.log(data);
      logger(`fill();`, this, COMMENTS);
      this.hierarchyContainer = super.initialize('.hierarchy-view__object-container');
      this.hierarchyContainer.innerHTML = '';
      this.currentData = data;
      this.totalObjects.textContent = data.totalLen;
      this.totalPages.textContent = Math.ceil(data.totalLen / 12);
      data.data.forEach((entry, i) => {
        const object = document.createElement('div');
        const wrapper = document.createElement('div');
        const buttonBox = document.createElement('div');
        const textBox = document.createElement('div');
        const objectDropdown = document.createElement('span');
        const objectDetailsButton = document.createElement('button');
        const objectEditButton = document.createElement('button');
        const textBoxTop = document.createElement('div');
        const textBoxBottom = document.createElement('div');
        const texBoxTopLeft = document.createElement('div');
        const year = document.createElement('div');
        const ready = document.createElement('div');
        const uniqueCode = document.createElement('div');
        const texBoxTopRight = document.createElement('div');
        const ministryName = document.createElement('div');
        const ministryNameTooltip = document.createElement('div');
        const territoryName = document.createElement('div');
        const territoryNameTooltip = document.createElement('div');
        const programName = document.createElement('div');
        const programNameTooltip = document.createElement('div');
        const name = document.createElement('div');
        const nameTooltip = document.createElement('div');

        object.classList.add('hierarchy-view__object');
        wrapper.className = 'object-wrapper';
        objectDropdown.classList.add('hierarchy-view__object-dropdown', 'button', 'material-icons');
        objectDetailsButton.classList.add('hierarchy-view__object-details', 'button');
        objectEditButton.classList.add('hierarchy-view__object-edit', 'button');
        buttonBox.classList.add('hierarchy-view__object-button-box');
        textBox.classList.add('hierarchy-view__object-text-box');
        textBoxTop.classList.add('hierarchy-view__object-text-box-top');
        textBoxBottom.classList.add('hierarchy-view__object-text-box-bottom');
        texBoxTopLeft.classList.add('hierarchy-view__object-text-box-top-left');
        year.classList.add('hierarchy-view__object-year');
        ready.classList.add('hierarchy-view__object-ready');
        uniqueCode.classList.add('hierarchy-view__object-unique-code');
        texBoxTopRight.classList.add('hierarchy-view__object-text-box-top-right');
        ministryName.classList.add('hierarchy-view__object-ministry', 'object-text');
        ministryNameTooltip.classList.add('tooltip');
        territoryName.classList.add('hierarchy-view__object-territory', 'object-text');
        territoryNameTooltip.classList.add('tooltip');
        programName.classList.add('hierarchy-view__object-program', 'object-text');
        programNameTooltip.classList.add('tooltip');
        name.classList.add('hierarchy-view__object-name');
        nameTooltip.classList.add('tooltip');

        objectDropdown.textContent = 'expand_more';
        objectDetailsButton.textContent = 'Подробнее';
        objectEditButton.textContent = 'Изменить';
        objectDetailsButton.dataset.id = entry[0].uniqueCode;
        objectEditButton.dataset.index = i.toString();
        year.innerHTML = `<b>Год: </b> ${entry[0].yearData}`;
        ready.innerHTML = `<b>Готовность: </b> ${entry[0].maxReadiness}`;
        uniqueCode.textContent = entry[0].uniqueCode;
        uniqueCode.style.color = '#c81932';
        ministryName.innerHTML = `<b>Минисерство: </b>${entry[0].ministryName}`;
        ministryNameTooltip.textContent = entry[0].ministryName;
        territoryName.innerHTML = `<b>Территория: </b>${entry[0].territoryName}`;
        // territoryNameTooltip.textContent = entry[0].territoryName;
        programName.innerHTML = `<b>Программа: </b>${entry[0].programName}`;
        programNameTooltip.textContent = entry[0].programName;
        name.innerHTML = `<b>Название: </b>${entry[0].name.replace('***', ' ')}`;
        nameTooltip.innerHTML = entry[0].name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>');

        super.insertElement(buttonBox, objectDetailsButton);
        super.insertElement(buttonBox, objectEditButton);
        super.insertElement(buttonBox, objectDropdown);
        super.insertElement(ministryName, ministryNameTooltip);
        // super.insertElement(territoryName, territoryNameTooltip);
        super.insertElement(programName, programNameTooltip);
        super.insertElement(name, nameTooltip);
        super.insertElement(texBoxTopLeft, year);
        super.insertElement(texBoxTopLeft, ready);
        super.insertElement(texBoxTopLeft, uniqueCode);
        super.insertElement(texBoxTopRight, ministryName);
        super.insertElement(texBoxTopRight, territoryName);
        super.insertElement(texBoxTopRight, programName);
        super.insertElement(textBoxBottom, name);
        super.insertElement(textBoxTop, texBoxTopLeft);
        super.insertElement(textBoxTop, texBoxTopRight);
        super.insertElement(textBox, textBoxTop);
        super.insertElement(textBox, textBoxBottom);
        super.insertElement(wrapper, buttonBox);
        super.insertElement(wrapper, textBox);
        super.insertElement(object, wrapper);

        if (entry.length > 1) {
          const objectBody = document.createElement('div');
          objectBody.classList.add('hierarchy-view__object-body');
          objectBody.style.display = 'none';
          super.insertElement(object, objectBody);
          entry.forEach((el) => {
            if (el !== entry[0]) {
              const objectBodyItem = document.createElement('div');
              const textBox = document.createElement('div');
              const textBoxTop = document.createElement('div');
              const textBoxBottom = document.createElement('div');
              const texBoxTopLeft = document.createElement('div');
              const year = document.createElement('div');
              const ready = document.createElement('div');
              const uniqueCode = document.createElement('div');
              const texBoxTopRight = document.createElement('div');
              const ministryName = document.createElement('div');
              const ministryNameTooltip = document.createElement('div');
              const territoryName = document.createElement('div');
              const territoryNameTooltip = document.createElement('div');
              const programName = document.createElement('div');
              const programNameTooltip = document.createElement('div');
              const name = document.createElement('div');
              const nameTooltip = document.createElement('div');

              objectBodyItem.className = 'hierarchy-view__object-body-item';
              textBox.classList.add('hierarchy-view__object-text-box');
              textBoxTop.classList.add('hierarchy-view__object-text-box-top');
              textBoxBottom.classList.add('hierarchy-view__object-text-box-bottom');
              texBoxTopLeft.classList.add('hierarchy-view__object-text-box-top-left');
              year.classList.add('hierarchy-view__object-year');
              ready.classList.add('hierarchy-view__object-ready');
              uniqueCode.classList.add('hierarchy-view__object-unique-code');
              texBoxTopRight.classList.add('hierarchy-view__object-text-box-top-right');
              ministryName.classList.add('hierarchy-view__object-ministry', 'object-text');
              ministryNameTooltip.classList.add('tooltip');
              territoryName.classList.add('hierarchy-view__object-territory', 'object-text');
              territoryNameTooltip.classList.add('tooltip');
              programName.classList.add('hierarchy-view__object-program', 'object-text');
              programNameTooltip.classList.add('tooltip');
              name.classList.add('hierarchy-view__object-name');
              nameTooltip.classList.add('tooltip');

              year.innerHTML = `<b>Год:</b> ${el.yearData}`;
              ready.innerHTML = `<b>Готовность:</b> ${el.maxReadiness}`;
              uniqueCode.textContent = el.uniqueCode;
              uniqueCode.style.color = '#c80011';
              ministryName.innerHTML = `<b>Минисерство: </b>${el.ministryName}`;
              ministryNameTooltip.textContent = el.ministryName;
              territoryName.innerHTML = `<b>Территория: </b>${el.territoryName}`;
              // territoryNameTooltip.textContent = el.territoryName;
              programName.innerHTML = `<b>Программа: </b>${el.programName}`;
              programNameTooltip.textContent = el.programName;
              name.innerHTML = `<b>Название: </b>${el.name.replace('***', ' ')}`;
              nameTooltip.innerHTML = el.name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>');

              super.insertElement(ministryName, ministryNameTooltip);
              // super.insertElement(territoryName, territoryNameTooltip);
              super.insertElement(programName, programNameTooltip);
              super.insertElement(name, nameTooltip);
              super.insertElement(texBoxTopLeft, year);
              super.insertElement(texBoxTopLeft, ready);
              super.insertElement(texBoxTopLeft, uniqueCode);
              super.insertElement(texBoxTopRight, ministryName);
              super.insertElement(texBoxTopRight, territoryName);
              super.insertElement(texBoxTopRight, programName);
              super.insertElement(textBoxBottom, name);
              super.insertElement(textBoxTop, texBoxTopLeft);
              super.insertElement(textBoxTop, texBoxTopRight);
              super.insertElement(textBox, textBoxTop);
              super.insertElement(textBox, textBoxBottom);
              super.insertElement(objectBodyItem, textBox);
              super.insertElement(objectBody, objectBodyItem);
            }
          });
        } else {
          objectDropdown.style.display = 'none';
        }
        super.insertElement(this.hierarchyContainer, object);
      });
      this.removeListeners();
      this.initListButtons();
      this.addListeners();
    } catch (e) {
      logger(`fill(); ` + e, this, COMMENTS);
      super.errorMessage(this.hierarchyContainer, 'записей, соответствующих запросу, не найдено', 3);
      this.totalObjects.textContent = 0;
      this.totalPages.textContent = 0;
    }
    const objectCount = this.hierarchyContainer.querySelectorAll('.hierarchy-view__object');
    objectCount.length === 0 ? super.disableUI(true, this.navExport) : super.disableUI(false, this.navExport);
    this.SEARCH.paginationNumbersHandler();
  }

  objectDropdown(e) {
    logger(`toggleDropdown();`, this, COMMENTS);
    if (e.target.parentElement.parentElement.parentElement.querySelector(
        '.hierarchy-view__object-body').style.display === 'none') {
      e.target.parentElement.parentElement.parentElement.querySelector(
          '.hierarchy-view__object-body').style.display = 'block';
      e.target.style.transform = 'rotate(180deg)';
    } else {
      e.target.parentElement.parentElement.parentElement.querySelector(
          '.hierarchy-view__object-body').style.display = 'none';
      e.target.style.transform = 'rotate(0deg)';
    }
  }

  async objectDetails(e) {
    try {
      super.enableOverlay(true);
      // const data = await super.sendQuery(this.hierarchyDetailURL, `?unique_code=${e.target.dataset.id}`);
      this.currentUniqueCode = e.target.dataset.id;
      const data = await super.sendQuery(this.hierarchyDetailURL, `?unique_code=${e.target.dataset.id}`);
      const headers = [
        'Год',
        'Уникальный код объекта',
        'Код стройки и объекта',
        'Вид инвестиционного проекта',
        'Код территории',
        'Наименование территории',
        'Код министерства',
        'Наименование министерства',
        'Код программы',
        'Наименование программы',
        'Код года ввода в действие',
        'Код задания',
        'Код формы собствен-ника',
        'Целевые статьи расходов',
        'Признак обработки',
        'Наименование',
        'Мощность',
        'Срок Минэкономики',
        'Лимит по данным Минэкономики',
        'Мощность по данным Минэкономики',
        'Срок ввода в действие стройки',
        'Ввод в действие мощности по проекту',
        'Введено с начала стр-ва до 1 января отч. года',
        'Намечено к вводу на год',
        'Введено с начала года по отчетный месяц включительно',
        'Месяц фактического года',
        'Стоимость стр-ва - всего',
        'Лимит капвложений на год (федеральный бюджет)',
        'Лимит капвложений на год (бюджет субъектов РФ)',
        'Лимит капвложений на год (прочие источники)',
        'Фактически исп-но с нач. стр-ва до 1 января отч. года',
        'Фактически исп-но с нач. года по отчетный месяц включительно',
        'Фактически профинан-но с нач. года (федеральный бюджет)',
        'Фактически профинан-но с нач. года (бюджет субъектов РФ)',
        'Фактически профинан-но с нач. года (прочие источники)',
        'Процент технической готовности',
      ];
      const detailWindow = document.createElement('div');
      detailWindow.classList.add('detail-window');
      const innerContainer = document.createElement('div');
      innerContainer.classList.add('detail-window_inner-container');
      const header = document.createElement('div');
      header.classList.add('detail-window__header');
      headers.forEach((name) => {
        const h = document.createElement('div');
        h.textContent = name;
        header.appendChild(h);
      });
      const rows = document.createElement('div');
      rows.classList.add('detail-view__rows');
      const closeButton = document.createElement('button');
      closeButton.classList.add('detail-window__close-button', 'button');
      closeButton.textContent = 'Закрыть';
      const exportButton = document.createElement('button');
      exportButton.classList.add('detail-window__export-button', 'button');
      exportButton.textContent = 'Экспорт';
      data.forEach((entry) => {
        const row = document.createElement('div');
        row.classList.add('detail-window__block');
        Object.keys(entry).forEach((k) => {
          const outer = document.createElement('div');
          outer.classList.add('detail-window__outer-row');
          const el = document.createElement('div');
          el.textContent = entry[k];
          super.insertElement(outer, el);
          super.insertElement(row, outer);
        });
        rows.appendChild(row);
      });
      super.insertElement(detailWindow, innerContainer);
      super.insertElement(detailWindow, closeButton);
      super.insertElement(detailWindow, exportButton);
      super.insertElement(innerContainer, header);
      super.insertElement(innerContainer, rows);
      this.insertElement(this.BODY, detailWindow);
      this.hierarchyDetailWindow = this.initialize('.detail-window');
      this.hierarchyDetailCloseButton = this.initialize(
          '.detail-window__close-button');
      this.hierarchyDetailExportButton = this.initialize(
          '.detail-window__export-button');
      this.detailClose();
      this.detailDownload();
      logger(`detailsShow(); id: ${e.target.dataset.id}`, this, COMMENTS);
    } catch (error) {
      super.enableOverlay(false);
      logger(`detailsShow(); ` + e, this, COMMENTS);
      this.errorMessage(e.target, 'не удалось получить данные с сервера', 3);
    }
  }

  detailClose() {
    super.addListener(this.hierarchyDetailCloseButton, 'click', () => {
      // this.body.removeChild(this.hierarchyDetailWindow);
      this.hierarchyDetailWindow.remove();
      super.enableOverlay(false);
      logger(`detailClose();`, this, COMMENTS);
    }, true);
  }

  detailDownload() {
    super.addListener(this.hierarchyDetailExportButton, 'click', async () => {
      const options = `?unique_code=${this.currentUniqueCode}`;
      this.currentUniqueCode = '';
      const a = document.createElement('a');
      a.href = this.serverURL + this.hierarchyDetailExportURL + options;
      super.insertElement(this.BODY, a);
      // document.body.appendChild(a);
      a.click();
      a.remove();
      this.hierarchyDetailWindow.remove();
      // this.body.removeChild(this.hDetailWindow);
      await super.enableOverlay(false);
      logger(`detailDownload();`, this, COMMENTS);
    }, true);
  }

  async objectEdit(e) {
    try {
      logger(`editObject(); index: ${e.target.dataset.index}`, this, COMMENTS);
      this.uniqueCodeToEdit = e.target.parentElement.querySelector('.hierarchy-view__object-details').dataset.id;
      await this.LINKER.linkerInit();
    } catch (err) {
      this.errorMessage(e.target, 'ошибка');
      console.log(err);
      super.enableOverlay(false);
    }
  }

  initListButtons() {
    this.hierarchyButtons = [];
    try {
      logger(`initListButtons();`, this, COMMENTS);
      const dropdown = super.initialize('.hierarchy-view__object-dropdown', false);
      this.hierarchyButtons.push(dropdown);
      const details = super.initialize('.hierarchy-view__object-details', false);
      this.hierarchyButtons.push(details);
      const edit = super.initialize('.hierarchy-view__object-edit', false);
      this.hierarchyButtons.push(edit);
    } catch (e) {
      logger(`initListButtons(); ` + e, this, COMMENTS);
    }
  }

  addListeners() {
    try {
      let index = 0;
      this.hierarchyButtons.forEach((entry) => {
        entry.forEach((button) => {
          super.addListener(button, 'click', this.hierarchyButtonFunctions[index]);
        });
        index++;
      });
      logger(`addListeners();`, this, COMMENTS);
    } catch (e) {
      logger(`addListeners(); ` + e, this, COMMENTS);
    }
  }

  removeListeners() {
    try {
      let index = 0;
      this.hierarchyButtons.forEach((entry) => {
        entry.forEach((button) => {
          super.removeListener(button, 'click', this.hierarchyButtonFunctions[index]);
        });
        index++;
      });
      logger(`>>> Listeners removed.`, this, COMMENTS);
    } catch (e) {
      logger(`>>> No listeners detected. ` + e, this, COMMENTS);
    }
  }
}

// async fill(data) {
//   try {
//     logger(`fill();`, this, COMMENTS);
//     this.hierarchyContainer = super.initialize('.hierarchy-view__object-container');
//     this.hierarchyContainer.innerHTML = '';
//     this.currentData = data;
//     let index = 0;
//     this.totalObjects.textContent = data.totalLen;
//     this.totalPages.textContent = Math.ceil(data.totalLen / 12);
//     data.data.forEach((entry) => {
//       const object = document.createElement('div');
//       const objectTitle = document.createElement('div');
//       const objectData = document.createElement('div');
//       const objectControl = document.createElement('div');
//       const mainYear = document.createElement('div');
//       const mainReady = document.createElement('div');
//       const mainCode = document.createElement('div');
//       const mainInfo = document.createElement('div');
//       const infoTooltip = document.createElement('div');
//       const mainName = document.createElement('div');
//       const nameTooltip = document.createElement('div');
//       const objectCounter = document.createElement('div');
//       const objectCounterTitle = document.createElement('span');
//       const objectCounterValue = document.createElement('span');
//       const objectDropdown = document.createElement('span');
//       const objectButtons = document.createElement('div');
//       const objectDetailsButton = document.createElement('button');
//       const objectEditButton = document.createElement('button');
//       object.classList.add('hierarchy-view__object');
//       objectTitle.classList.add('hierarchy-view__object-title');
//       objectData.classList.add('hierarchy-view__object-data');
//       objectControl.classList.add('hierarchy-view__object-control');
//       mainYear.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-year',
//         'hierarchy-view-size-year');
//       mainReady.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-ready',
//         'hierarchy-view-size-ready');
//       mainCode.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-code',
//         'hierarchy-view-size-code');
//       mainInfo.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-info',
//         'hierarchy-view-size-info');
//       infoTooltip.classList.add('tooltip');
//       mainName.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-name',
//         'hierarchy-view-size-name');
//       nameTooltip.classList.add('tooltip');
//       objectCounter.classList.add('hierarchy-view__object-counter');
//       objectDropdown.classList.add('hierarchy-view__object-dropdown', 'button', 'material-icons');
//       objectButtons.classList.add('hierarchy-view__object-buttons');
//       objectDetailsButton.classList.add('hierarchy-view__object-details', 'button');
//       objectEditButton.classList.add('hierarchy-view__object-edit', 'button');
//       objectCounterTitle.textContent = 'Записей:';
//       objectDropdown.textContent = 'expand_more';
//       objectDetailsButton.textContent = 'Подробнее';
//       objectEditButton.textContent = 'Изменить';
//       mainYear.textContent = entry[0].yearData;
//       mainReady.textContent = entry[0].maxReadiness;
//       mainCode.textContent = entry[0].buildCode;
//       mainInfo.innerHTML = entry[0].ministryName + ' ' + entry[0].territoryName + ' ' + entry[0].programName;
//       infoTooltip.innerHTML = entry[0].ministryName + `<br>` + entry[0].territoryName + `<br>` + entry[0].programName;
//       mainName.textContent = entry[0].name.replace('***', ' ');
//       nameTooltip.innerHTML = entry[0].name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>');
//       objectCounterValue.textContent = entry.length;
//       objectDetailsButton.dataset.id = entry[0].uniqueCode;
//       objectEditButton.dataset.index = index.toString();
//       index++;
//       super.insertElement(object, objectTitle);
//       super.insertElement(objectTitle, objectData);
//       super.insertElement(objectTitle, objectControl);
//       super.insertElement(mainInfo, infoTooltip);
//       super.insertElement(mainName, nameTooltip);
//       super.insertElement(objectData, mainYear);
//       super.insertElement(objectData, mainReady);
//       super.insertElement(objectData, mainCode);
//       super.insertElement(objectData, mainInfo);
//       super.insertElement(objectData, mainName);
//       super.insertElement(objectCounter, objectCounterTitle);
//       super.insertElement(objectCounter, objectCounterValue);
//       super.insertElement(objectButtons, objectDetailsButton);
//       super.insertElement(objectButtons, objectEditButton);
//       super.insertElement(objectControl, objectCounter);
//       super.insertElement(objectControl, objectDropdown);
//       super.insertElement(objectControl, objectButtons);
//       if (entry.length > 1) {
//         const objectBody = document.createElement('div');
//         objectBody.classList.add('hierarchy-view__object-body');
//         objectBody.style.display = 'none';
//         super.insertElement(object, objectBody);
//         entry.forEach((el) => {
//           if (el !== entry[0]) {
//             const objectBodyItem = document.createElement('div');
//             const objectItemYear = document.createElement('div');
//             const objectItemReady = document.createElement('div');
//             const objectItemCode = document.createElement('div');
//             const objectItemInfo = document.createElement('div');
//             const objectItemName = document.createElement('div');
//             const itemInfoTooltip = document.createElement('div');
//             const itemNameTooltip = document.createElement('div');
//             objectBodyItem.classList.add('hierarchy-view__object-body-item');
//             objectItemYear.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-year',
//               'hierarchy-view-size-year');
//             objectItemReady.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-ready',
//               'hierarchy-view-size-ready');
//             objectItemCode.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-code',
//               'hierarchy-view-size-code');
//             objectItemInfo.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-info',
//               'hierarchy-view-size-info');
//             objectItemName.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-name',
//               'hierarchy-view-size-name');
//             itemInfoTooltip.classList.add('tooltip');
//             itemNameTooltip.classList.add('tooltip');
//             objectItemYear.textContent = el.yearData;
//             objectItemReady.textContent = el.maxReadiness;
//             objectItemCode.textContent = el.buildCode;
//             objectItemInfo.textContent = el.ministryName + el.territoryName + el.programName;
//             itemInfoTooltip.innerHTML = el.ministryName + '<br>' + el.territoryName + '<br>' + el.programName;
//             objectItemName.textContent = el.name.replace('***', ' ');
//             itemNameTooltip.innerHTML = el.name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>');
//             super.insertElement(objectBodyItem, objectItemYear);
//             super.insertElement(objectBodyItem, objectItemReady);
//             super.insertElement(objectBodyItem, objectItemCode);
//             super.insertElement(objectBodyItem, objectItemInfo);
//             super.insertElement(objectBodyItem, objectItemName);
//             super.insertElement(objectItemInfo, itemInfoTooltip);
//             super.insertElement(objectItemName, itemNameTooltip);
//             super.insertElement(objectBody, objectBodyItem);
//           }
//         });
//       } else {
//         objectDropdown.style.display = 'none';
//       }
//       super.insertElement(this.hierarchyContainer, object);
//     });
//     this.removeListeners();
//     this.initListButtons();
//     this.addListeners();
//   } catch (e) {
//     logger(`fill(); ` + e, this, COMMENTS);
//     super.errorMessage(this.hierarchyContainer, 'записей, соответствующих запросу, не найдено', 3);
//     this.totalObjects.textContent = 0;
//     this.totalPages.textContent = 0;
//   }
//   const objectCount = this.hierarchyContainer.querySelectorAll('.hierarchy-view__object');
//   objectCount.length === 0 ? super.disableUI(true, this.navExport) : super.disableUI(false, this.navExport);
//   this.SEARCH.paginationNumbersHandler();
// }
