import {Query} from '@core/Query';
import {addressBarText, logger} from '@/core/utils';
import {
  baseMarkup, headerOverlayMarkup, hierarchyDetailMarkup,
  hierarchyViewMarkup, linkerMarkup,
  mainOverlayMarkup, uploadMarkup,
} from '@/components/markup/markup';
import {navButtonsInit} from '@core/initComponents';

const COMMENTS = true;

export class MainView extends Query {
  constructor() {
    super();
    // DOM Elements
    this.root = this.initialize('#app');
    this.body = this.initialize('body');
    this.filterBox = this.initialize('.filter');
    this.menuBox = this.initialize('.menu');
    this.filterYear = this.initialize('#select-year');
    this.filterMinistry = this.initialize('#select-ministry');
    this.filterTerritory = this.initialize('#select-territory');
    this.filterProgram = this.initialize('#select-program');
    this.filterReadyDisplay = this.initialize('.select-ready-display');
    this.filterReadySelect = this.initialize('#select-ready');
    this.filterReadyAll = this.initialize('#select-ready-all');
    this.filterApplyButton = this.initialize('.filter__button-search');
    this.filterResetButton = this.initialize('.filter__button-reset');
    this.headerSearchBox = this.initialize('.header__search-box');
    this.headerSearchUseFilters = this.initialize(
        '.header__search-use-filters');
    this.headerSearchInput = this.initialize('.header__search-line');
    this.headerSearchButton = this.initialize('.header__search-button');
    this.hierarchyButton = this.initialize('.navigation__button-main');
    this.linkerButton = this.initialize('.navigation__button-constructor');
    this.uploadButton = this.initialize('.navigation__button-upload');
    this.excelButton = this.initialize('.navigation__button-export');
    this.exitButton = this.initialize('.navigation__button-exit');
    this.dMinistryButton = this.initialize('.dictionaries__button-ministry');
    this.dTerritoryButton = this.initialize('.dictionaries__button-territory');
    this.dProgramButton = this.initialize('.dictionaries__button-program');
    this.display = this.initialize('.display');
    this.centerContainer = this.initialize('.center');
    // HTML templates
    this.mainOverlay = mainOverlayMarkup();
    this.headerSearchOverlay = headerOverlayMarkup();
    this.hHTML = hierarchyViewMarkup();
    this.hDetailHTML = hierarchyDetailMarkup;
    this.lHTML = linkerMarkup;
    this.uHTML = uploadMarkup;
    this.bHTML = baseMarkup;
  }

  disableUI(token, ...target) {
    logger(`disableUI(${token});`, this, COMMENTS);
    if (token) {
      target.forEach((entry) => {
        entry.style['pointer-events'] = 'none';
        entry.style.opacity = '.5';
      });
    } else {
      target.forEach((entry) => {
        entry.style['pointer-events'] = 'auto';
        entry.style.opacity = '1';
      });
    }
  }

  enableOverlay(token) {
    logger(`enableOverlay(${token});`, this, COMMENTS);
    if (token) {
      this.centerContainer.appendChild(this.mainOverlay);
      // this.headerSearchBox.appendChild(this.headerSearchOverlay);
    } else {
      this.centerContainer.removeChild(this.initialize('.overlay'));
      // this.headerSearchBox.removeChild(this.initialize('.header__overlay'));
    }
  }

  filterWatchReady() {
    logger(`filterWatchReady();`, this, COMMENTS);
    this.addListener(this.filterReadySelect, 'input', () => {
      this.filterReadyAll.checked = false;
      this.filterReadyDisplay.value = this.filterReadySelect.value;
    });
    this.addListener(this.filterReadyAll, 'click', () => {
      if (this.filterReadyAll.checked) {
        this.filterReadyDisplay.value = `Все`;
      } else {
        this.filterReadyDisplay.value = this.filterReadySelect.value;
      }
    });
  }

