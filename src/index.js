import './scss/index.scss';
import './logo.png';
import {
  logger,
} from '@/core/utils';
import {Query} from '@core/Query';
import {MainView} from '@core/MainView';
import {Hierarchy} from '@/components/hierarchy/Hierarchy';
import {Linker} from '@/components/linker/Linker';

const COMMENTS = true;

logger('Begin', false, COMMENTS);

const q = new Query();
const m = new MainView();
const h = new Hierarchy();
const l = new Linker();

(async () => {
  console.log(`Query ${q}`);
  console.log(`Main ${m}`);
  console.log(`Hierarchy ${h}`);
  logger('', false, COMMENTS);
  await m.mainInit(m, h, l);
  await h.hInit();
})();
