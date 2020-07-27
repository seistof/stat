import {MainView} from '@core/MainView';
import {
  logger,
} from '@core/utils';
import {
  testHierarchyData,
} from '@/components/markup/markup';

const COMMENTS = true;

export class Hierarchy extends MainView {
  constructor(
      buttons, data, goToButton, goToInput, prevButton,
      nextButton, pageDisplay, totalPages, totalObjects, detailWindow,
      detailCloseButton, objectContainer, paginationBox, filterValue,
      paginationNavBox,
      paginationGoToBox) {
    super();
    this.hButtons = buttons;
    this.hFuncs = [
      this.hToggle.bind(this),
      this.hDetail.bind(this),
      this.hEdit.bind(this)];
    this.hData = data;
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
    this.hObjectContainer = objectContainer;
    this.hFilterValue = filterValue;
    this.hPaginationNavBox = paginationNavBox;
    this.hPaginationGoToBox = paginationGoToBox;
    this.hNextFn = this.hNext.bind(this);
    this.hPrevFn = this.hPrev.bind(this);
    this.hGoToFn = this.hGoTo.bind(this);
  }

  async hInit(queryOptions = '') {
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
    // this.hFill(await this.sendQuery(this.hURL));
    this.hFill(testHierarchyData());
    this.hInitButtons();
    this.hRemoveButtonListeners();
    this.hAddButtonListeners();
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
    try {
      this.enableOverlay(true);
      this.disableUI(true, this.filterBox, this.headerSearchBox);
      let html = ``;
      source.data.forEach((entry) => {
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
                       >${el.name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>')}
                       <div class="tooltip">${el.name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>')}</div></div>
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
                    <button class="hierarchy-view__object-edit button" data-id="${el.uniqueCode}">Изменить</button>
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
                       ${el.name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>')}
                       <div class="tooltip">${el.name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>')}</div>
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
                    <button class="hierarchy-view__object-edit button" data-id="${el.uniqueCode}">Изменить</button>
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
                  ${el.name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>')}
                   <div class="tooltip">${el.name.replace('***', '<br>').replace('***', '<br>').replace('***', '<br>')}</div>
                  </div>
                </div>
          `;
          }
        });
        html += `</div></div>`;
      });
      this.hObjectContainer.innerHTML = html;
      // this.hTotalPages.textContent = Math.ceil(source.totalLen / 20) || 1;
      this.hTotalPages.textContent = 1;
      this.hTotalObjects.textContent = source.totalLen || '';
      this.hWatchPagination();
      this.enableOverlay(true);
      this.disableUI(true, this.filterBox, this.headerSearchBox);
      logger(`hFill();`, this, COMMENTS);
    } catch (e) {
      this.enableOverlay(false);
      this.disableUI(false, this.filterBox, this.headerSearchBox);
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
      let html = ``;
      data.forEach((entry) => {
        html += `
      <div class="detail-window__block">
       <div>${entry.buildCode}</div>
       <div>${entry.buildCostTotal}</div>
       <div>${entry.commissioningProjectPower}</div>
       <div>${entry.durationCommissioning}</div>
       <div>${entry.factExecutedBeginningPagesBeforeJanuary1ReportYear}</div>
       <div>${entry.factExecutedBeginningYearsReportingMonthInclusive}</div>
       <div>${entry.factFinancedBeginningYearFederalBudget}</div>
       <div>${entry.factFinancedBeginningYearsBudgetEntitiesRFBudget}</div>
       <div>${entry.factFinancedBeginningYearsOtherSources}</div>
       <div>${entry.factYearMonth}</div>
       <div>${entry.form_ownerCode}</div>
       <div>${entry.introducedBeginningConstructionUntilJanuary1ReportYear}</div>
       <div>${entry.introducedBeginningYearReportingMonthInclusively}</div>
       <div>${entry.investmentLimitYearEntitiesRFBudget}</div>
       <div>${entry.investmentLimitYearOtherSources}</div>
       <div>${entry.investmentObjectType}</div>
       <div>${entry.investment_limitYearFederalBudget}</div>
       <div>${entry.ministryEconomyDataLimit}</div>
       <div>${entry.ministryEconomyTerm}</div>
       <div>${entry.ministryListCode}</div>
       <div>${entry.ministryListName}</div>
       <div>${entry.name}</div>
       <div>${entry.normalizedID}</div>
       <div>${entry.percentageTechnicalReadiness}</div>
       <div>${entry.powerAccordingMinistryEconomy}</div>
       <div>${entry.powerData}</div>
       <div>${entry.processingSign}</div>
       <div>${entry.programLisName}</div>
       <div>${entry.programListCode}</div>
       <div>${entry.scheduledCommissioningYear}</div>
       <div>${entry.targetCostItems}</div>
       <div>${entry.taskCode}</div>
       <div>${entry.territoryListCode}</div>
       <div>${entry.territoryListName}</div>
       <div>${entry.uniqueCode}</div>
       <div>${entry.yearData}</div>
       <div>${entry.year_usageCode}</div>
      </div>
       `;
      });
      this.body.insertAdjacentHTML('beforeend', this.hDetailHTML);
      this.hDetailWindow = this.initialize('.detail-window');
      this.hDetailCloseButton = this.initialize(
          '.details-window__close-button');
      const container = this.initialize('.detail-view__rows');
      container.innerHTML = html;
      this.hDetailClose();
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
    logger(`hEdit(); id = ${e.target.dataset.id}`, this, COMMENTS);
  }

  hDetailClose() {
    this.hDetailCloseButton.addEventListener('click', () => {
      logger(`hEdit();`, this, COMMENTS);
      this.body.removeChild(this.detailWindow);
      super.disableUI(false, this.menuBox, this.headerSearchBox);
      super.enableOverlay(false);
    }, {once: true});
  }

  async hNext() {
    logger(`hNext();`, this, COMMENTS);
    const options = this.getFilterValue() +
        `&page=${parseInt(this.hPageDisplay.textContent) + 1}`;
    this.hPageDisplay.textContent = parseInt(this.hPageDisplay.textContent) + 1;
    await this.hFill(this.sendQuery(this.filterURL, options));
    this.hWatchPagination();
    logger(options);
  }

  async hPrev() {
    logger(`hPrev();`, this, COMMENTS);
    const options = this.getFilterValue() +
        `&page=${parseInt(this.hPageDisplay.textContent) - 1}`;
    this.hPageDisplay.textContent = parseInt(this.hPageDisplay.textContent) - 1;
    await this.hFill(this.sendQuery(this.filterURL, options));
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
      this.errorMessage(this.hPaginationGoToBox, 'Такой страницы нет.');
    } else {
      this.hPageDisplay.textContent = this.hGoToInput.value;
      const options = this.getFilterValue() +
          `&page=${this.hGoToInput.value}`;
      await this.hFill(this.sendQuery(this.filterURL, options));
      this.hWatchPagination();
      this.hGoToInput.value = '';
      logger(options);
      logger(`hGoTo();`, this, COMMENTS);
    }
  }
}
