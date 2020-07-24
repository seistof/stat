import './scss/index.scss';
import './logo.png';
import {
  logger,
} from '@core/utils';
import {initBase} from '@core/initComponents';
import {MainView} from '@core/MainView';
import {Query} from '@core/Query';
import {Filter} from '@/components/filter/Filter';
import {FilterView} from '@/components/filter/FilterView';
import {HierarchyView} from '@/components/hierarchy/HierarchyView';

const COMMENTS = true;

logger('Begin', false, COMMENTS);

const mainView = new MainView();
const query = new Query();
const filter = new Filter();
const filterView = new FilterView();
const hierarchyView = new HierarchyView();

(async function() {
  await initBase(
      mainView,
      query,
      filter,
      filterView,
      hierarchyView);
})();
