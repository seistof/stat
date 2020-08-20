import {Query} from '@core/Query';
import {logger} from '@core/utils';
import {COMMENTS} from '@/index';

// import filtersTEST from '../../filters.json';

export class MainView extends Query {
  constructor(overlay, MAIN, HIERARCHY, LINKER, SEARCH, UPLOAD, DICTIONARY) {
    super();
    // Filter
    this.filterYear = super.initialize('#select-year');
    this.filterMinistry = super.initialize('#select-ministry');
    this.filterTerritory = super.initialize('#select-territory');
    this.filterProgram = super.initialize('#select-program');
    this.filterReadyDisplay = super.initialize('.select-ready-display');
    this.filterReadyInput = super.initialize('#select-ready');
    this.filterReadyAll = super.initialize('#select-ready-all');
    this.filterReset = super.initialize('.filter__button-reset');
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
    // Search
    this.MAIN = MAIN;
    this.HIERARCHY = HIERARCHY;
    this.LINKER = LINKER;
    this.SEARCH = SEARCH;
    this.UPLOAD = UPLOAD;
    this.DICTIONARY = DICTIONARY;
  }

  async mainInit(main, hierarchy, linker, search, upload, dictionary) {
    const classes = [main, hierarchy, linker, search, upload, dictionary];
    classes.forEach((c) => {
      c.MAIN = this;
      c.HIERARCHY = hierarchy;
      c.LINKER = linker;
      c.SEARCH = search;
      c.UPLOAD = upload;
      c.DICTIONARY = dictionary;
    });
    logger(``, false, COMMENTS);
    logger(`mainInit();`, this, COMMENTS);
    await this.enableOverlay(true);
    this.mainListenersInit(main, hierarchy, linker, search, upload, dictionary);
    this.fillFilters(await super.sendQuery(this.filterURL));
    await this.enableOverlay(false);
    this.navExit.style.display = 'none';
    await this.HIERARCHY.hierarchyInit();
  }

  disableUI(token, ...target) {
    try {
      return new Promise((r) => {
        if (token) {
          target.forEach((el) => {
            el.style['pointer-events'] = 'none';
            el.style.opacity = '.33';
          });
          r();
        } else {
          target.forEach((el) => {
            el.style['pointer-events'] = 'auto';
            el.style.opacity = '1';
          });
          r();
        }
      });
    } catch (e) {
      logger(`disableUI(); ` + e, this, COMMENTS);
    }
  }

  enableOverlay(token) {
    return new Promise((r) => {
      try {
        logger(`>>> Check overlay`, this, COMMENTS);
        this.OVERLAY.remove();
        logger(`>>> Overlay disabled`, this, COMMENTS);
      } catch (e) {
        logger(`>>> No overlay detected`, this, COMMENTS);
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
        super.insertElement(this.ROOT, this.OVERLAY);
        logger(`>>> Overlay enabled`, this, COMMENTS);
      }
      r();
    });
  }

  getFilterValue() {
    let options = '';
    options += parseInt(this.filterYear.options[this.filterYear.selectedIndex].value) === 0
      ? ''
      : `&year=${this.filterYear.options[this.filterYear.selectedIndex].value}`;
    options += parseInt(this.filterMinistry.options[this.filterMinistry.selectedIndex].value) === 0
      ? ''
      : `&ministry_id=${this.filterMinistry.options[this.filterMinistry.selectedIndex].value}`;
    options += parseInt(this.filterTerritory.options[this.filterTerritory.selectedIndex].value) === 0
      ? ''
      : `&territory_id=${this.filterTerritory.options[this.filterTerritory.selectedIndex].value}`;
    options += parseInt(this.filterProgram.options[this.filterProgram.selectedIndex].value) === 0
      ? ''
      : `&program_id=${this.filterProgram.options[this.filterProgram.selectedIndex].value}`;
    options += this.filterReadyAll.checked
      ? ''
      : `&technical_readiness=${this.filterReadyInput.value}`;
    if (options.length > 0) {
      return options.replace('&', '?');
    } else {
      return '';
    }
  }

