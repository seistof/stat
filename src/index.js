import './scss/index.scss';
import './logo.png';
import {
  logger,
} from '@/core/utils';
import {MainView} from '@core/MainView';
import {initMainView} from '@core/initComponents';
import {Query} from '@core/Query';
import {Hierarchy} from '@/components/hierarchy/Hierarchy';

const COMMENTS = true;

logger('Begin', false, COMMENTS);

const m = new MainView();
const q = new Query();
const h = new Hierarchy();

(async () => {
  // init base DOM
  await initMainView(m, q, h);
  // initial load - filters + hierarchy;
  // main.disableUI(true);
  // main.enableOverlay(true);
  // main.dataFilters = await q.sendQuery(q.filterURL);
  // main.filterFill(main.dataFilters);
  // main.filterWatchReady();
  // main.filterReset();
  // main.disableUI(false);
  // main.enableOverlay(false);
  // console.log('init end');
  // await initHierarchy(main, q, hierarchy);
})();


