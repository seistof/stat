import {MainView} from '@core/MainView';
import {linkerMarkup} from '@/components/markup/markup';
import {logger} from '@core/utils';

const COMMENTS = true;

export class Linker extends MainView {
  constructor(
      lPaginationBox, lGoToInput, lGoToButton, lPrevButton, lNextButton,
      lPageDisplay, lTotalPages, lTotalObjects, lPaginationNavBox,
      lPaginationGoToBox,
  ) {
    super();
    this.lPaginationBox = lPaginationBox;
    this.lGoToInput = lGoToInput;
    this.lGoToButton = lGoToButton;
    this.lPrevButton = lPrevButton;
    this.lNextButton = lNextButton;
    this.lPageDisplay = lPageDisplay;
    this.lTotalPages = lTotalPages;
    this.lTotalObjects = lTotalObjects;
    this.lPaginationNavBox = lPaginationNavBox;
    this.lPaginationGoToBox = lPaginationGoToBox;
  }

  lInit() {
    this.display.innerHTML = '';
    this.enableOverlay(true);
    this.disableUI(true, this.filterBox, this.headerSearchBox);
    this.display.innerHTML = linkerMarkup;
    this.lPaginationBox = this.initialize('.pagination');
    this.lGoToInput = this.initialize('.pagination__moveto-input');
    this.lGoToButton = this.initialize('.pagination__moveto-button');
    this.lPrevButton = this.initialize('.pagination__nav-prev');
    this.lNextButton = this.initialize('.pagination__nav-next');
    this.lPageDisplay = this.initialize('.pagination__nav-display');
    this.lTotalPages = this.initialize('.pagination__info-pages-value');
    this.lTotalObjects = this.initialize('.pagination__info-objects-value');
    this.lPaginationNavBox = this.initialize('.pagination__nav');
    this.lPaginationGoToBox = this.initialize('.pagination__moveto');
    this.lWatchPagination();
    this.enableOverlay(false);
    this.disableUI(false, this.filterBox, this.headerSearchBox);
    logger('lInit();', false, COMMENTS);
    logger('', false, COMMENTS);
  }

  lWatchPagination() {
    this.disableUI(false, this.lPrevButton, this.lNextButton);
    logger(`pagination enabled`, this, COMMENTS);
    if (parseInt(this.lTotalPages.textContent) === 1) {
      this.disableUI(true, this.lPrevButton, this.lNextButton);
      logger(`pagination disabled`, this, COMMENTS);
    } else {
      if (parseInt(this.lPageDisplay.textContent) === 1 &&
          parseInt(this.lTotalPages.textContent) > 1) {
        this.disableUI(true, this.lPrevButton);
        logger(`pagination prev disabled`, this, COMMENTS);
      }
      if (parseInt(this.lPageDisplay.textContent) ===
          parseInt(this.lTotalPages.textContent)) {
        this.disableUI(true, this.lNextButton);
        logger(`pagination next disabled`, this, COMMENTS);
      }
    }
  }

  async lNext() {
    logger(`hNext();`, this, COMMENTS);
    const options = this.getFilterValue() +
        `&page=${parseInt(this.lPageDisplay.textContent) + 1}`;
    this.lPageDisplay.textContent = parseInt(this.lPageDisplay.textContent) + 1;
    await this.hFill(this.sendQuery(this.filterURL, options));
    this.hWatchPagination();
    logger(options);
  }

  async lPrev() {
    logger(`hPrev();`, this, COMMENTS);
    const options = this.getFilterValue() +
        `&page=${parseInt(this.lPageDisplay.textContent) - 1}`;
    this.lPageDisplay.textContent = parseInt(this.lPageDisplay.textContent) - 1;
    await this.hFill(this.sendQuery(this.filterURL, options));
    this.hWatchPagination();
    logger(options);
  }

  async lGoTo() {
    if (parseInt(this.lGoToInput.value) > parseInt(this.lTotalPages.textContent)
        || parseInt(this.lGoToInput.value) < 0
        || this.lGoToInput.value === ''
        || parseInt(this.lGoToInput.value) ===
        parseInt(this.hPageDisplay.textContent)
    ) {
      logger(`hGoTo(); ERROR: Out of range.`, this, COMMENTS);
      this.errorMessage(this.lPaginationGoToBox, 'Такой страницы нет.');
    } else {
      this.lPageDisplay.textContent = this.lGoToInput.value;
      const options = this.getFilterValue() +
          `&page=${this.lGoToInput.value}`;
      await this.hFill(this.sendQuery(this.filterURL, options));
      this.hWatchPagination();
      this.lGoToInput.value = '';
      logger(options);
      logger(`hGoTo();`, this, COMMENTS);
    }
  }
}
