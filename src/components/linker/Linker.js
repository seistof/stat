import {logger} from '@core/utils';
import {COMMENTS} from '@/index';
import {Search} from '@/components/search/Search';

// export let LINKER;

export class Linker extends Search {
  constructor(
      linkerList,
      totalObjects,
      currentPage,
      totalPages,
      saveButton,
      checkButton,
      similarButton,
      deleteButton,
      resetButton,
      mainButton,
      controlButtons,
      selectSimilarity,
      selectSimilarityDisplay,
      mainObjectSelect,
      mainObjectAdd,
      objectControlButtons,
      additionalContainer,
      additionalObjects,
      currentlySelectedObject,
      linkerListSelectButtons,
      linkerListDetailsButtons,
      currentUniqueCodeEdit,
      currentUniqueCode,
  ) {
    super();
    this.linkerList = linkerList;
    this.totalObjects = totalObjects;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.saveButton = saveButton;
    this.checkButton = checkButton;
    this.similarButton = similarButton;
    this.deleteButton = deleteButton;
    this.resetButton = resetButton;
    this.mainButton = mainButton;
    this.selectSimilarity = selectSimilarity;
    this.selectSimilarityDisplay = selectSimilarityDisplay;
    this.controlButtons = controlButtons;
    this.controlButtonFuncs = [
      this.saveFn.bind(this),
      this.checkFn.bind(this),
      this.similarityFn.bind(this),
      this.deleteFn.bind(this),
      this.resetFn.bind(this),
      this.goMainPageFn.bind(this),
      this.objectMainSelect.bind(this),
      this.objectMainAdd.bind(this),
    ];
    this.similarityInputWatchFn = this.similarityInputWatch.bind(this);
    this.additionalContainer = additionalContainer;
    this.mainObjectSelect = mainObjectSelect;
    this.mainObjectAdd = mainObjectAdd;
    this.additionalObjects = additionalObjects;
    this.additionalObjectsFuncs = [
      this.objectAdditionalSelect.bind(this),
      this.objectAdditionalRemove.bind(this),
    ];
    this.currentlySelectedObject = currentlySelectedObject;
    this.linkerListSelectButtons = linkerListSelectButtons;
    this.linkerListDetailsButtons = linkerListDetailsButtons;
    this.listItemSelectFunc = this.listItemSelectFn.bind(this);
    this.currentUniqueCodeEdit = currentUniqueCodeEdit;
    this.currentUniqueCode = currentUniqueCode;
    this.currenListStat = 'normal'; // normal/similarity/check
    this.linkerState = 'normal'; // normal/update
  }

