import {MainView} from '@core/MainView';
import {logger} from '@core/utils';
import {COMMENTS} from '@/index';
import {HIERARCHY} from '@/components/hierarchy/Hierarchy';

export class Search extends MainView {
  constructor(applyButton, searchButton, goToButton, prevButton, nextButton, goToInput, searchInput, searchUseFilters) {
    super();
    this.applyButton = applyButton;
    this.searchButton = searchButton;
    this.searchInput = searchInput;
    this.goToButton = goToButton;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.goToInput = goToInput;
    this.searchUseFilters = searchUseFilters;
    this.funcs = [
      this.nextFn.bind(this),
      this.prevFn.bind(this),
      this.goToFn.bind(this),
      this.applyFn.bind(this),
      this.searchFn.bind(this),
    ];
    this.buttons = [];
    this.searchColorTextFn = this.searchColorText.bind(this);
  }

  async init(main, current) {
    logger(``, false, COMMENTS);
    logger(`init();`, this, COMMENTS);
    this.nextButton = super.initialize('.pagination__nav-next');
    this.prevButton = super.initialize('.pagination__nav-prev');
    this.goToButton = super.initialize('.pagination__moveto-button');
    this.applyButton = super.initialize('.filter__button-search');
    this.searchButton = super.initialize('.header__search-button');
    this.totalObjects = super.initialize('.pagination__info-objects-value');
    this.currentPage = super.initialize('.pagination__nav-display');
    this.totalPages = super.initialize('.pagination__info-pages-value');
    this.goToInput = super.initialize('.pagination__moveto-input');
    this.searchInput = super.initialize('.header__search-line');
    this.searchUseFilters = super.initialize('.header__search-use-filters');
    this.buttons = [];
    this.buttons.push(this.nextButton);
    this.buttons.push(this.prevButton);
    this.buttons.push(this.goToButton);
    this.buttons.push(this.applyButton);
    this.buttons.push(this.searchButton);
    this.removeListeners();
    this.addListeners();
    this.checkPagination();
  }

  async nextFn() {
    logger(``, false, COMMENTS);
    logger(`next();`, this, COMMENTS);
    const page = parseInt(this.currentPage.textContent) + 1;
    this.currentPage.textContent = page;
    this.checkPagination();
    let options = super.getFilterValue();
    if (options.length === 0) {
      HIERARCHY.fill(await super.sendQuery(this.hierarchyURL, `?page=${page}`));
    } else {
      options += `&page=${page}`;
      HIERARCHY.fill(await super.sendQuery(this.hierarchyURL, options));
    }
  }

  async prevFn() {
    logger(``, false, COMMENTS);
    logger(`prev();`, this, COMMENTS);
    const page = parseInt(this.currentPage.textContent) - 1;
    this.currentPage.textContent = page;
    this.checkPagination();
    let options = super.getFilterValue();
    if (options.length === 0) {
      HIERARCHY.fill(await super.sendQuery(this.hierarchyURL, `?page=${page}`));
    } else {
      options += `&page=${page}`;
      HIERARCHY.fill(await super.sendQuery(this.hierarchyURL, options));
    }
  }

  async goToFn(e) {
    logger(``, false, COMMENTS);
    logger(`goTo();`, this, COMMENTS);
    const page = this.goToInput.value;
    if (
      page > 0 &&
      page < parseInt(this.totalPages.textContent) &&
      this.goToInput.value !== '' &&
      this.goToInput.value[0] !== '0'
    ) {
      this.currentPage.textContent = page;
      this.goToInput.value = '';
      this.checkPagination();
      let options = super.getFilterValue();
      if (options.length === 0) {
        HIERARCHY.fill(await super.sendQuery(this.hierarchyURL, `?page=${page}`));
      } else {
        options += `&page=${page}`;
        HIERARCHY.fill(await super.sendQuery(this.hierarchyURL, options));
      }
    } else {
      super.errorMessage(e.target, 'Такой страницы нет.');
      this.goToInput.value = '';
      this.goToInput.focus();
      logger(`goToFn(); ` + e, this, COMMENTS);
    }
  }

