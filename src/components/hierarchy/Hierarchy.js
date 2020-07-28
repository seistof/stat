import {MainView} from '@core/MainView';
import {
  logger,
} from '@core/utils';

const COMMENTS = true;

export class Hierarchy extends MainView {
  constructor(
      buttons, goToButton, goToInput, prevButton,
      nextButton, pageDisplay, totalPages, totalObjects, detailWindow,
      detailCloseButton, detailExportButton, objectContainer, paginationBox, filterValue,
      paginationNavBox,
      paginationGoToBox,
      currentObjectUniqueCode) {
    super();
    this.hButtons = buttons;
    this.hFuncs = [
      this.hToggle.bind(this),
      this.hDetail.bind(this),
      this.hEdit.bind(this)];
    this.hData = [];
    this.hGoToInput = goToInput;
    this.hGoToButton = goToButton;
    this.hPrevButton = prevButton;
    this.hNextButton = nextButton;
    this.hPaginationBox = paginationBox;
    this.hPageDisplay = pageDisplay;
    this.hTotalPages = totalPages;
    this.hTotalObjects = totalObjects;
    this.hDetailWindow = detailWindow;
    this.hDetailCloseButton = detailCloseButton;
    this.hDetailExportButton = detailExportButton;
    this.hObjectContainer = objectContainer;
    this.hFilterValue = filterValue;
    this.hPaginationNavBox = paginationNavBox;
    this.hPaginationGoToBox = paginationGoToBox;
    this.hNextFn = this.hNext.bind(this);
    this.hPrevFn = this.hPrev.bind(this);
    this.hGoToFn = this.hGoTo.bind(this);
    this.hFilterApplyFn = this.hFilterApply.bind(this);
    this.hFilterSearchFn = this.hFilterSearch.bind(this);
    this.hCurrentObjectUniqueCode = currentObjectUniqueCode;
  }

  async hInit(queryOptions = '', m, h) {
    this.display.innerHTML = '';
    this.enableOverlay(true);
    this.disableUI(true, this.filterBox, this.headerSearchBox);
    this.renderHTML(this.display, this.hHTML);
    this.hObjectContainer = this.initialize(
        '.hierarchy-view__object-container');
    this.hPaginationBox = this.initialize('.pagination');
    this.hGoToInput = this.initialize('.pagination__moveto-input');
    this.hGoToButton = this.initialize('.pagination__moveto-button');
    this.hPrevButton = this.initialize('.pagination__nav-prev');
    this.hNextButton = this.initialize('.pagination__nav-next');
    this.hPageDisplay = this.initialize('.pagination__nav-display');
    this.hTotalPages = this.initialize('.pagination__info-pages-value');
    this.hTotalObjects = this.initialize('.pagination__info-objects-value');
    this.hPaginationNavBox = this.initialize('.pagination__nav');
    this.hPaginationGoToBox = this.initialize('.pagination__moveto');
    this.hPageDisplay.textContent = '1';
    this.hFill(await this.sendQuery(this.hURL));
    // this.hFill(testHierarchyData());
    this.enableOverlay(false);
    this.disableUI(false, this.filterBox, this.headerSearchBox);
    logger(`hInit(); `, this, COMMENTS);
    logger('', false, COMMENTS);
  }

  hInitButtons() {
    logger(`hInitButtons();`, this, COMMENTS);
    const toggleButtons = this.initialize('.hierarchy-view__object-dropdown',
        false);
    const detailButtons = this.initialize('.hierarchy-view__object-details',
        false);
    const editButtons = this.initialize('.hierarchy-view__object-edit', false);
    this.hButtons = [toggleButtons, detailButtons, editButtons];
  }

  hAddButtonListeners() {
    logger(`hAddButtonListeners();`, this, COMMENTS);
    let index = 0;
    this.hButtons.forEach((entry) => {
      entry.forEach((button) => {
        this.addListener(button, 'click', this.hFuncs[index]);
      });
      index++;
    });
    this.addListener(this.hNextButton, 'click', this.hNextFn);
    this.addListener(this.hPrevButton, 'click', this.hPrevFn);
    this.addListener(this.hGoToButton, 'click', this.hGoToFn);
  }

