import {MainView} from '@core/MainView';
import {logger} from '@core/utils';
import {COMMENTS} from '@/index';

export class Search extends MainView {
  constructor(
      goToButton, prevButton, nextButton, goToInput, searchInput,
      searchUseFilters, pagination1, pagination2, pagination3, pagination4, pagination5, navNums, paginationDiv, pagination6, pagination7) {
    super();
    this.applyButton = super.initialize('.filter__button-search');
    this.searchButton = super.initialize('.header__search-button');
    this.goToButton = goToButton;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.goToInput = goToInput;
    this.pagination1 = pagination1;
    this.pagination2 = pagination2;
    this.pagination3 = pagination3;
    this.paginationDiv = paginationDiv;
    this.pagination4 = pagination4;
    this.pagination5 = pagination5;
    this.pagination6 = pagination6;
    this.pagination7 = pagination7;
    this.navNums = navNums;
    this.navNumValue = false;
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
    this.linkerCurrentState = 'normal';
    this.sourceView = '';
    this.filters = [];
    this.filterApply = this.applyFn.bind(this);
  }

  async searchInit() {
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
    this.pagination1 = super.initialize('.pagination__nav-1');
    this.pagination2 = super.initialize('.pagination__nav-2');
    this.pagination3 = super.initialize('.pagination__nav-3');
    this.paginationDiv = super.initialize('.pagination__nav-div');
    this.paginationDiv2 = super.initialize('.pagination__nav-div-2');
    this.pagination4 = super.initialize('.pagination__nav-4');
    this.pagination5 = super.initialize('.pagination__nav-5');
    this.pagination6 = super.initialize('.pagination__nav-6');
    this.pagination7 = super.initialize('.pagination__nav-7');
    this.navNums = [];
    this.navNums.push(this.pagination1);
    this.navNums.push(this.pagination2);
    this.navNums.push(this.pagination3);
    this.navNums.push(this.pagination4);
    this.navNums.push(this.pagination5);
    this.navNums.push(this.pagination6);
    this.navNums.push(this.pagination7);
    this.buttons = [];
    this.buttons.push(this.nextButton);
    this.buttons.push(this.prevButton);
    this.buttons.push(this.goToButton);
    this.buttons.push(this.applyButton);
    this.buttons.push(this.searchButton);
    this.filters = [];
    this.filterYear = super.initialize('#select-year');
    this.filterMinistry = super.initialize('#select-ministry');
    this.filterTerritory = super.initialize('#select-territory');
    this.filterProgram = super.initialize('#select-program');
    this.filterReadyAll = super.initialize('#select-ready-all');
    this.filters.push(this.filterYear);
    this.filters.push(this.filterMinistry);
    this.filters.push(this.filterTerritory);
    this.filters.push(this.filterProgram);
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
    await this.enableOverlay(true);
    if (this.sourceView === 'hierarchy') {
      if (options.length === 0) {
        await this.HIERARCHY.fill(
            await super.sendQuery(this.hierarchyURL, `?page=${page}`));
      } else {
        options += `&page=${page}`;
        await this.HIERARCHY.fill(
            await super.sendQuery(this.hierarchyURL, options));
      }
    }
    if (this.sourceView === 'linker' && this.linkerCurrentState === 'normal') {
      if (options.length === 0) {
        await this.LINKER.fill(
            await super.sendQuery(this.linkerURL, `?page=${page}`));
      } else {
        options += `&page=${page}`;
        await this.LINKER.fill(await super.sendQuery(this.linkerURL, options));
      }
    }
    await this.enableOverlay(false);
  }

  async prevFn() {
    logger(``, false, COMMENTS);
    logger(`prev();`, this, COMMENTS);
    const page = parseInt(this.currentPage.textContent) - 1;
    this.currentPage.textContent = page;
    this.checkPagination();
    let options = super.getFilterValue();
    await this.enableOverlay(true);
    if (this.sourceView === 'hierarchy') {
      if (options.length === 0) {
        await this.HIERARCHY.fill(
            await super.sendQuery(this.hierarchyURL, `?page=${page}`));
      } else {
        options += `&page=${page}`;
        await this.HIERARCHY.fill(
            await super.sendQuery(this.hierarchyURL, options));
      }
    }
    if (this.sourceView === 'linker' && this.linkerCurrentState === 'normal') {
      if (options.length === 0) {
        await this.LINKER.fill(
            await super.sendQuery(this.linkerURL, `?page=${page}`));
      } else {
        options += `&page=${page}`;
        await this.LINKER.fill(await super.sendQuery(this.linkerURL, options));
      }
    }
    await this.enableOverlay(false);
  }

