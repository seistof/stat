import './scss/index.scss';
import './logo.png';
import {baseMarkupFn} from './components/markup/base';
import {initialize, logger, addressBarText} from './core/utils';
import {FilterView} from './components/filter/FilterView';
import {Filter} from './components/filter/Filter';

logger('Begin');

const root = document.querySelector('#app');
const baseMarkup = baseMarkupFn();

root.innerHTML = baseMarkup;

const filterTestData = {
  year: [
    {code: 2011, name: 2011},
    {code: 2012, name: 2012},
  ],
  ministry: [
    {code: 2011, name: 2011},
    {code: 2012, name: 2012},
  ],
  territory: [
    {code: 2011, name: 2011},
    {code: 2012, name: 2012},
  ],
  program: [
    {code: 2011, name: 2011},
    {code: 2012, name: 2012},
  ],
};

const filter = new Filter();
filter.URL = '/get_filters_list/';
filter.year = filterTestData.year;
filter.ministry = filterTestData.ministry;
filter.territory = filterTestData.territory;
filter.program = filterTestData.program;

filter.test();

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
filterView.searchInput = initialize('.header__search-line');
filterView.searchButton = initialize('.header__search-button');

(function initMenu() {
  filterView.watchReadyFilter();
  filterView.reset();
  filterView.apply();
  filterView.fill(filter.year, filter.ministry, filter.territory,
      filter.program);
})();

addressBarText(12323123);
