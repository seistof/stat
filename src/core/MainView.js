import {Query} from '@core/Query';
import {logger} from '@core/utils';
import {COMMENTS} from '@/index';
import filtersTEST from '../../filters.json';

export class MainView extends Query {
  constructor(overlay) {
    super();
    // Filter
    this.filterYear = super.initialize('#select-year');
    this.filterMinistry = super.initialize('#select-ministry');
    this.filterTerritory = super.initialize('#select-territory');
    this.filterProgram = super.initialize('#select-program');
    this.filterReadyDisplay = super.initialize('.select-ready-display');
    this.filterReadyInput = super.initialize('#select-ready');
    this.filterReadyAll = super.initialize('#select-ready-all');
    this.filterApply = super.initialize('.filter__button-search');
    this.filterReset = super.initialize('.filter__button-reset');
    this.filterSearch = super.initialize('.header__search-button');
    this.filterUseFiltersSearch = super.initialize(
        '.header__search__use-filters');
    // Navigation
    this.navMain = super.initialize('.navigation__button-main');
    this.navLinker = super.initialize('.navigation__button-constructor');
    this.navUpload = super.initialize('.navigation__button-upload');
    this.navExport = super.initialize('.navigation__button-export');
    this.navExit = super.initialize('.navigation__button-exit');
    // Dictionaries
    this.dicMinistry = super.initialize('.dictionaries__button-ministry');
    this.dicTerritory = super.initialize('.dictionaries__button-territory');
    this.dicProgram = super.initialize('.dictionaries__button-program');
    // Utils
    this.OVERLAY = overlay;
  }

  async mainInit(main, hierarchy, linker, upload, dictionary) {
    logger(``, this, COMMENTS);
    logger(`mainInit();`, this, COMMENTS);
    this.enableOverlay(true);
    this.disableUI(true, this.MENU, this.SEARCH);
    this.mainListenersInit(main, hierarchy, linker, upload, dictionary);
    // TEST
    this.fillFilters(filtersTEST);
    // console.log(filtersTEST);
    // console.log(localStorage.getItem('auth'));
    // TEST
    // this.fillFilters(await super.sendQuery(this.filterURL));
    this.enableOverlay(false);
    this.disableUI(false, this.MENU, this.SEARCH);
    // Hierarchy init
    hierarchy.init();
    // Hierarchy init
    // Pagination(Hierarchy) init
    // Pagination(Hierarchy) init
  }

  disableUI(token, ...target) {
    if (token) {
      target.forEach((el) => {
        el.style['pointer-events'] = 'none';
        el.style.opacity = '.33';
      });
    } else {
      target.forEach((el) => {
        el.style['pointer-events'] = 'auto';
        el.style.opacity = '1';
      });
    }
  }

  enableOverlay(token) {
    try {
      logger(`#Check overlay`, this, COMMENTS);
      this.OVERLAY.remove();
      logger(`#Overlay disabled`, this, COMMENTS);
    } catch (e) {
      logger(`#No overlay detected`, this, COMMENTS);
    }
    if (token) {
      const overlay = document.createElement('div');
      const overlayIndicator = document.createElement('div');
      const span = document.createElement('span');
      overlay.classList.add('overlay');
      overlayIndicator.classList.add('overlay__indicator');
      span.classList.add('material-icons');
      span.textContent = 'autorenew';
      overlay.appendChild(overlayIndicator);
      overlayIndicator.appendChild(span);
      this.OVERLAY = overlay;
      super.insertElement(this.CENTER, this.OVERLAY);
      logger(`enableOverlay(${token});`, this, COMMENTS);
    }
  }

  getFilterValue() {
    let options = '';
    options += parseInt(this.filterYear.options[this.filterYear.selectedIndex].value) === 0
      ? ''
      : `&year=${this.filterYear.options[this.filterYear.selectedIndex].value}`;
    options += parseInt(this.filterMinistry.options[this.filterMinistry.selectedIndex].value) === 0
      ? ''
      : `&ministryID=${this.filterMinistry.options[this.filterMinistry.selectedIndex].value}`;
    options += parseInt(this.filterTerritory.options[this.filterTerritory.selectedIndex].value) === 0
      ? ''
      : `&territoryID=${this.filterTerritory.options[this.filterTerritory.selectedIndex].value}`;
    options += parseInt(this.filterProgram.options[this.filterProgram.selectedIndex].value) === 0
      ? ''
      : `&programID=${this.filterProgram.options[this.filterProgram.selectedIndex].value}`;
    options += this.filterReadyAll.checked
      ? ''
      : `&technical_readiness=${this.filterReadyInput.value}`;
    if (options.length > 0) {
      return options.replace('&', '?');
    } else {
      return 'ok';
    }
  }