  async goToFn(e) {
    logger(``, false, COMMENTS);
    logger(`goTo();`, this, COMMENTS);
    console.log(parseInt(e.target.textContent));
    let page;
    if (parseInt(e.target.textContent) > 0) {
      logger(`true`, this, COMMENTS);
      page = parseInt(e.target.textContent);
    } else {
      logger(`false`, this, COMMENTS);
      page = this.goToInput.value;
    }
    logger(`Page: ${page}`, this, COMMENTS);
    if (
      (parseInt(e.target.textContent) > 0) ||
      (page > 0 &&
      page <= parseInt(this.totalPages.textContent) &&
      this.goToInput.value !== '' &&
      this.goToInput.value[0] !== '0')
    ) {
      this.currentPage.textContent = page;
      this.goToInput.value = '';
      let options = super.getFilterValue();
      await this.enableOverlay(true);
      if (this.sourceView === 'hierarchy') {
        if (options.length === 0) {
          await this.HIERARCHY.fill(await super.sendQuery(this.hierarchyURL, `?page=${page}`));
          this.checkPagination();
          // await this.enableOverlay(false);
        } else {
          options += `&page=${page}`;
          await this.HIERARCHY.fill(await super.sendQuery(this.hierarchyURL, options));
          this.checkPagination();
          // await this.enableOverlay(false);
        }
        await this.enableOverlay(false);
      }
      if (this.sourceView === 'linker' && this.linkerCurrentState === 'normal') {
        if (options.length === 0) {
          await this.LINKER.fill(await super.sendQuery(this.linkerURL, `?page=${page}`));
          this.checkPagination();
        } else {
          options += `&page=${page}`;
          await this.LINKER.fill(await super.sendQuery(this.linkerURL, options));
          this.checkPagination();
        }
        await this.enableOverlay(false);
      }
    } else {
      super.errorMessage(e.target, 'такой страницы нет');
      this.goToInput.value = '';
      this.goToInput.focus();
      logger(`goToFn();`, this, COMMENTS);
    }
  }

  async applyFn() {
    logger(``, false, COMMENTS);
    logger(`applyFn();`, this, COMMENTS);
    const options = super.getFilterValue();
    console.log(super.getFilterValue());
    await this.enableOverlay(true);
    if (this.sourceView === 'hierarchy') {
      if (options.length === 0) {
        await this.HIERARCHY.fill(await super.sendQuery(this.hierarchyURL));
        this.currentPage.textContent = 1;
      } else {
        await this.HIERARCHY.fill(
            await super.sendQuery(this.hierarchyURL, options));
        this.currentPage.textContent = 1;
      }
    }
    if (this.sourceView === 'linker' && this.linkerCurrentState === 'normal') {
      if (options.length === 0) {
        await this.LINKER.fill(await super.sendQuery(this.linkerURL));
        this.currentPage.textContent = 1;
      } else {
        await this.LINKER.fill(await super.sendQuery(this.linkerURL, options));
        this.currentPage.textContent = 1;
      }
    }
    await this.enableOverlay(false);
    this.checkPagination();
  }

  async searchFn() {
    logger(``, false, COMMENTS);
    logger(`searchFn();`, this, COMMENTS);
    if (this.searchInput.value.length > 0) {
      let options = super.getFilterValue();
      const str = this.searchInput.value.trim();
      await this.enableOverlay(true);
      if (options.length > 0 && this.searchUseFilters.checked) {
        options += `&search_query=${str}`;
        logger(options, this, COMMENTS);
        await this.HIERARCHY.fill(
            await super.sendQuery(this.hierarchySearchURL, options));
        await this.enableOverlay(false);
        this.currentPage.textContent = 1;
        this.checkPagination();
      } else {
        // this.filterReset.click();
        logger(str, this, COMMENTS);
        await this.HIERARCHY.fill(await super.sendQuery(this.hierarchySearchURL,
            `?search_query=${str}`));
        await this.enableOverlay(false);
        this.currentPage.textContent = 1;
        this.checkPagination();
      }
    } else {
      super.errorMessage(this.SEARCHBOX, 'введите запрос');
      this.searchInput.focus();
    }
  }

  addListeners() {
    try {
      super.addListener(this.searchInput, 'input', this.searchColorTextFn);
      logger(`addListeners();`, this, COMMENTS);
      let index = 0;
      this.buttons.forEach((button) => {
        super.addListener(button, 'click', this.funcs[index]);
        index++;
      });
      this.filters.forEach((f) => {
        super.addListener(f, 'change', this.filterApply);
      });
      this.navNums.forEach((button) => {
        super.addListener(button, 'click', this.funcs[2]);
      });
      super.addListener(this.filterReadyAll, 'change', async () => {
        console.log(`INPUT`);
        await this.applyFn();
      });
    } catch (e) {
      logger(`addListeners(); ` + e, this, COMMENTS);
    }
  }

