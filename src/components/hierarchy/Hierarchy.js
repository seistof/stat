import {MainView} from '@core/MainView';
import {logger} from '@core/utils';
import {COMMENTS} from '@/index';
// import hierarchyTEST from '../../../hierarchy.json';

export let HIERARCHY;

export class Hierarchy extends MainView {
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
  }

  async init(main, hierarchy, search) {
    logger(``, false, COMMENTS);
    logger(`init();`, this, COMMENTS);
    HIERARCHY = this;
    await this.enableOverlay(true);
    await this.disableUI(true, this.MENU, this.SEARCH);
    this.clearDisplay();
    super.insertElement(this.DISPLAY, this.hierarchyNode());
    this.totalObjects = super.initialize('.pagination__info-objects-value');
    this.currentPage = super.initialize('.pagination__nav-display');
    this.totalPages = super.initialize('.pagination__info-pages-value');
    search.init(main, hierarchy);
    // TEST
    // await this.fill(hierarchyTEST);
    // console.log(hierarchyTEST);
    // TEST
    this.fill(await super.sendQuery(this.hierarchyURL));
    this.initListButtons();
    this.removeListeners();
    this.addListeners();
    await this.enableOverlay(false);
    await this.disableUI(false, this.MENU, this.SEARCH);
  }

  async fill(data) {
    try {
      console.log(data);
      logger(`fill();`, this, COMMENTS);
      await this.enableOverlay(true);
      await this.disableUI(true, this.MENU, this.SEARCH);
      this.hierarchyContainer = super.initialize('.hierarchy-view__object-container');
      this.hierarchyContainer.innerHTML = '';
      this.currentData = data;
      let index = 0;
      this.totalObjects.textContent = data.totalLen;
      this.totalPages.textContent = Math.ceil(data.totalLen / 12);
      data.data.forEach((entry) => {
        const object = document.createElement('div');
        const objectTitle = document.createElement('div');
        const objectData = document.createElement('div');
        const objectControl = document.createElement('div');
        const mainYear = document.createElement('div');
        const mainReady = document.createElement('div');
        const mainCode = document.createElement('div');
        const mainInfo = document.createElement('div');
        const infoTooltip = document.createElement('div');
        const mainName = document.createElement('div');
        const nameTooltip = document.createElement('div');
        const objectCounter = document.createElement('div');
        const objectCounterTitle = document.createElement('span');
        const objectCounterValue = document.createElement('span');
        const objectDropdown = document.createElement('span');
        const objectButtons = document.createElement('div');
        const objectDetailsButton = document.createElement('button');
        const objectEditButton = document.createElement('button');
        object.classList.add('hierarchy-view__object');
        objectTitle.classList.add('hierarchy-view__object-title');
        objectData.classList.add('hierarchy-view__object-data');
        objectControl.classList.add('hierarchy-view__object-control');
        mainYear.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-year', 'hierarchy-view-size-year');
        mainReady.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-ready', 'hierarchy-view-size-ready');
        mainCode.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-code', 'hierarchy-view-size-code');
        mainInfo.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-info', 'hierarchy-view-size-info');
        infoTooltip.classList.add('tooltip');
        mainName.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-name', 'hierarchy-view-size-name');
        nameTooltip.classList.add('tooltip');
        objectCounter.classList.add('hierarchy-view__object-counter');
        objectDropdown.classList.add('hierarchy-view__object-dropdown', 'button', 'material-icons');
        objectButtons.classList.add('hierarchy-view__object-buttons');
        objectDetailsButton.classList.add('hierarchy-view__object-details', 'button');
        objectEditButton.classList.add('hierarchy-view__object-edit', 'button');
        objectCounterTitle.textContent = 'Записей:';
        objectDropdown.textContent = 'expand_more';
        objectDetailsButton.textContent = 'Подробнее';
        objectEditButton.textContent = 'Изменить';
        mainYear.textContent = entry[0].yearData;
        mainReady.textContent = entry[0].maxReadiness;
        mainCode.textContent = entry[0].buildCode;
        mainInfo.innerHTML = entry[0].ministryName + ' ' + entry[0].territoryName + ' ' + entry[0].programName;
        infoTooltip.innerHTML = entry[0].ministryName + `<br>` + entry[0].territoryName + `<br>` + entry[0].programName;
        mainName.textContent = entry[0].name.replace('***', ' ');
        nameTooltip.innerHTML = entry[0].name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>');
        objectCounterValue.textContent = entry.length;
        objectDetailsButton.dataset.id = entry[0].uniqueCode;
        objectEditButton.dataset.index = index.toString();
        index++;
        super.insertElement(object, objectTitle);
        super.insertElement(objectTitle, objectData);
        super.insertElement(objectTitle, objectControl);
        super.insertElement(mainInfo, infoTooltip);
        super.insertElement(mainName, nameTooltip);
        super.insertElement(objectData, mainYear);
        super.insertElement(objectData, mainReady);
        super.insertElement(objectData, mainCode);
        super.insertElement(objectData, mainInfo);
        super.insertElement(objectData, mainName);
        super.insertElement(objectCounter, objectCounterTitle);
        super.insertElement(objectCounter, objectCounterValue);
        super.insertElement(objectButtons, objectDetailsButton);
        super.insertElement(objectButtons, objectEditButton);
        super.insertElement(objectControl, objectCounter);
        super.insertElement(objectControl, objectDropdown);
        super.insertElement(objectControl, objectButtons);
        if (entry.length > 1) {
          const objectBody = document.createElement('div');
          objectBody.classList.add('hierarchy-view__object-body');
          objectBody.style.display = 'none';
          super.insertElement(object, objectBody);
          entry.forEach((el) => {
            if (el !== entry[0]) {
              const objectBodyItem = document.createElement('div');
              const objectItemYear = document.createElement('div');
              const objectItemReady = document.createElement('div');
              const objectItemCode = document.createElement('div');
              const objectItemInfo = document.createElement('div');
              const objectItemName = document.createElement('div');
              const itemInfoTooltip = document.createElement('div');
              const itemNameTooltip = document.createElement('div');
              objectBodyItem.classList.add('hierarchy-view__object-body-item');
              objectItemYear.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-year', 'hierarchy-view-size-year');
              objectItemReady.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-ready', 'hierarchy-view-size-ready');
              objectItemCode.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-code', 'hierarchy-view-size-code');
              objectItemInfo.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-info', 'hierarchy-view-size-info');
              objectItemName.classList.add('hierarchy-view__object-item', 'hierarchy-view__object-name', 'hierarchy-view-size-name');
              itemInfoTooltip.classList.add('tooltip');
              itemNameTooltip.classList.add('tooltip');
              objectItemYear.textContent = el.yearData;
              objectItemReady.textContent = el.maxReadiness;
              objectItemCode.textContent = el.buildCode;
              objectItemInfo.textContent = el.ministryName + el.territoryName + el.programName;
              itemInfoTooltip.innerHTML = el.ministryName + '<br>' + el.territoryName + '<br>' + el.programName;
              objectItemName.textContent = el.name.replace('***', ' ');
              itemNameTooltip.innerHTML = el.name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>');
              super.insertElement(objectBodyItem, objectItemYear);
              super.insertElement(objectBodyItem, objectItemReady);
              super.insertElement(objectBodyItem, objectItemCode);
              super.insertElement(objectBodyItem, objectItemInfo);
              super.insertElement(objectBodyItem, objectItemName);
              super.insertElement(objectItemInfo, itemInfoTooltip);
              super.insertElement(objectItemName, itemNameTooltip);
              super.insertElement(objectBody, objectBodyItem);
            }
          });
        } else {
          objectDropdown.style.display = 'none';
        }
        super.insertElement(this.hierarchyContainer, object);
      });
      this.initListButtons();
      this.removeListeners();
      this.addListeners();
      await this.enableOverlay(false);
      await this.disableUI(false, this.MENU, this.SEARCH);
    } catch (e) {
      logger(`fill(); ` + e, this, COMMENTS);
      await this.enableOverlay(false);
      await this.disableUI(false, this.MENU, this.SEARCH);
      super.errorMessage(this.hierarchyContainer, 'Нет данных.', 2);
      this.totalObjects.textContent = 0;
      this.totalPages.textContent = 0;
    }
  }

  hierarchyNode() {
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
    return hierarchy;
  }

  objectDropdown(e) {
    logger(`toggleDropdown();`, this, COMMENTS);
    if (e.target.parentElement.parentElement.parentElement.querySelector('.hierarchy-view__object-body').style.display === 'none') {
      e.target.parentElement.parentElement.parentElement.querySelector('.hierarchy-view__object-body').style.display = 'block';
      e.target.style.transform = 'rotate(180deg)';
    } else {
      e.target.parentElement.parentElement.parentElement.querySelector('.hierarchy-view__object-body').style.display = 'none';
      e.target.style.transform = 'rotate(0deg)';
    }
  }

  async objectDetails(e) {
    try {
      super.disableUI(true, this.MENU, this.SEARCH);
      super.enableOverlay(true);
      // const data = await super.sendQuery(this.hierarchyDetailURL, `?unique_code=${e.target.dataset.id}`);
      this.currentUniqueCode = e.target.dataset.id;
      // TEST
      // const data = [
      //   {
      //     'buildCode': 4900,
      //     'buildCostTotal': 0,
      //     'commissioningProjectPower': 4.6,
      //     'durationCommissioning': 0,
      //     'factExecutedBeginningPagesBeforeJanuary1ReportYear': 0,
      //     'factExecutedBeginningYearsReportingMonthInclusive': 0,
      //     'factFinancedBeginningYearFederalBudget': 0,
      //     'factFinancedBeginningYearsBudgetEntitiesRFBudget': 0,
      //     'factFinancedBeginningYearsOtherSources': 0,
      //     'factYearMonth': 0,
      //     'form_ownerCode': null,
      //     'introducedBeginningConstructionUntilJanuary1ReportYear': 0,
      //     'introducedBeginningYearReportingMonthInclusively': 0,
      //     'investmentLimitYearEntitiesRFBudget': 0,
      //     'investmentLimitYearOtherSources': 0,
      //     'investmentObjectType': null,
      //     'investment_limitYearFederalBudget': 0,
      //     'ministryEconomyDataLimit': 0,
      //     'ministryEconomyTerm': 2012,
      //     'ministryListCode': 13220,
      //     'ministryListName': 'Министерство здравоохранения и социального развития РФ',
      //     'name': 'ГОУ высшего профобразования Алтайский государственный медицинский университет, г.Барнаул, Алтайский край - 0049/*/Реконструкция морфологического корпуса - 004910',
      //     'normalizedID': 1,
      //     'percentageTechnicalReadiness': 0,
      //     'powerAccordingMinistryEconomy': 4.6,
      //     'powerData': 363,
      //     'processingSign': 0,
      //     'programLisName': 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
      //     'programListCode': '9900',
      //     'scheduledCommissioningYear': 0,
      //     'targetCostItems': 5,
      //     'taskCode': 4,
      //     'territoryListCode': '01000000000',
      //     'territoryListName': 'Алтайский край',
      //     'uniqueCode': '43.43.43.56.76',
      //     'yearData': 2011,
      //     'year_usageCode': 2,
      //   },
      //   {
      //     'buildCode': 4900,
      //     'buildCostTotal': 0,
      //     'commissioningProjectPower': 4.6,
      //     'durationCommissioning': 0,
      //     'factExecutedBeginningPagesBeforeJanuary1ReportYear': 0,
      //     'factExecutedBeginningYearsReportingMonthInclusive': 0,
      //     'factFinancedBeginningYearFederalBudget': 0,
      //     'factFinancedBeginningYearsBudgetEntitiesRFBudget': 0,
      //     'factFinancedBeginningYearsOtherSources': 0,
      //     'factYearMonth': 0,
      //     'form_ownerCode': null,
      //     'introducedBeginningConstructionUntilJanuary1ReportYear': 0,
      //     'introducedBeginningYearReportingMonthInclusively': 0,
      //     'investmentLimitYearEntitiesRFBudget': 0,
      //     'investmentLimitYearOtherSources': 0,
      //     'investmentObjectType': null,
      //     'investment_limitYearFederalBudget': 0,
      //     'ministryEconomyDataLimit': 0,
      //     'ministryEconomyTerm': 2012,
      //     'ministryListCode': 13220,
      //     'ministryListName': 'Министерство здравоохранения и социального развития РФ',
      //     'name': 'ГОУ высшего профобразования Алтайский государственный медицинский университет, г.Барнаул, Алтайский край - 0049/*/Реконструкция морфологического корпуса - 004910',
      //     'normalizedID': 1,
      //     'percentageTechnicalReadiness': 0,
      //     'powerAccordingMinistryEconomy': 4.6,
      //     'powerData': 363,
      //     'processingSign': 0,
      //     'programLisName': 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
      //     'programListCode': '9900',
      //     'scheduledCommissioningYear': 0,
      //     'targetCostItems': 5,
      //     'taskCode': 4,
      //     'territoryListCode': '01000000000',
      //     'territoryListName': 'Алтайский край',
      //     'uniqueCode': '43.43.43.56.76',
      //     'yearData': 2011,
      //     'year_usageCode': 2,
      //   },
      //   {
      //     'buildCode': 4900,
      //     'buildCostTotal': 0,
      //     'commissioningProjectPower': 4.6,
      //     'durationCommissioning': 0,
      //     'factExecutedBeginningPagesBeforeJanuary1ReportYear': 0,
      //     'factExecutedBeginningYearsReportingMonthInclusive': 0,
      //     'factFinancedBeginningYearFederalBudget': 0,
      //     'factFinancedBeginningYearsBudgetEntitiesRFBudget': 0,
      //     'factFinancedBeginningYearsOtherSources': 0,
      //     'factYearMonth': 0,
      //     'form_ownerCode': null,
      //     'introducedBeginningConstructionUntilJanuary1ReportYear': 0,
      //     'introducedBeginningYearReportingMonthInclusively': 0,
      //     'investmentLimitYearEntitiesRFBudget': 0,
      //     'investmentLimitYearOtherSources': 0,
      //     'investmentObjectType': null,
      //     'investment_limitYearFederalBudget': 0,
      //     'ministryEconomyDataLimit': 0,
      //     'ministryEconomyTerm': 2012,
      //     'ministryListCode': 13220,
      //     'ministryListName': 'Министерство здравоохранения и социального развития РФ',
      //     'name': 'ГОУ высшего профобразования Алтайский государственный медицинский университет, г.Барнаул, Алтайский край - 0049/*/Реконструкция морфологического корпуса - 004910',
      //     'normalizedID': 1,
      //     'percentageTechnicalReadiness': 0,
      //     'powerAccordingMinistryEconomy': 4.6,
      //     'powerData': 363,
      //     'processingSign': 0,
      //     'programLisName': 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
      //     'programListCode': '9900',
      //     'scheduledCommissioningYear': 0,
      //     'targetCostItems': 5,
      //     'taskCode': 4,
      //     'territoryListCode': '01000000000',
      //     'territoryListName': 'Алтайский край',
      //     'uniqueCode': '43.43.43.56.76',
      //     'yearData': 2011,
      //     'year_usageCode': 2,
      //   },
      // ];
      // TEST
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
      super.disableUI(false, this.MENU, this.SEARCH);
      super.enableOverlay(false);
      logger(`detailsShow(); ` + e, this, COMMENTS);
      this.errorMessage(e.target, 'Не удалось получить данные с сервера.', 3);
    }
  }

  detailClose() {
    super.addListener(this.hierarchyDetailCloseButton, 'click', () => {
      // this.body.removeChild(this.hierarchyDetailWindow);
      this.hierarchyDetailWindow.remove();
      super.disableUI(false, this.MENU, this.SEARCH);
      super.enableOverlay(false);
      logger(`detailClose();`, this, COMMENTS);
    }, true);
  }

  detailDownload() {
    super.addListener(this.hierarchyDetailExportButton, 'click', () => {
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
      super.disableUI(false, this.MENU, this.SEARCH);
      super.enableOverlay(false);
      logger(`detailDownload();`, this, COMMENTS);
    }, true);
  }

  objectEdit(e) {
    try {
      logger(`editObject(); index: ${e.target.dataset.index}`, this, COMMENTS);
    } catch (e) {
      this.errorMessage(e.target, 'Ошибка');
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
      logger(`removeListeners();`, this, COMMENTS);
    } catch (e) {
      logger(`removeListeners(); ` + e, this, COMMENTS);
    }
  }
}
