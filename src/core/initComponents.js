import {initialize, logger, testHierarchyData} from '@core/utils';

import {hierarchyViewMarkupFn} from '@/components/markup/hierarchy-view';

export async function initBase(
    mainView,
    query,
    filter,
    filterView,
    navigationView,
    hierarchyView) {
  mainView.display = await initialize('.display');
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
  filterView.box = await initialize('.filter');
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
  const filterData = await query.getData(query.URL, query.filter);
  await filterView.fill(filterData);
  filterView.watchReadyFilter();
  filterView.search();
  filterView.apply();
  filterView.reset();
  navigationView.hierarchy = await initialize('.navigation__button-main');
  navigationView.linker = await initialize('.navigation__button-constructor');
  navigationView.upload = await initialize('.navigation__button-upload');
  navigationView.excel = await initialize('.navigation__button-export');
  navigationView.exit = await initialize('.navigation__button-exit');
  mainView.addListener(navigationView.hierarchy, 'click', async () => {
    await initHierarchy(
        mainView,
        query,
        hierarchyView);
  });
  mainView.addListener(navigationView.linker, 'click', async () => {
    logger(`linker init`, false);
    // init linker
    await initLinker();
  });
  mainView.addListener(navigationView.upload, 'click', async () => {
    logger(`upload init`, false);
    // init upload
    await initUpload();
  });
  mainView.addListener(navigationView.excel, 'click', async () => {
    logger(`excel init`, false);
    // init excel
    await initExcel();
  });
  mainView.addListener(navigationView.exit, 'click', async () => {
    logger(`exit init`, false);
    // init exit
    await initExit();
  });
}

export async function initHierarchy(
    mainView,
    query,
    hierarchyView) {
  logger(`initHierarchy();`);
  await mainView.renderHTML(mainView.display, hierarchyViewMarkupFn());
  hierarchyView.objectContainer = await initialize(
      '.hierarchy-view__object-container');
  const data = testHierarchyData();
  hierarchyView.fill(data.data);
  hierarchyView.buttons = await hierarchyView.initHierarchyButtons();
  hierarchyView.removeButtonListeners(hierarchyView.buttons);
  hierarchyView.addButtonListeners(hierarchyView.buttons);
}

export async function initLinker() {
  logger(`initLinker();`);
}

export async function initUpload() {
  logger(`initUpload();`);
}

export async function initExcel() {
  logger(`initExcel();`);
}

export async function initExit() {
  logger(`initExit();`);
}