  filterFill(data) {
    try {
      data.year.forEach((el) => {
        const option = document.createElement('option');
        option.value = el;
        option.textContent = el;
        this.filterYear.appendChild(option);
      });
      data.ministry.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.code;
        option.textContent = el.name.replace('Министерство', 'Мин.').
            replace('Федеральная служба', 'ФС').
            replace('Федеральное агенство', 'ФА');
        this.filterMinistry.appendChild(option);
      });
      data.territory.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.code;
        option.textContent = el.name.replace('область', 'обл.').
            replace('Республика', 'Р.').
            replace('Город', 'г.');
        this.filterTerritory.appendChild(option);
      });
      data.program.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.code;
        option.textContent = el.name.replace('Федеральная целевая программа',
            '');
        this.filterProgram.appendChild(option);
      });
      logger(`filterFill();`, this, COMMENTS);
    } catch (e) {
      logger(`filterFill(); ${e}`, this, COMMENTS);
    }
  }

  filterReset() {
    this.addListener(this.filterResetButton, 'click', () => {
      this.filterYear.selectedIndex = '0';
      this.filterMinistry.selectedIndex = '0';
      this.filterTerritory.selectedIndex = '0';
      this.filterProgram.selectedIndex = '0';
      this.filterReadyDisplay.value = 'Все';
      this.filterReadySelect.value = 50;
      this.filterReadyAll.checked = true;
      addressBarText();
      logger(`filterReset();`, this, COMMENTS);
    });
  }

  filterApply() {
    this.addListener(this.filterApplyButton, 'click', () => {
      logger(`filterApply();`, this, COMMENTS);
      this.getFilterValue();
    });
  }

  filterSearch() {
    this.addListener(this.headerSearchButton, 'click', () => {
      logger(`filterSearch();`, this, COMMENTS);
      // should return data to fill hierarchy or linker
    });
  }

  async mainInit(m, h, l) {
    logger(`mainInit();`, this, COMMENTS);
    this.enableOverlay(true);
    this.disableUI(true, this.menuBox, this.headerSearchBox);
    this.filterWatchReady();
    this.filterReset();
    this.filterApply();
    this.filterSearch();
    this.filterFill(await this.sendQuery(this.filterURL));
    await navButtonsInit(m, h, l);
    this.enableOverlay(false);
    this.disableUI(false, this.menuBox, this.headerSearchBox);
    logger('', false, COMMENTS);
  }

  getFilterValue() {
    let options =
        this.filterReadyAll.checked
            ? '?technical_readiness=-1'
            : `?technical_readiness=${this.filterReadyDisplay.value}`;
    options +=
        this.filterYear.options[this.filterYear.selectedIndex].value !== '0'
            ? `&year=${this.filterYear.options[this.filterYear.selectedIndex].value}`
            : '';
    options +=
        this.filterMinistry.options[this.filterMinistry.selectedIndex].value !==
        '0'
            ? `&ministryID=${this.filterMinistry.options[this.filterMinistry.selectedIndex].value}`
            : '';
    options +=
        this.filterTerritory.options[this.filterTerritory.selectedIndex].value !==
        '0'
            ? `&territoryID=${this.filterTerritory.options[this.filterTerritory.selectedIndex].value}`
            : '';
    options +=
        this.filterProgram.options[this.filterProgram.selectedIndex].value !==
        '0'
            ? `&programID=${this.filterProgram.options[this.filterProgram.selectedIndex].value}`
            : '';
    logger(`getFilterValue(); ` + options, this, COMMENTS);
    return options;
  }

  errorMessage(element, text, delay = .75) {
    const box = document.createElement('div');
    box.classList.add('error-message-box');
    box.textContent = text;
    element.appendChild(box);
    this.disableUI(true, element);
    element.style.opacity = '1';
    this.addListener(box, 'click', () => {
      element.removeChild(box);
      this.disableUI(false, element);
    }, true);
    setTimeout(() => {
      try {
        box.dispatchEvent(new Event('click'));
      } catch (e) {
        logger(`Error message already removed. ` + e, this, COMMENTS);
      }
    }, delay * 1000);
  }
}