  async applyFn() {
    logger(``, false, COMMENTS);
    logger(`applyFn();`, this, COMMENTS);
    const options = super.getFilterValue();
    if (options.length === 0) {
      HIERARCHY.fill(await super.sendQuery(this.hierarchyURL));
      this.currentPage.textContent = 1;
    } else {
      HIERARCHY.fill(await super.sendQuery(this.hierarchyURL, options));
      this.currentPage.textContent = 1;
    }
    this.checkPagination();
  }

  async searchFn() {
    logger(``, false, COMMENTS);
    logger(`searchFn();`, this, COMMENTS);
    if (this.searchInput.value.length > 0) {
      let options = super.getFilterValue();
      const str = this.searchInput.value.trim();
      if (options.length > 0 && this.searchUseFilters.checked) {
        options += `&search_query=${str}`;
        logger(options, this, COMMENTS);
        HIERARCHY.fill(await super.sendQuery(this.hierarchySearchURL, options));
        this.checkPagination();
      } else {
        this.filterReset.click();
        logger(str, this, COMMENTS);
        HIERARCHY.fill(await super.sendQuery(this.hierarchySearchURL, `?search_query=${str}`));
        this.checkPagination();
      }
    } else {
      super.errorMessage(this.SEARCH, 'Введите запрос.');
      this.searchInput.focus();
    }
  }

  addListeners() {
    try {
      logger(`addListeners();`, this, COMMENTS);
      let index = 0;
      this.buttons.forEach((button) => {
        super.addListener(button, 'click', this.funcs[index]);
        index++;
      });
      super.addListener(this.searchInput, 'input', this.searchColorTextFn);
    } catch (e) {
      logger(`addListeners(); ` + e, this, COMMENTS);
    }
  }

  removeListeners() {
    try {
      logger(`removeListeners();`, this, COMMENTS);
      let index = 0;
      this.buttons.forEach((button) => {
        super.removeListener(button, 'click', this.funcs[index]);
        index++;
      });
      super.removeListener(this.searchInput, 'input', this.searchColorTextFn);
    } catch (e) {
      logger(`removeListeners(); ` + e, this, COMMENTS);
    }
  }

  checkPagination() {
    super.disableUI(false, this.prevButton);
    super.disableUI(false, this.nextButton);
    super.disableUI(false, this.goToButton);
    if (parseInt(this.currentPage.textContent) === 1) {
      logger(`>>> First page`, this, COMMENTS);
      super.disableUI(true, this.prevButton);
    }
    if (parseInt(this.currentPage.textContent) === parseInt(this.totalPages.textContent)) {
      logger(`>>> Last page`, this, COMMENTS);
      super.disableUI(true, this.nextButton);
    }
    if (parseInt(this.currentPage.textContent) === 1 && parseInt(this.totalPages.textContent) === 1) {
      super.disableUI(true, this.prevButton);
      super.disableUI(true, this.nextButton);
      super.disableUI(true, this.goToButton);
    }
  }

  searchColorText() {
    const str = this.searchInput.value;
    const len = this.searchInput.value.length;
    let counterCode = 0;
    let counterUnique = 0;
    for (let i = 0; i < len; i++) {
      if (
        str[i].charCodeAt(0) !== 48 &&
        str[i].charCodeAt(0) !== 49 &&
        str[i].charCodeAt(0) !== 50 &&
        str[i].charCodeAt(0) !== 51 &&
        str[i].charCodeAt(0) !== 52 &&
        str[i].charCodeAt(0) !== 53 &&
        str[i].charCodeAt(0) !== 54 &&
        str[i].charCodeAt(0) !== 55 &&
        str[i].charCodeAt(0) !== 56 &&
        str[i].charCodeAt(0) !== 46 &&
        str[i].charCodeAt(0) !== 57
      ) {
        this.searchInput.style.color = 'black';
      } else {
        counterCode++;
        if (str[i].charCodeAt(0) === 46) {
          counterUnique++;
        }
      }
    }
    if (counterCode === str.length) {
      this.searchInput.style.color = '#1ade29';
      this.searchInput.style.fontWeight = '600';
    }
    if (counterCode === str.length && counterUnique > 0 && counterUnique < 6) {
      this.searchInput.style.color = 'red';
      this.searchInput.style.fontWeight = '600';
    }
    if (counterUnique > 5) {
      this.searchInput.style.color = 'black';
      this.searchInput.style.fontWeight = '400';
    }
  }

  // Hierarchy
  // Hierarchy

  // linker
  // linker
}
