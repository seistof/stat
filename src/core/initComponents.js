import {hierarchyViewMarkupFn} from '@/components/markup/hierarchy-view';

export async function initMainView(m, q, h) {
  m.filterBox = m.initialize('.filter');
  m.menuBox = m.initialize('.menu');
  m.filterYear = m.initialize('#select-year');
  m.filterMinistry = m.initialize('#select-ministry');
  m.filterTerritory = m.initialize('#select-territory');
  m.filterProgram = m.initialize('#select-program');
  m.filterReadyDisplay = m.initialize('.select-ready-display');
  m.filterReadySelect = m.initialize('#select-ready');
  m.filterReadyAll = m.initialize('#select-ready-all');
  m.filterApplyButton = m.initialize('.filter__button-search');
  m.filterResetButton = m.initialize('.filter__button-reset');
  m.headerSearchBox = m.initialize('.header__search-box');
  m.headerSearchUseFilters = m.initialize('.header__search-use-filters');
  m.headerSearchInput = m.initialize('.header__search-line');
  m.headerSearchButton = m.initialize('.header__search-button');
  m.hierarchyButton = m.initialize('.navigation__button-main');
  m.linkerButton = m.initialize('.navigation__button-linker');
  m.uploadButton = m.initialize('.navigation__button-upload');
  m.excelButton = m.initialize('.navigation__button-excel');
  m.exitButton = m.initialize('.navigation__button-exit');
  m.overlay = m.initialize('.overlay');
  m.headerSearchOverlay = m.initialize('.header__overlay');
  m.display = m.initialize('.display');
  m.disableUI(true);
  m.enableOverlay(true);
  m.dataFilters = await q.sendQuery(q.filterURL);
  m.filterFill(m.dataFilters);
  m.filterWatchReady();
  m.filterReset();
  m.disableUI(false);
  m.enableOverlay(false);
  m.disableUI(true);
  m.enableOverlay(true);
  m.renderHTML(m.display, hierarchyViewMarkupFn());
  h.objectContainer = m.initialize(
      '.hierarchy-view__object-container');
  h.data = await q.sendQuery(q.hierarchyURL);
  h.fill(h.data.data);
  h.initButtons();
  h.removeButtonListeners();
  h.addButtonListeners();
  h.mainDetailCloseButton();
  m.disableUI(false);
  m.enableOverlay(false);
}

export async function initHierarchy(m, q, h) {
  m.disableUI(true);
  m.enableOverlay(true);
  m.renderHTML(m.display, hierarchyViewMarkupFn());
  h.objectContainer = m.initialize(
      '.hierarchy-view__object-container');
  h.data = await q.sendQuery(q.hierarchyURL);
  h.fill(h.data.data);
  h.initButtons();
  h.removeButtonListeners();
  h.addButtonListeners();
  m.disableUI(false);
  m.enableOverlay(false);
}