  hRemoveButtonListeners() {
    logger(`hRemoveButtonListeners();`, this, COMMENTS);
    let index = 0;
    this.hButtons.forEach((entry) => {
      entry.forEach((button) => {
        this.removeListener(button, 'click', this.hFuncs[index]);
      });
      index++;
    });
    this.removeListener(this.hNextButton, 'click', this.hNextFn);
    this.removeListener(this.hPrevButton, 'click', this.hPrevFn);
    this.removeListener(this.hGoToButton, 'click', this.hGoToFn);
  }

  hFill(source) {
    this.hData = [];
    this.hObjectContainer.innerHTML = '';
    try {
      let html = ``;
      let index = 0;
      source.data.forEach((entry) => {
        this.hData.push(entry);
        html += ` <div class="hierarchy-view__object">`;
        entry.forEach((el) => {
          if (el === entry[0]) {
            if (entry.length === 1) {
              html += `
             <div class="hierarchy-view__object-title">
                <div class="hierarchy-view__object-data">
                  <div class="hierarchy-view__object-item hierarchy-view__object-year hierarchy-view-size-year">${el.yearData}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-read hierarchy-view-size-ready">${el.maxReadiness}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-code hierarchy-view-size-code">${el.buildCode}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-info hierarchy-view-size-info">
                       ${el.territoryName} - ${el.ministryName} - ${el.programName}
                       <div class="tooltip">${el.territoryName} <br> ${el.ministryName} <br> ${el.programName}</div>
                       </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-name hierarchy-view-size-name"
                       >${el.name}
                       <div class="tooltip">${el.name.replace('***', '<br>').
      replace('***', '<br>').
      replace('***', '<br>')}</div></div>
                </div>
                <div class="hierarchy-view__object-control">
                  <div class="hierarchy-view__object-counter">
                    <span>Записей:</span>
                    <span>${entry.length}</span>
                  </div>
                  <span class="hierarchy-view__object-dropdown button material-icons" style="display: none">
                  expand_more
                  </span>
                  <div class="hierarchy-view__object-buttons">
                    <button class="hierarchy-view__object-details button" data-id="${el.uniqueCode}">Подробнее</button>
                    <button class="hierarchy-view__object-edit button" data-index="${index}">Изменить</button>
                  </div>
                </div>
              </div>
             <div style="display: none" class="hierarchy-view__object-body">
            `;
            } else {
              html += `
             <div class="hierarchy-view__object-title">
                <div class="hierarchy-view__object-data">
                  <div class="hierarchy-view__object-item hierarchy-view__object-year hierarchy-view-size-year">${el.yearData}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-read hierarchy-view-size-ready">${el.maxReadiness}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-code hierarchy-view-size-code">${el.buildCode}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-info hierarchy-view-size-info">
                  ${el.territoryName} - ${el.ministryName} - ${el.programName}
                  <div class="tooltip">${el.territoryName} <br> ${el.ministryName} <br> ${el.programName}</div>
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-name hierarchy-view-size-name">
                       ${el.name}
                       <div class="tooltip">${el.name.replace('***', '<br>').
      replace('***', '<br>').
      replace('***', '<br>')}</div>
                       </div>
                </div>
                <div class="hierarchy-view__object-control">
                  <div class="hierarchy-view__object-counter">
                    <span>Записей:</span>
                    <span>${entry.length}</span>
                  </div>
                  <span class="hierarchy-view__object-dropdown button material-icons">expand_more
                  </span>
                  <div class="hierarchy-view__object-buttons">
                    <button class="hierarchy-view__object-details button" data-id="${el.uniqueCode}">Подробнее</button>
                    <button class="hierarchy-view__object-edit button" data-index="${index}">Изменить</button>
                  </div>
                </div>
              </div>
             <div style="display: none" class="hierarchy-view__object-body">
            `;
            }
          } else {
            html += `
          <div class="hierarchy-view__object-body-item">
                  <div class="hierarchy-view__object-item hierarchy-view__object-year hierarchy-view-size-year">${el.yearData}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-read hierarchy-view-size-ready">${el.maxReadiness}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-code hierarchy-view-size-code">${el.buildCode}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-info hierarchy-view-size-info">
                       ${el.territoryName} - ${el.ministryName} - ${el.programName}
                       <div class="tooltip">${el.territoryName} <br> ${el.ministryName} <br> ${el.programName}</div></div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-name hierarchy-view-size-name">
                  ${el.name}
                   <div class="tooltip">${el.name.replace('***', '<br>').
      replace('***', '<br>').
      replace('***', '<br>')}</div>
                  </div>
                </div>
          `;
          }
        });
        html += `</div></div>`;
        index++;
      });
      this.hObjectContainer.innerHTML = html;
      this.hTotalPages.textContent = Math.ceil(source.totalLen / 12) || 1;
      this.hTotalObjects.textContent = source.totalLen || '';
      this.hWatchPagination();
      this.hInitButtons();
      this.hRemoveButtonListeners();
      this.hAddButtonListeners();
      logger(`hFill();`, this, COMMENTS);
    } catch (e) {
      this.errorMessage(this.display, 'Нет соединения с сервером.');
      this.hPageDisplay.textContent = '1';
      logger(`hFill(); ` + e, this, COMMENTS);
    }
  }