  async linkerInit() {
    logger(``, false, COMMENTS);
    logger(`init();`, this, COMMENTS);
    this.removeInactiveListeners();
    await this.enableOverlay(true);
    await this.disableUI(true, this.MENU, this.SEARCHBOX);
    super.clearDisplay();
    super.insertElement(this.DISPLAY, this.linkerNode());
    await this.SEARCH.searchInit();
    this.linkerList = super.initialize('.linker__list');
    this.totalObjects = super.initialize('.pagination__info-objects-value');
    this.currentPage = super.initialize('.pagination__nav-display');
    this.totalPages = super.initialize('.pagination__info-pages-value');
    this.saveButton = super.initialize('.linker__control-save');
    this.checkButton = super.initialize('.linker__control-check-objects');
    this.similarButton = super.initialize('.linker__control-show-similar');
    this.deleteButton = super.initialize('.linker__control-delete');
    this.resetButton = super.initialize('.linker__control-reset');
    this.mainButton = super.initialize('.linker__control-main-page');
    this.selectSimilarity = super.initialize('.select-similarity');
    this.selectSimilarityDisplay = super.initialize('.select-similarity-display');
    this.mainObjectSelect = super.initialize('.linker__object-main-select');
    this.mainObjectAdd = super.initialize('.linker__object-main-add');
    this.additionalContainer = super.initialize('.linker__object-additional-container');
    await this.disableUI(true,
        this.saveButton,
        this.checkButton,
        this.similarButton,
        this.deleteButton,
        this.resetButton,
        this.SEARCH.applyButton,
        this.SEARCH.searchButton,
        this.SEARCH.nextButton,
        this.SEARCH.prevButton,
        this.SEARCH.goToButton);
    this.controlButtonsRemoveListeners();
    this.controlButtons = [];
    this.controlButtons.push(this.saveButton);
    this.controlButtons.push(this.checkButton);
    this.controlButtons.push(this.similarButton);
    this.controlButtons.push(this.deleteButton);
    this.controlButtons.push(this.resetButton);
    this.controlButtons.push(this.mainButton);
    this.controlButtons.push(this.mainObjectSelect);
    this.controlButtons.push(this.mainObjectAdd);
    this.controlButtonsAddListeners();
    this.additionalObjects = [];
    this.currentUniqueCodeEdit = '';
    if (this.HIERARCHY.uniqueCodeToEdit !== '') {
      this.currentUniqueCodeEdit = this.HIERARCHY.uniqueCodeToEdit;
      this.HIERARCHY.uniqueCodeToEdit = '';
      const response = await super.sendQuery(this.linkerGetEditURL, `?unique_code=${this.currentUniqueCodeEdit}`);
      await response.data.forEach(() => this.mainObjectAdd.click());
      this.additionalObjects[this.additionalObjects.length - 1].querySelector('.linker__object-additional-remove').click();
      const mainObject = super.initialize('.linker__object-main');
      mainObject.querySelector('.linker-main-unique-code').textContent = this.currentUniqueCodeEdit;
      mainObject.querySelector('.linker-object-id').textContent = response.data[0].id;
      mainObject.querySelector('.linker-object-code').textContent = response.data[0].build_code;
      mainObject.querySelector('.linker-object-year').textContent = response.data[0].year_data;
      mainObject.querySelector('.linker-object-name').textContent = response.data[0].generate_name;
      let index = 1;
      this.linkerState = 'normal';
      this.additionalObjects.forEach((obj) => {
        if (index < response.length - 1) ;
        {
          obj.querySelector('.linker-object-id').textContent = response.data[index].id;
          obj.querySelector('.linker-object-code').textContent = response.data[index].build_code;
          obj.querySelector('.linker-object-year').textContent = response.data[index].year_data;
          obj.querySelector('.linker-object-name').textContent = response.data[index].generate_name;
          index++;
        }
      });
      this.linkerState = 'update';
      await super.disableUI(false, this.deleteButton, this.resetButton);
      await super.disableUI(true, this.saveButton, this.mainObjectSelect);
    }
    await this.enableOverlay(false);
    await this.disableUI(false, this.MENU, this.SEARCHBOX);
  }

