import {MainView} from '@core/MainView';
import {
  logger,
} from '@core/utils';

const COMMENTS = true;

export class Hierarchy extends MainView {
  constructor(objectContainer, buttons, data, mainMenuBox,
      menuFilterBox,
      mainHeaderSearchBox,
      mainOverlay,
      mainHeaderSearchOverlay) {
    super(mainMenuBox,
        menuFilterBox,
        mainHeaderSearchBox,
        mainOverlay,
        mainHeaderSearchOverlay);
    this.objectContainer = objectContainer;
    this.buttons = buttons;
    this.funcs = [
      this.hierarchyToggle.bind(this),
      this.hierarchyDetail.bind(this),
      this.hierarchyEdit.bind(this)];
    this.data = data;
  }

  initButtons() {
    logger(`initHierarchyButtons();`, this, COMMENTS);
    const toggleButtons = this.initialize('.hierarchy-view__object-dropdown',
        false);
    const detailButtons = this.initialize('.hierarchy-view__object-details',
        false);
    const editButtons = this.initialize('.hierarchy-view__object-edit', false);
    this.buttons = [toggleButtons, detailButtons, editButtons];
  }

  addButtonListeners() {
    logger(`addButtonListeners();`, this, COMMENTS);
    let index = 0;
    this.buttons.forEach((entry) => {
      entry.forEach((button) => {
        this.addListener(button, 'click', this.funcs[index]);
      });
      index++;
    });
  }

  removeButtonListeners() {
    logger(`removeButtonListeners();`, this, COMMENTS);
    let index = 0;
    this.buttons.forEach((entry) => {
      entry.forEach((button) => {
        this.removeListener(button, 'click', this.funcs[index]);
      });
      index++;
    });
  }

  fill(data) {
    logger(`fill();`, this, COMMENTS);
    try {
      let html = ``;
      data.forEach((entry) => {
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
                       <div class="tooltip">${el.name}</div></div>
                </div>
                <div class="hierarchy-view__object-control">
                  <div class="hierarchy-view__object-counter">
                    <span>Записей:</span>
                    <span>${entry.length}</span>
                  </div>
                  <span class="hierarchy-view__object-dropdown button material-icons" style="display: none">
                  expand_more
<!--                    <span class="material-icons">expand_more</span>-->
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
                       ${el.name}
                       <div class="tooltip">${el.name}</div>
                       </div>
                </div>
                <div class="hierarchy-view__object-control">
                  <div class="hierarchy-view__object-counter">
                    <span>Записей:</span>
                    <span>${entry.length}</span>
                  </div>
                  <span class="hierarchy-view__object-dropdown button material-icons">expand_more
<!--                    <span class="material-icons">expand_more</span>-->
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
                  ${el.name}
                   <div class="tooltip">${el.name}</div>
                  </div>
                </div>
          `;
          }
        });
        html += `</div></div>`;
      });
      this.objectContainer.innerHTML = html;
    } catch (e) {
      logger(`fill();` + e, this, COMMENTS);
    }
  }

  hierarchyToggle(e) {
    logger(`hierarchyToggle();`, this, COMMENTS);
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

  async hierarchyDetail(e) {
    logger(`hierarchyDetail(); id = ${e.target.dataset.id}`, this, COMMENTS);
    super.disableUI(true, this.mainMenuBox, this.mainHeaderSearchBox);
    super.enableOverlay(true, this.mainOverlay, this.mainHeaderSearchOverlay);
    const data = await super.sendQuery(this.hierarchyDetailURL,
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
    this.mainDetailContainer.innerHTML = html;
    this.mainDetailWindow.style.display = 'block';
  }

  hierarchyEdit(e) {
    logger(`

  hierarchyEdit();

  id = ${e.target.dataset.id}`, this, COMMENTS);
  }

  mainDetailCloseButton() {
    this.addListener(this.mainDetailClose, 'click', () => {
      this.mainDetailWindow.style.display = 'none';
      this.mainDetailContainer.innerHTML = '';
      super.disableUI(false, this.mainMenuBox, this.mainHeaderSearchBox);
      super.enableOverlay(false, this.mainOverlay,
          this.mainHeaderSearchOverlay);
    });
  }
}
