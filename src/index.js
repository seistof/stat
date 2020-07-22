import './scss/index.scss';
import './logo.png';
import {baseMarkupFn} from './components/markup/base';
import {
  initialize,
  logger,
  addressBarText,
  testHierarchyData,
} from '@core/utils';
import {FilterView} from './components/filter/FilterView';
import {Filter} from './components/filter/Filter';
import {Query} from '@core/Query';
import {hierarchyViewMarkupFn} from './components/markup/hierarchy-view';
import {MainView} from '@core/MainView';
import {HierarchyView} from './components/hierarchy/HierarchyView';

const COMMENTS = true;

logger('Begin', false, COMMENTS);

const mainView = new MainView();
mainView.root = initialize('#app');

const baseMarkup = baseMarkupFn();
const hierarchyMarkup = hierarchyViewMarkupFn();

mainView.renderHTML(mainView.root, baseMarkup);
mainView.display = initialize('.display');
mainView.renderHTML(mainView.display, hierarchyMarkup);

// const filterTestData = {
//   year: [
//     {code: 2011, name: 2011},
//     {code: 2012, name: 2012},
//   ],
//   ministry: [
//     {code: 2011, name: 2011},
//     {code: 2012, name: 2012},
//   ],
//   territory: [
//     {code: 2011, name: 2011},
//     {code: 2012, name: 2012},
//   ],
//   program: [
//     {code: 2011, name: 2011},
//     {code: 2012, name: 2012},
//   ],
// };

const query = new Query();
query.URL = 'http://89a76949c160.ngrok.io';
query.filter = '/get_filters_list/';
query.hierarchy = '';

const filter = new Filter();

const filterView = new FilterView();
filterView.box = initialize('.filter');
filterView.year = initialize('#select-year');
filterView.ministry = initialize('#select-ministry');
filterView.territory = initialize('#select-territory');
filterView.program = initialize('#select-program');
filterView.readyDisplay = initialize('.select-ready-display');
filterView.readySelect = initialize('#select-ready');
filterView.readyAll = initialize('#select-ready-all');
filterView.applyButton = initialize('.filter__button-search');
filterView.resetButton = initialize('.filter__button-reset');
filterView.searchBox = initialize('.header__search-box');
filterView.searchUseFilters = initialize('.header__search-use-filters');
filterView.searchInput = initialize('.header__search-line');
filterView.searchButton = initialize('.header__search-button');

(async function() {
  filterView.filterEnabled('none');
  filterView.searchEnabled('none');
  // const filterData = await filter.getData(query.URL + query.filter);
  // const a = await fetch(query.URL + query.filter);
  // console.log(a);
  // const response = await a.json();
  // console.log(filterData);
  //
  // filter.year = filterData.year || [];
  // filter.ministry = filterData.ministry || [];
  // filter.territory = filterData.territory || [];
  // filter.program = filterData.program || [];

  filterView.watchReadyFilter();
  filterView.reset();
  filterView.apply();
  filterView.fill(filter.year, filter.ministry, filter.territory,
      filter.program);
  filterView.filterEnabled();
  filterView.searchEnabled();
})();

// filter.year = filterTestData.year;
// filter.ministry = filterTestData.ministry;
// filter.territory = filterTestData.territory;
// filter.program = filterTestData.program;

// (function initMenu() {
//   filterView.watchReadyFilter();
//   filterView.reset();
//   filterView.apply();
//   filterView.fill(filter.year, filter.ministry, filter.territory,
//       filter.program);
// })();

addressBarText(12323123);

mainView.enableOverlay();
const hierarchyView = new HierarchyView();
hierarchyView.objectContainer = initialize('.hierarchy-view__object-container');
const testData = testHierarchyData();
hierarchyView.fill(testData.data);
mainView.disableOverlay();
const toggleButtons = hierarchyView.initializeToggleButtons();
hierarchyView.watchToggle(toggleButtons);
// hierarchyView.removeToggle(toggleButtons);