  async fill(data, detailsHierarchy = false) {
    try {
      logger(`fill();`, this, COMMENTS);
      console.log(data);
      this.linkerList.innerHTML = '';
      this.totalObjects.textContent = data.totalLen;
      this.totalPages.textContent = Math.ceil(data.totalLen / 50);
      this.linkerList.innerHTML = '';
      data.data.forEach((entry) => {
        const listItem = document.createElement('div');
        listItem.classList.add('linker__list-item');
        const objectUniqueCode = document.createElement('div');
        objectUniqueCode.classList.add('linker__list-item-unique-code');
        objectUniqueCode.textContent = entry.uniqueCode ? entry.uniqueCode : '';
        objectUniqueCode.style.display = 'none';
        const objectId = document.createElement('div');
        objectId.classList.add('linker__list-item-id');
        objectId.textContent = entry.id;
        objectId.style.display = 'none';
        const code = document.createElement('div');
        code.classList.add('linker__list-item-code', 'linker__list-size-code');
        code.textContent = entry.buildCode;
        const year = document.createElement('div');
        year.classList.add('linker__list-item-year', 'linker__list-size-year');
        year.textContent = entry.yearData;
        const ready = document.createElement('div');
        ready.classList.add('linker__list-item-ready', 'linker__list-size-ready');
        ready.textContent = entry.maxPercentage;
        const ministry = document.createElement('div');
        ministry.classList.add('linker__list-item-ministry', 'linker__list-size-ministry');
        ministry.textContent = entry.ministryName.replace('Министерство', 'Мин.');
        const ministryTooltip = document.createElement('div');
        ministryTooltip.classList.add('tooltip');
        ministryTooltip.textContent = entry.ministryName;
        const territory = document.createElement('div');
        territory.classList.add('linker__list-item-territory', 'linker__list-size-territory');
        territory.textContent = entry.territoryName;
        const territoryTooltip = document.createElement('div');
        territoryTooltip.classList.add('tooltip');
        territoryTooltip.textContent = entry.territoryName;
        const program = document.createElement('div');
        program.classList.add('linker__list-item-program', 'linker__list-size-program');
        program.textContent = entry.programName;
        const programTooltip = document.createElement('div');
        programTooltip.classList.add('tooltip');
        programTooltip.textContent = entry.programName;
        const name = document.createElement('div');
        name.classList.add('linker__list-item-name', 'linker__list-size-name');
        name.textContent = entry.name.replace('***', ' ');
        const nameTooltip = document.createElement('div');
        nameTooltip.classList.add('tooltip');
        nameTooltip.innerHTML = entry.name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>');
        const details = document.createElement('div');
        details.classList.add('linker__list-item-details', 'linker__list-size-details');
        const detailsTooltip = document.createElement('div');
        detailsTooltip.classList.add('tooltip');
        ministry.appendChild(ministryTooltip);
        territory.appendChild(territoryTooltip);
        program.appendChild(programTooltip);
        name.appendChild(nameTooltip);
        const detailButton = document.createElement('button');
        detailButton.classList.add('linker__list-item-details-button', 'button');
        detailButton.dataset.id = entry.id;
        detailButton.textContent = 'Подробнее';
        const selectButton = document.createElement('button');
        selectButton.classList.add('linker__list-item-pick-button', 'button');
        selectButton.textContent = 'Выбрать';
        details.appendChild(detailButton);
        details.appendChild(selectButton);
        listItem.appendChild(objectUniqueCode);
        listItem.appendChild(objectId);
        listItem.appendChild(code);
        listItem.appendChild(year);
        listItem.appendChild(ready);
        listItem.appendChild(ministry);
        listItem.appendChild(territory);
        listItem.appendChild(program);
        listItem.appendChild(name);
        listItem.appendChild(details);
        this.linkerList.appendChild(listItem);
      });
      this.linkerListSelectRemoveListeners();
      this.linkerListSelectButtons = [];
      this.linkerListSelectButtons = this.linkerList.querySelectorAll('.linker__list-item-pick-button');
      this.linkerListDetailsButtons = [];
      this.linkerListDetailsButtons = this.linkerList.querySelectorAll('.linker__list-item-details-button');
      this.linkerListSelectAddListeners();
      if (detailsHierarchy) {
        // add hierarchy details
      } else {
        this.linkerListDetailsButtons.forEach((button) => {
          button.style.display = 'none';
        });
      }
      await this.enableOverlay(false);
      await this.disableUI(false, this.MENU, this.SEARCHBOX);
    } catch (e) {
      logger(`fill(); ` + e, this, COMMENTS);
      await this.enableOverlay(false);
      await this.disableUI(false, this.MENU, this.SEARCHBOX);
      super.errorMessage(this.linkerList, 'нет данных', 2);
      this.totalObjects.textContent = 0;
      this.totalPages.textContent = 0;
    }
  }

  saveFn() {
    logger(`saveFn();`, this, COMMENTS);

    const removeButtons = this.additionalContainer.querySelectorAll('.linker__object-additional-remove');
    removeButtons.forEach((button) => button.click());
    const mainBox = super.initialize('.linker__object-main');
    mainBox.querySelector('.linker-main-unique-code').textContent = '';
    mainBox.querySelector('.linker-object-id').textContent = '';
    mainBox.querySelector('.linker-object-code').textContent = '';
    mainBox.querySelector('.linker-object-year').textContent = '';
    mainBox.querySelector('.linker-object-name').textContent = '';
    this.currentUniqueCode = '';
    this.currentUniqueCodeEdit = '';
    super.disableUI(true, this.saveButton, this.deleteButton);
  }

  async checkFn() {
    logger(`checkFn();`, this, COMMENTS);
    super.disableUI(true, this.SEARCH.applyButton, this.SEARCH.searchButton);
    const uniqueCode = super.initialize('.linker-main-unique-code').textContent;
    console.log(uniqueCode);
    await this.enableOverlay(true);
    await this.disableUI(true, this.MENU, this.SEARCHBOX);
  }