  mainListenersInit() {
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
    super.addListener(this.filterReset, 'click', async () => {
      this.filterYear.selectedIndex = 0;
      this.filterMinistry.selectedIndex = 0;
      this.filterTerritory.selectedIndex = 0;
      this.filterProgram.selectedIndex = 0;
      this.filterReadyInput.value = 50;
      this.filterReadyDisplay.value = 'Все';
      this.filterReadyAll.checked = true;
      super.initialize('.header__search-line').value = '';
      logger(`Reset filters.`, this, COMMENTS);
    });
    super.addListener(this.navMain, 'click', async () => {
      await this.HIERARCHY.hierarchyInit();
      logger(`Hierarchy`, this, COMMENTS);
    });
    super.addListener(this.navLinker, 'click', async () => {
      const filter = this.getFilterValue();
      if (filter !== '' && parseInt(this.SEARCH.currentPage.textContent) !== 1) {
        this.HIERARCHY.lastState = `${filter}&page=${parseInt(this.SEARCH.currentPage.textContent)}`;
        this.HIERARCHY.lastPage = parseInt(this.SEARCH.currentPage.textContent);
      }
      if (filter === '' && parseInt(this.SEARCH.currentPage.textContent) !== 1) {
        this.HIERARCHY.lastState = `?page=${parseInt(this.SEARCH.currentPage.textContent)}`;
        this.HIERARCHY.lastPage = parseInt(this.SEARCH.currentPage.textContent);
      }
      if (filter !== '' && parseInt(this.SEARCH.currentPage.textContent) === 1) {
        this.HIERARCHY.lastState = filter;
      }
      console.log(this.HIERARCHY.lastState);
      console.log(this.HIERARCHY.lastPage);
      await this.LINKER.linkerInit();
      logger(`Linker`, this, COMMENTS);
    });
    super.addListener(this.navUpload, 'click', () => {
      // delete all other listeners
      this.UPLOAD.init();
      logger(`Upload`, this, COMMENTS);
    });
    super.addListener(this.navExport, 'click', async () => {
      await this.exportFn();
    });
    super.addListener(this.navExit, 'click', () => {
      logger(`Exit`, this, COMMENTS);
    });
    super.addListener(this.dicMinistry, 'click', () => {
      logger(`Dictionary: Ministry`, this, COMMENTS);
      this.DICTIONARY.MINISTRY = true;
      this.DICTIONARY.TERRITORY = false;
      this.DICTIONARY.PROGRAM = false;
      this.DICTIONARY.init();
    });
    super.addListener(this.dicTerritory, 'click', () => {
      logger(`Dictionary: Territory`, this, COMMENTS);
      this.DICTIONARY.MINISTRY = false;
      this.DICTIONARY.TERRITORY = true;
      this.DICTIONARY.PROGRAM = false;
      this.DICTIONARY.init();
    });
    super.addListener(this.dicProgram, 'click', () => {
      logger(`Dictionary: Program`, this, COMMENTS);
      this.DICTIONARY.MINISTRY = false;
      this.DICTIONARY.TERRITORY = false;
      this.DICTIONARY.PROGRAM = true;
      this.DICTIONARY.init();
    });
  }

  fillFilters(data) {
    try {
      data.yearList.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.yeardata;
        option.textContent = el.yeardata;
        this.filterYear.appendChild(option);
      });
      data.ministryList.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.ID;
        option.textContent = el.shortName !== null ? el.shortName : el.name;
        const years = el.fromYear === el.toYear ?
          ` (${el.fromYear})` :
          ` (${el.fromYear} - ${el.toYear})`;
        option.textContent += years;
        this.filterMinistry.appendChild(option);
      });
      data.territoryList.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.ID;
        option.textContent = el.name.replace('область', 'обл.').
            replace('Республика', 'Р.').
            replace('Город', 'г.');
        this.filterTerritory.appendChild(option);
      });
      data.programList.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.ID;
        option.textContent = el.name.replace('Федеральная целевая программа',
            '');
        const years = el.fromYear === el.toYear ?
          ` (${el.fromYear})` :
          ` (${el.fromYear} - ${el.toYear})`;
        option.textContent += years;
        this.filterProgram.appendChild(option);
      });
      logger(`fillFilters();`, this, COMMENTS);
    } catch (e) {
      this.errorMessage(this.MENU, 'не удалось загрузить фильтры', 3);
      logger(`fillFilters(); ${e}`, this, COMMENTS);
    }
  }

  errorMessage(element, text, delay = .75, color = '#af2323') {
    const box = document.createElement('div');
    box.classList.add('error-message-box');
    box.textContent = text;
    box.style.background = color;
    element.appendChild(box);
    // this.disableUI(true, element);
    element.style.opacity = '1';
    // this.addListener(box, 'click', () => {
    //   box.remove();
    //   this.disableUI(false, element);
    // }, true);
    setTimeout(() => {
      // try {
      //   box.dispatchEvent(new Event('click'));
      box.remove();
      // } catch (e) {
      //   logger(`Error message already removed. ` + e, this, COMMENTS);
      // }
    }, delay * 1000);
  }

  clearDisplay() {
    logger(`clearDisplay();`, this, COMMENTS);
    this.DISPLAY.innerHTML = '';
  }

  removeInactiveListeners() {
    try {
      this.HIERARCHY.removeListeners();
      this.LINKER.linkerListSelectRemoveListeners();
      this.LINKER.controlButtonsRemoveListeners();
      this.SEARCH.removeListeners();
      this.UPLOAD.removeUploadListeners();
      this.DICTIONARY.removeListeners();
    } catch (e) {
      logger(`>>> No other listeners detected. ` + e, false, COMMENTS);
    }
  }

  async exportFn() {
    logger(`exportFn();`, this, COMMENTS);
    await this.enableOverlay(true);
    try {
      const options = this.getFilterValue();
      const response = await fetch(this.serverURL + this.hierarchyExportURL + options);
      const url = window.URL.createObjectURL(await response.blob());
      const a = document.createElement('a');
      const d = new Date();
      const month = d.getMonth().toString().length === 2 ? d.getMonth() : `0${d.getMonth()}`;
      const day = d.getDay().toString().length === 2 ? d.getDay() : `0${d.getDay()}`;
      const date = `${d.getFullYear()}.${month}.${day} ${d.getHours()}-${d.getMinutes()}`;
      const ready = this.filterReadyDisplay.value !== 'Все' ? `${this.filterReadyDisplay.value}%` : 'Все';
      const name = `Выгрузка; Готовность - ${ready}; Дата - ${date}.xlsx`;
      console.log(name);
      // if (this.filterReadyDisplay) {}
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      logger(`exportFn(); ` + err, this, COMMENTS);
    }
    await this.enableOverlay(false);
  }
}
