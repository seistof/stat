import {
  initialize,
  logger,
  testHierarchyData,
} from '@core/utils';

import {hierarchyViewMarkupFn} from '@/components/markup/hierarchy-view';
import {linkerMarkupFn} from '@/components/markup/linker';
import {uploadMarkupFn} from '@/components/markup/upload';

export async function initBase(
    mainView,
    query,
    filter,
    filterView,
    hierarchyView, linkerView) {
  mainView.display = await initialize('.display');
  // Query
  query.URL = 'http://89a76949c160.ngrok.io';
  query.filter = '/get_filters_list/';
  query.hierarchy = '';
  query.hierarchySearch = '';
  query.hierarchyDetail = '';
  query.linker = '';
  query.ministry = '';
  query.territory = '';
  query.program = '';
  query.event = '';
  // Filter View
  filterView.box = await initialize('.filter');
  filterView.menuBox = await initialize('.menu');
  filterView.year = await initialize('#select-year');
  filterView.ministry = await initialize('#select-ministry');
  filterView.territory = await initialize('#select-territory');
  filterView.program = await initialize('#select-program');
  filterView.readyDisplay = await initialize('.select-ready-display');
  filterView.readySelect = await initialize('#select-ready');
  filterView.readyAll = await initialize('#select-ready-all');
  filterView.applyButton = await initialize('.filter__button-search');
  filterView.resetButton = await initialize('.filter__button-reset');
  filterView.searchBox = await initialize('.header__search-box');
  filterView.searchUseFilters = await initialize('.header__search-use-filters');
  filterView.searchInput = await initialize('.header__search-line');
  filterView.searchButton = await initialize('.header__search-button');
  filterView.hierarchyButton = await initialize('.navigation__button-main');
  filterView.linkerButton = await initialize('.navigation__button-constructor');
  filterView.uploadButton = await initialize('.navigation__button-upload');
  filterView.excelButton = await initialize('.navigation__button-export');
  filterView.exitButton = await initialize('.navigation__button-exit');
  const filterData = await query.getData(query.URL, query.filter);
  await filterView.fill(filterData);
  filterView.watchReadyFilter();
  filterView.search();
  filterView.apply();
  filterView.reset();
  // button listeners
  mainView.addListener(filterView.hierarchyButton, 'click', async () => {
    await initHierarchy(
        mainView,
        query,
        hierarchyView,
        filterView);
  });
  mainView.addListener(filterView.linkerButton, 'click', async () => {
    logger(`linker init`, false);
    // init linker
    await initLinker(mainView, query, linkerView, filterView);
  });
  mainView.addListener(filterView.uploadButton, 'click', async () => {
    logger(`upload init`, false);
    // init upload
    await initUpload(mainView, query, linkerView, filterView);
  });
  mainView.addListener(filterView.excelButton, 'click', async () => {
    logger(`excel init`, false);
    // init excel
    await initExcel();
  });
  mainView.addListener(filterView.exitButton, 'click', async () => {
    logger(`exit init`, false);
    // init exit
    await initExit();
  });
  await initHierarchy(mainView, query, hierarchyView, filterView);
}

export async function initHierarchy(
    mainView,
    query,
    hierarchyView,
    filterView) {
  logger(`initHierarchy();`);
  await mainView.renderHTML(mainView.display, hierarchyViewMarkupFn());
  await filterView.enableOverlay(mainView.display);
  hierarchyView.objectContainer = await initialize(
      '.hierarchy-view__object-container');
  const data = testHierarchyData();
  hierarchyView.pages = data.totalLen;
  hierarchyView.fill(data.data);
  hierarchyView.buttons = await hierarchyView.initHierarchyButtons();
  hierarchyView.removeButtonListeners(hierarchyView.buttons);
  hierarchyView.addButtonListeners(hierarchyView.buttons);
  await filterView.disableOverlay(mainView.display);
}

export async function initLinker(mainView, query, linkerView, filterView) {
  logger(`initLinker();`);
  await mainView.renderHTML(mainView.display, linkerMarkupFn());
  await filterView.enableOverlay(mainView.display);
  // code
  await filterView.disableOverlay(mainView.display);
}

export async function initUpload(mainView, query, linkerView, filterView) {
  logger(`initUpload();`);
  await mainView.renderHTML(mainView.display, uploadMarkupFn());
  await filterView.enableOverlay(mainView.display);
  // code
  await filterView.disableOverlay(mainView.display);
}

export async function initExcel() {
  logger(`initExcel();`);
}

export async function initExit() {
  logger(`initExit();`);
}

export async function initPagination(paginationView) {

}