  async similarityFn() {
    logger(`similarityFn();`, this, COMMENTS);
    super.disableUI(true, this.SEARCH.applyButton, this.SEARCH.searchButton);
    const id = super.initialize('.linker-object-id').textContent;
    const y = super.initialize('.linker__object-main-year').textContent;
    const p = super.initialize('.select-similarity-display').value;
    await this.enableOverlay(true);
    await this.disableUI(true, this.MENU, this.SEARCHBOX);
    await this.fill(await super.sendQuery(this.linkerPredictionNewURL,
        `?normalized_id=${id}&year_data=${y}&percentage_limit=${p}`,
    ));
  }

  async deleteFn(e) {
    logger(`deleteFn();`, this, COMMENTS);
    console.log(this.currentUniqueCodeEdit);
    await this.enableOverlay(true);
    await this.disableUI(true, this.MENU, this.SEARCHBOX);
    const q = await super.deleteQuery(this.currentUniqueCodeEdit);
    if (q === 200) {
      this.resetButton.click();
      super.errorMessage(e.target, 'удалено', 1, '#0f7814');
    } else {
      super.errorMessage(e.target, 'ошибка, объект не удален');
    }
    await this.enableOverlay(false);
    await this.disableUI(false, this.MENU, this.SEARCHBOX);
  }

  resetFn() {
    logger(`resetFn();`, this, COMMENTS);
    const removeButtons = this.additionalContainer.querySelectorAll('.linker__object-additional-remove');
    removeButtons.forEach((button) => button.click());
    const mainBox = super.initialize('.linker__object-main');
    mainBox.querySelector('.linker-main-unique-code').textContent = '';
    mainBox.querySelector('.linker-object-id').textContent = '';
    mainBox.querySelector('.linker-object-code').textContent = '';
    mainBox.querySelector('.linker-object-year').textContent = '';
    mainBox.querySelector('.linker-object-name').textContent = '';
    super.disableUI(true, this.saveButton, this.deleteButton);
    super.disableUI(false, this.mainObjectSelect);
    this.currentUniqueCode = '';
    this.currentUniqueCodeEdit = '';
  }

  goMainPageFn() {
    logger(`goMainPageFn();`, this, COMMENTS);
    this.navMain.click();
  }

  similarityInputWatch() {
    this.selectSimilarityDisplay.value = this.selectSimilarity.value;
  }

  controlButtonsAddListeners() {
    try {
      logger(`controlButtonsAddListeners();`, this, COMMENTS);
      let index = 0;
      this.controlButtons.forEach((button) => {
        super.addListener(button, 'click', this.controlButtonFuncs[index]);
        index++;
      });
      super.addListener(this.selectSimilarity, 'input', this.similarityInputWatchFn);
    } catch (e) {
      logger(`controlButtonsAddListeners(); ` + e, this, COMMENTS);
    }
  }

  controlButtonsRemoveListeners() {
    try {
      let index = 0;
      this.controlButtons.forEach((button) => {
        super.removeListener(button, 'click', this.controlButtonFuncs[index]);
        index++;
      });
      super.removeListener(this.selectSimilarity, 'input', this.similarityInputWatchFn);
      logger(`>>> Listeners removed.`, this, COMMENTS);
    } catch (e) {
      logger(`>>> No listeners detected. ` + e, this, COMMENTS);
    }
  }