  hWatchPagination() {
    this.disableUI(false, this.hPrevButton, this.hNextButton);
    logger(`pagination enabled`, this, COMMENTS);
    if (parseInt(this.hTotalPages.textContent) === 1) {
      this.disableUI(true, this.hPrevButton, this.hNextButton);
      logger(`pagination disabled`, this, COMMENTS);
    } else {
      if (parseInt(this.hPageDisplay.textContent) === 1 &&
          parseInt(this.hTotalPages.textContent) > 1) {
        this.disableUI(true, this.hPrevButton);
        logger(`pagination prev disabled`, this, COMMENTS);
      }
      if (parseInt(this.hPageDisplay.textContent) ===
          parseInt(this.hTotalPages.textContent)) {
        this.disableUI(true, this.hNextButton);
        logger(`pagination next disabled`, this, COMMENTS);
      }
    }
  }

  hToggle(e) {
    logger(`hToggle();`, this, COMMENTS);
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
  }

  async hDetail(e) {
    try {
      super.disableUI(true, this.menuBox, this.headerSearchBox);
      super.enableOverlay(true);
      const data = await super.sendQuery(this.hDetailURL,
          `?unique_code=${e.target.dataset.id}`);
      this.hCurrentObjectUniqueCode = e.target.dataset.id;
      // const data = testDetailData;
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
      detailWindow.appendChild(innerContainer);
      detailWindow.appendChild(closeButton);
      detailWindow.appendChild(exportButton);
      innerContainer.appendChild(header);
      innerContainer.appendChild(rows);
      data.forEach((entry) => {
        const row = document.createElement('div');
        row.classList.add('detail-window__block');
        Object.keys(entry).forEach((k) => {
          const outer = document.createElement('div');
          outer.classList.add('detail-window__outer-row');
          const el = document.createElement('div');
          el.textContent = entry[k];
          outer.appendChild(el);
          // if (entry[k].length > 20) {
          //   const tooltip = document.createElement('div');
          //   tooltip.classList.add('tooltip');
          //   tooltip.textContent = entry[k];
          //   outer.appendChild(tooltip);
          // }
          row.appendChild(outer);
        });
        rows.appendChild(row);
      });
      this.renderHTML(this.body, detailWindow);
      this.hDetailWindow = this.initialize('.detail-window');
      this.hDetailCloseButton = this.initialize(
          '.detail-window__close-button');
      this.hDetailExportButton = this.initialize(
          '.detail-window__export-button');
      this.hDetailClose();
      await this.hDetailDownload();
      logger(`hDetail(); id = ${e.target.dataset.id}`, this, COMMENTS);
    } catch (error) {
      logger(`hDetail(); id = ${e.target.dataset.id} ` + error, this,
          COMMENTS);
      super.disableUI(false, this.menuBox, this.headerSearchBox);
      super.enableOverlay(false);
      this.errorMessage(e.target, 'Нет соединения с сервером.');
    }
  }