  mainListenersInit(main, hierarchy, linker, upload, dictionary) {
    super.addListener(this.filterReadyInput, 'input', () => {
      this.filterReadyAll.checked = false;
      this.filterReadyDisplay.value = this.filterReadyInput.value;
    });
    super.addListener(this.filterReadyAll, 'click', () => {
      if (this.filterReadyAll.checked) {
        this.filterReadyDisplay.value = `Все`;
      } else {
        this.filterReadyDisplay.value = this.filterReadyInput.value;
      }
    });
    super.addListener(this.filterReset, 'click', () => {
      this.filterYear.selectedIndex = 0;
      this.filterMinistry.selectedIndex = 0;
      this.filterTerritory.selectedIndex = 0;
      this.filterProgram.selectedIndex = 0;
      this.filterReadyInput.value = 50;
      this.filterReadyDisplay.value = 'Все';
      this.filterReadyAll.checked = true;
      logger(`Reset filters.`, this, COMMENTS);
    });
    super.addListener(this.navMain, 'click', () => {
      hierarchy.init();
      logger(`Hierarchy`, this, COMMENTS);
    });
    super.addListener(this.navLinker, 'click', () => {
      linker.init();
      logger(`Linker`, this, COMMENTS);
    });
    super.addListener(this.navUpload, 'click', () => {
      upload.init();
      logger(`Upload`, this, COMMENTS);
    });
    super.addListener(this.navExport, 'click', () => {
      logger(`Export`, this, COMMENTS);
    });
    super.addListener(this.navExit, 'click', () => {
      logger(`Exit`, this, COMMENTS);
    });
    super.addListener(this.dicMinistry, 'click', () => {
      dictionary.init('ministry');
      logger(`Ministry`, this, COMMENTS);
    });
    super.addListener(this.dicTerritory, 'click', () => {
      dictionary.init('territory');
      logger(`Territory`, this, COMMENTS);
    });
    super.addListener(this.dicProgram, 'click', () => {
      dictionary.init('program');
      logger(`Program`, this, COMMENTS);
    });
  }

  fillFilters(data) {
    try {
      data.year.forEach((el) => {
        const option = document.createElement('option');
        option.value = el;
        option.textContent = el;
        this.filterYear.appendChild(option);
      });
      data.ministry.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.ID;
        option.textContent = el.name.replace('Министерство', 'Мин.').
            replace('Федеральная служба', 'ФС').
            replace('Федеральное агенство', 'ФА');
        this.filterMinistry.appendChild(option);
      });
      data.territory.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.ID;
        option.textContent = el.name.replace('область', 'обл.').
            replace('Республика', 'Р.').
            replace('Город', 'г.');
        this.filterTerritory.appendChild(option);
      });
      data.program.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.ID;
        option.textContent = el.name.replace('Федеральная целевая программа',
            '');
        this.filterProgram.appendChild(option);
      });
      logger(`fillFilters();`, this, COMMENTS);
    } catch (e) {
      logger(`fillFilters(); ${e}`, this, COMMENTS);
    }
  }

  async testQuery() {
    logger(``);
    logger(`TEST2`);
    /*eslint-disable */
    var data = new FormData();
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open('GET', 'http://293474-cd03243.tmweb.ru/get_filters_list/');
    xhr.setRequestHeader('Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaHR0cHM6Ly9nb2xhbmcub3JnIiwiaHR0cHM6Ly9qd3QuaW8iXSwiZXhwIjoxNTk2NjIxNjEyLCJuYmYiOjE1OTYxMDM1MTIsImlhdCI6MTU5NjEwMzIxMiwiVXNlcm5hbWUiOiJJaCU2cWJsTVFrUm8iLCJJc0FkbWluIjpmYWxzZX0.8H3sJ8bx_F-pDd2q2UdSAXRRrHK66szdJhGburHL0yQ');
    
    xhr.send(data);
    /* eslint-enable */
  }

  errorMessage(element, text, delay = .75) {
    const box = document.createElement('div');
    box.classList.add('error-message-box');
    box.textContent = text;
    element.appendChild(box);
    this.disableUI(true, element);
    element.style.opacity = '1';
    this.addListener(box, 'click', () => {
      box.remove();
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

  clearDisplay() {
    this.DISPLAY.innerHTML = '';
  }
}