  objectMainAdd() {
    logger(`objectMainAdd();`, this, COMMENTS);
    const additionalObject = document.createElement('div');
    additionalObject.classList.add('linker__object-additional');
    const objectBox = document.createElement('div');
    objectBox.classList.add('linker__object-additional-box');
    const objectSelectButton = document.createElement('span');
    objectSelectButton.classList.add('linker__object-additional-select', 'button', 'material-icons');
    objectSelectButton.textContent = 'playlist_add_check';
    const objectDeleteButton = document.createElement('span');
    objectDeleteButton.classList.add('linker__object-additional-remove', 'button', 'material-icons');
    objectDeleteButton.textContent = 'remove';
    additionalObject.appendChild(objectBox);
    additionalObject.appendChild(objectSelectButton);
    additionalObject.appendChild(objectDeleteButton);
    const additionalId = document.createElement('div');
    additionalId.classList.add('linker-object-id');
    additionalId.style.display = 'none';
    const code = document.createElement('div');
    code.classList.add('linker__object-additional-code', 'linker__object-size-code', 'linker-object-code');
    const year = document.createElement('div');
    year.classList.add('linker__object-additional-year', 'linker__object-size-year', 'linker-object-year');
    const name = document.createElement('div');
    name.classList.add('linker__object-additional-name', 'linker__object-size-name', 'linker-object-name');
    const nameTooltip = document.createElement('div');
    nameTooltip.classList.add('tooltip');
    name.appendChild(nameTooltip);
    objectBox.appendChild(additionalId);
    objectBox.appendChild(code);
    objectBox.appendChild(year);
    objectBox.appendChild(name);
    this.additionalContainer.appendChild(additionalObject);
    this.additionalObjects.push(additionalObject);
    this.additionalObjectAddListeners();
  }

  async objectMainSelect(e) {
    logger(`objectMainSelect();`, this, COMMENTS);
    try {
      this.currentlySelectedObject.style.background = 'none';
    } catch (e) {
      logger(`>>> No selection detected ` + e, this, COMMENTS);
    }
    await this.enableOverlay(true);
    await this.disableUI(true, this.MENU, this.SEARCHBOX);
    await this.fill(await super.sendQuery(this.linkerURL));
    this.currentlySelectedObject = e.target.parentElement;
    this.currentlySelectedObject.style.background = '#11a0111c';
    super.disableUI(true, this.checkButton, this.similarButton);
    super.disableUI(false, this.SEARCH.applyButton, this.SEARCH.searchButton);
  }

  async objectAdditionalSelect(e) {
    logger(`objectAdditionalSelect();`, this, COMMENTS);
    try {
      this.currentlySelectedObject.style.background = 'none';
    } catch (e) {
      logger(`>>> No selection detected ` + e, this, COMMENTS);
    }
    await this.enableOverlay(true);
    await this.disableUI(true, this.MENU, this.SEARCHBOX);
    await this.fill(await super.sendQuery(this.linkerURL));
    this.currentlySelectedObject = e.target.parentElement;
    this.currentlySelectedObject.style.background = '#11a0111c';
    if (this.currentUniqueCodeEdit !== '') {
      super.disableUI(false, this.similarButton, this.SEARCH.applyButton, this.SEARCH.searchButton);
    } else {
      super.disableUI(false, this.similarButton, this.checkButton, this.SEARCH.applyButton, this.SEARCH.searchButton);
    }
  }

  objectAdditionalRemove(e) {
    logger(`objectAdditionalRemove();`, this, COMMENTS);
    this.disableUI(true, this.similarButton, this.checkButton, this.SEARCH.applyButton, this.SEARCH.searchButton);
    const selectButtons = e.target.parentElement.querySelector('.linker__object-additional-select');
    super.removeListener(selectButtons, 'click', this.additionalObjectsFuncs[0]);
    e.target.parentElement.remove();
    super.disableUI(false, this.saveButton);
    this.additionalObjects = this.additionalObjects.filter((el) => {
      if (el !== e.target.parentElement) {
        return el;
      }
    });
  }

  additionalObjectAddListeners() {
    logger(`additionalObjectAddListeners();`, this, COMMENTS);
    const selectButtons = this.additionalContainer.querySelectorAll('.linker__object-additional-select');
    const removeButtons = this.additionalContainer.querySelectorAll('.linker__object-additional-remove');
    try {
      selectButtons.forEach((button) => {
        super.removeListener(button, 'click', this.additionalObjectsFuncs[0]);
      });
      removeButtons.forEach((button) => {
        super.removeListener(button, 'click', this.additionalObjectsFuncs[1]);
      }, true);
    } catch (e) {
      logger(`additionalObjectAddListeners(); ` + e, this, COMMENTS);
    }
    selectButtons.forEach((button) => {
      super.addListener(button, 'click', this.additionalObjectsFuncs[0]);
    });
    removeButtons.forEach((button) => {
      super.addListener(button, 'click', this.additionalObjectsFuncs[1]);
    }, true);
  }

