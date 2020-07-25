import './scss/index.scss';
import './logo.png';
import {
  logger,
} from '@/old/core/utils';
import {initBase} from '@/old/core/initComponents';
import {MainView} from '@/old/core/MainView';
import {Query} from '@/old/core/Query';
import {Filter} from '@/old/components/filter/Filter';
import {FilterView} from '@/old/components/filter/FilterView';
import {HierarchyView} from '@/old/components/hierarchy/HierarchyView';

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