  removeListeners() {
    try {
      super.removeListener(this.searchInput, 'input', this.searchColorTextFn);
      let index = 0;
      this.buttons.forEach((button) => {
        super.removeListener(button, 'click', this.funcs[index]);
        index++;
      });
      this.filters.forEach((f) => {
        super.removeListener(f, 'change', this.filterApply);
      });
      this.navNums.forEach((button) => {
        super.removeListener(button, 'click', this.funcs[2]);
      });
      logger(`>>> Listeners removed.`, this, COMMENTS);
    } catch (e) {
      logger(`>>> No listeners detected.`, this, COMMENTS);
    }
  }

  checkPagination() {
    console.log(`PAGINATION CHECK`);
    super.disableUI(false, this.prevButton);
    super.disableUI(false, this.nextButton);
    super.disableUI(false, this.goToButton);
    if (parseInt(this.currentPage.textContent) === 1) {
      logger(`>>> First page`, this, COMMENTS);
      super.disableUI(true, this.prevButton);
    }
    if (parseInt(this.currentPage.textContent) ===
      parseInt(this.totalPages.textContent)) {
      logger(`>>> Last page`, this, COMMENTS);
      super.disableUI(true, this.nextButton);
    }
    if (
      (
        parseInt(this.currentPage.textContent) === 1 &&
        parseInt(this.totalPages.textContent) === 1
      ) ||
      parseInt(this.totalObjects.textContent) === 0) {
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
    // const charCode = [46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    // str.split('').some((item) => charCode.includes(item.charCodeAt(0)));
    for (let i = 0; i < len; i++) {
      if (
        str[i].charCodeAt(0) !== 46 &&
        str[i].charCodeAt(0) !== 48 &&
        str[i].charCodeAt(0) !== 49 &&
        str[i].charCodeAt(0) !== 50 &&
        str[i].charCodeAt(0) !== 51 &&
        str[i].charCodeAt(0) !== 52 &&
        str[i].charCodeAt(0) !== 53 &&
        str[i].charCodeAt(0) !== 54 &&
        str[i].charCodeAt(0) !== 55 &&
        str[i].charCodeAt(0) !== 56 &&
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

  paginationNumbersHandler() {
    logger(`>>> Pagination handler <<<`, this, COMMENTS);
    if (parseInt(this.totalPages.textContent) === 0) {
      this.pagination1.style.display = 'none';
      this.pagination2.style.display = 'none';
      this.pagination3.style.display = 'none';
      this.pagination4.style.display = 'none';
      this.pagination5.style.display = 'none';
      this.pagination6.style.display = 'none';
      this.pagination7.style.display = 'none';
      this.paginationDiv.style.display = 'none';
      this.paginationDiv2.style.display = 'none';
    }
    if (parseInt(this.totalPages.textContent) === 1) {
      this.pagination1.style.display = 'block';
      this.pagination2.style.display = 'none';
      this.pagination3.style.display = 'none';
      this.pagination4.style.display = 'none';
      this.pagination5.style.display = 'none';
      this.pagination6.style.display = 'none';
      this.pagination7.style.display = 'none';
      this.paginationDiv.style.display = 'none';
      this.paginationDiv2.style.display = 'none';
    }
    if (parseInt(this.totalPages.textContent) === 2) {
      this.pagination1.style.display = 'block';
      this.pagination2.style.display = 'block';
      this.pagination3.style.display = 'none';
      this.pagination4.style.display = 'none';
      this.pagination5.style.display = 'none';
      this.pagination6.style.display = 'none';
      this.pagination7.style.display = 'none';
      this.paginationDiv.style.display = 'none';
      this.paginationDiv2.style.display = 'none';
    }
    if (parseInt(this.totalPages.textContent) === 3) {
      this.pagination1.style.display = 'block';
      this.pagination2.style.display = 'block';
      this.pagination3.style.display = 'block';
      this.pagination4.style.display = 'none';
      this.pagination5.style.display = 'none';
      this.pagination6.style.display = 'none';
      this.pagination7.style.display = 'none';
      this.paginationDiv.style.display = 'none';
      this.paginationDiv2.style.display = 'none';
    }
    if (parseInt(this.totalPages.textContent) === 4) {
      this.pagination1.style.display = 'block';
      this.pagination2.style.display = 'block';
      this.pagination3.style.display = 'block';
      this.pagination4.style.display = 'block';
      this.pagination5.style.display = 'none';
      this.pagination6.style.display = 'none';
      this.pagination7.style.display = 'none';
      this.paginationDiv.style.display = 'none';
      this.paginationDiv2.style.display = 'none';
    }
    if (parseInt(this.totalPages.textContent) === 5) {
      this.pagination1.style.display = 'block';
      this.pagination2.style.display = 'block';
      this.pagination3.style.display = 'block';
      this.pagination4.style.display = 'block';
      this.pagination5.style.display = 'block';
      this.pagination6.style.display = 'none';
      this.pagination7.style.display = 'none';
      this.paginationDiv.style.display = 'none';
      this.paginationDiv2.style.display = 'none';
    }
    if (parseInt(this.totalPages.textContent) === 6) {
      this.pagination1.style.display = 'block';
      this.pagination2.style.display = 'block';
      this.pagination3.style.display = 'block';
      this.pagination4.style.display = 'block';
      this.pagination5.style.display = 'block';
      this.pagination6.style.display = 'block';
      this.pagination7.style.display = 'none';
      this.paginationDiv.style.display = 'none';
      this.paginationDiv2.style.display = 'none';
    }
    if (parseInt(this.totalPages.textContent) === 7) {
      this.pagination1.style.display = 'block';
      this.pagination2.style.display = 'block';
      this.pagination3.style.display = 'block';
      this.pagination4.style.display = 'block';
      this.pagination5.style.display = 'block';
      this.pagination6.style.display = 'block';
      this.pagination7.style.display = 'block';
      this.paginationDiv.style.display = 'none';
      this.paginationDiv2.style.display = 'none';
    }
    if (parseInt(this.totalPages.textContent) === 8) {
      this.pagination1.style.display = 'block';
      this.pagination2.style.display = 'block';
      this.pagination3.style.display = 'block';
      this.pagination4.style.display = 'block';
      this.pagination5.style.display = 'block';
      this.pagination6.style.display = 'block';
      this.pagination7.style.display = 'block';
      this.paginationDiv.style.display = 'block';
      this.paginationDiv2.style.display = 'block';
      this.pagination7.textContent = '8';
      if (parseInt(this.currentPage.textContent) > 4) {
        this.pagination2.textContent = '3';
        this.pagination3.textContent = '4';
        this.pagination4.textContent = '5';
        this.pagination5.textContent = '6';
        this.pagination6.textContent = '7';
      } else {
        this.pagination2.textContent = '2';
        this.pagination3.textContent = '3';
        this.pagination4.textContent = '4';
        this.pagination5.textContent = '5';
        this.pagination6.textContent = '6';
      }
    }
    if (parseInt(this.totalPages.textContent) > 8) {
      this.pagination1.style.display = 'block';
      this.pagination2.style.display = 'block';
      this.pagination3.style.display = 'block';
      this.pagination4.style.display = 'block';
      this.pagination5.style.display = 'block';
      this.pagination6.style.display = 'block';
      this.pagination7.style.display = 'block';
      this.paginationDiv.style.display = 'block';
      this.paginationDiv2.style.display = 'block';

      this.pagination2.textContent = parseInt(this.currentPage.textContent) - 2;
      this.pagination3.textContent = parseInt(this.currentPage.textContent) - 1;
      this.pagination4.textContent = parseInt(this.currentPage.textContent);
      this.pagination5.textContent = parseInt(this.currentPage.textContent) + 1;
      this.pagination6.textContent = parseInt(this.currentPage.textContent) + 2;
      this.pagination7.textContent = parseInt(this.totalPages.textContent);

      if (parseInt(this.currentPage.textContent) < 4) {
        this.pagination2.textContent = '2';
        this.pagination3.textContent = '3';
        this.pagination4.textContent = '4';
        this.pagination5.textContent = '5';
        this.pagination6.textContent = '6';
      }
      if (parseInt(this.currentPage.textContent) >= (parseInt(this.totalPages.textContent) - 3)) {
        this.pagination2.textContent = parseInt(this.totalPages.textContent) - 5;
        this.pagination3.textContent = parseInt(this.totalPages.textContent) - 4;
        this.pagination4.textContent = parseInt(this.totalPages.textContent) - 3;
        this.pagination5.textContent = parseInt(this.totalPages.textContent) - 2;
        this.pagination6.textContent = parseInt(this.totalPages.textContent) - 1;
      }
      if (parseInt(this.currentPage.textContent) < 5) {
        this.paginationDiv.style.display = 'none';
      } else {
        this.paginationDiv.style.display = 'block';
      }
      if (parseInt(this.currentPage.textContent) >= (parseInt(this.totalPages.textContent) - 3)) {
        this.paginationDiv2.style.display = 'none';
      } else {
        this.paginationDiv2.style.display = 'block';
      }
    }
    this.navNums.forEach((el) => {
      if (parseInt(el.textContent) === parseInt(this.currentPage.textContent)) {
        el.style.fontWeight = '900';
        el.style['pointer-events'] = 'none';
      } else {
        el.style.fontWeight = '400';
        el.style['pointer-events'] = 'auto';
      }
    });
  }
}