  async hEdit(e) {
    logger(`hEdit(); id = ${e.target.dataset.index}`, this, COMMENTS);
    logger(this.hData[e.target.dataset.index]);
  }

  hDetailClose() {
    this.hDetailCloseButton.addEventListener('click', () => {
      logger(`hDetailClose();`, this, COMMENTS);
      this.body.removeChild(this.hDetailWindow);
      super.disableUI(false, this.menuBox, this.headerSearchBox);
      super.enableOverlay(false);
    }, {once: true});
  }

  async hDetailDownload() {
    this.hDetailExportButton.addEventListener('click', async () => {
      const options = `?unique_code=${this.hCurrentObjectUniqueCode}`;
      this.hCurrentObjectUniqueCode = '';
      const a = document.createElement('a');
      a.href = this.serverURL + this.hDetailExportURL + options;
      document.body.appendChild(a);
      a.click();
      a.remove();
      logger(`hDetailExportButton();`, this, COMMENTS);
      this.body.removeChild(this.hDetailWindow);
      super.disableUI(false, this.menuBox, this.headerSearchBox);
      super.enableOverlay(false);
    }, {once: true});
  }

  async hNext() {
    logger(`hNext();`, this, COMMENTS);
    const options = this.getFilterValue() +
        `&page=${parseInt(this.hPageDisplay.textContent) + 1}`;
    this.hPageDisplay.textContent = parseInt(this.hPageDisplay.textContent) + 1;
    this.enableOverlay(true);
    this.disableUI(true, this.filterBox, this.headerSearchBox);
    this.hFill(await this.sendQuery(this.hURL, options));
    this.enableOverlay(false);
    this.disableUI(false, this.filterBox, this.headerSearchBox);
    this.hWatchPagination();
    logger(options);
  }

  async hPrev() {
    logger(`hPrev();`, this, COMMENTS);
    const options = this.getFilterValue() +
        `&page=${parseInt(this.hPageDisplay.textContent) - 1}`;
    this.hPageDisplay.textContent = parseInt(this.hPageDisplay.textContent) - 1;
    this.enableOverlay(true);
    this.disableUI(true, this.filterBox, this.headerSearchBox);
    this.hFill(await this.sendQuery(this.hURL, options));
    this.enableOverlay(false);
    this.disableUI(false, this.filterBox, this.headerSearchBox);
    this.hWatchPagination();
    logger(options);
  }

  async hGoTo() {
    if (parseInt(this.hGoToInput.value) > parseInt(this.hTotalPages.textContent)
        || parseInt(this.hGoToInput.value) < 0
        || this.hGoToInput.value === ''
        || parseInt(this.hGoToInput.value) ===
        parseInt(this.hPageDisplay.textContent)
    ) {
      logger(`hGoTo(); ERROR: Out of range.`, this, COMMENTS);
      this.hGoToInput.value = '';
      this.errorMessage(this.hPaginationGoToBox, 'Такой страницы нет.');
    } else {
      this.hPageDisplay.textContent = this.hGoToInput.value;
      const options = this.getFilterValue() +
          `&page=${this.hGoToInput.value}`;
      this.enableOverlay(true);
      this.disableUI(true, this.filterBox, this.headerSearchBox);
      this.hFill(await this.sendQuery(this.hURL, options));
      this.enableOverlay(false);
      this.disableUI(false, this.filterBox, this.headerSearchBox);
      this.hWatchPagination();
      this.hGoToInput.value = '';
      logger(options);
      logger(`hGoTo();`, this, COMMENTS);
    }
  }

  async hFilterApply() {
    logger(`filterApply();`, this, COMMENTS);
    const options = this.getFilterValue();
    this.enableOverlay(true);
    this.disableUI(true, this.filterBox, this.headerSearchBox);
    this.hFill(await this.sendQuery(this.hURL, options));
    this.hPageDisplay.textContent = '1';
    this.hWatchPagination();
    this.enableOverlay(false);
    this.disableUI(false, this.filterBox, this.headerSearchBox);
  }

  async hFilterSearch() {
    logger(`filterSearch();`, this, COMMENTS);
    // should return data to fill hierarchy or linker
  }
}