  async listItemSelectFn(e) {
    logger(`listItemSelectFn();`, this, COMMENTS);
    await super.disableUI(true, this.similarButton, this.checkButton, this.SEARCH.applyButton, this.SEARCH.searchButton);
    if (this.currentUniqueCodeEdit !== '') {
      await super.disableUI(false, this.saveButton);
    } else {
      await super.disableUI(false, this.saveButton, this.resetButton);
    }
    this.currentlySelectedObject.style.background = 'none';
    const uniqueCode = this.currentlySelectedObject.querySelector('.linker-main-unique-code');
    const id = this.currentlySelectedObject.querySelector('.linker-object-id');
    const code = this.currentlySelectedObject.querySelector('.linker-object-code');
    const year = this.currentlySelectedObject.querySelector('.linker-object-year');
    const name = this.currentlySelectedObject.querySelector('.linker-object-name');
    try {
      uniqueCode.textContent = e.target.parentElement.parentElement.querySelector('.linker__list-item-unique-code').textContent;
    } catch (e) {
      logger(`>>> No Unique Code for Additional object. ` + e, this, COMMENTS);
    }
    id.textContent = e.target.parentElement.parentElement.querySelector('.linker__list-item-id').textContent;
    code.textContent = e.target.parentElement.parentElement.querySelector('.linker__list-item-code').textContent;
    year.textContent = e.target.parentElement.parentElement.querySelector('.linker__list-item-year').textContent;
    name.textContent = e.target.parentElement.parentElement.querySelector('.linker__list-item-name').textContent;
  }

  linkerListSelectAddListeners() {
    logger(`linkerListSelectAddListeners();`, this, COMMENTS);
    this.linkerListSelectButtons.forEach((button) => {
      super.addListener(button, 'click', this.listItemSelectFunc);
    });
  }

  linkerListSelectRemoveListeners() {
    try {
      this.linkerListSelectButtons.forEach((button) => {
        super.removeListener(button, 'click', this.listItemSelectFunc);
      });
      logger(`>>> Listeners removed.`, this, COMMENTS);
    } catch (e) {
      logger(`>>> No listeners detected. ` + e, this, COMMENTS);
    }
  }

  linkerListDetailsAddListeners() {
    logger(`linkerListDetailsAddListeners();`, this, COMMENTS);
  }

  linkerListDetailsRemoveListeners() {
    logger(`linkerListDetailsRemoveListeners();`, this, COMMENTS);
  }

  async listItemDetails(e) {
    logger(`listItemDetails();`, this, COMMENTS);
    try {
      super.disableUI(true, this.MENU, this.SEARCHBOX);
      super.enableOverlay(true);
      // const data = await super.sendQuery(this.hierarchyDetailURL, `?unique_code=${e.target.dataset.id}`);
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
      super.disableUI(false, this.MENU, this.SEARCHBOX);
      super.enableOverlay(false);
      logger(`detailsShow(); ` + e, this, COMMENTS);
      this.errorMessage(e.target, 'Не удалось получить данные с сервера.', 3);
    }
  }

  async createNewHierarchy() {
    logger(`createNewHierarchy();`, this, COMMENTS);
    // const hierarchy = `{
    //   "main": ${},
    //   "additional": ${}
    // }`;
  }

  async updateHierarchy() {
    logger(`updateHierarchy();`, this, COMMENTS);
    // const hierarchy = `{
    //   "uniqueCode": "${}",
    //   "toAdd": ${},
    //   "toDelete": ${}
    // }`;
  }

  async deleteHierarchy() {
    logger(`deleteHierarchy();`, this, COMMENTS);
    // const uniqueCode = `{
    //   "uniqueCode": ${}
    // }`;
  }

  linkerNode() {
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
    mainNameTooltip.classList.add('tooltip');
    linkerObjectMainBox.appendChild(linkerObjectMainUniqueCode);
    linkerObjectMainBox.appendChild(linkerObjectMainId);
    linkerObjectMainBox.appendChild(linkerObjectMainCode);
    linkerObjectMainBox.appendChild(linkerObjectMainYear);
    linkerObjectMainBox.appendChild(linkerObjectMainName);
    linkerObjectMainName.appendChild(mainNameTooltip);
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
}
