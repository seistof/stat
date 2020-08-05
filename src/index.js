import './scss/index.scss';
import './logo.png';
import {
  logger,
} from '@/core/utils';
import {Query} from '@core/Query';
import {MainView} from '@core/MainView';
import {Hierarchy} from '@/components/hierarchy/Hierarchy';
import {Linker} from '@/components/linker/Linker';
import {Search} from '@/components/search/Search';
import {Upload} from '@/components/upload/Upload';
import {Dictionary} from '@/components/dictionary/Dictionary';

export const COMMENTS = true;

logger('Begin', false, COMMENTS);

const q = new Query();
const m = new MainView();
const h = new Hierarchy();
const l = new Linker();
const s = new Search();
const u = new Upload();
const d = new Dictionary();

(async () => {
  logger('', false, COMMENTS);
  console.log(`[${q.constructor.name}]`);
  console.log(`[${m.constructor.name}]`);
  console.log(`[${h.constructor.name}]`);
  console.log(`[${l.constructor.name}]`);
  console.log(`[${s.constructor.name}]`);
  console.log(`[${u.constructor.name}]`);
  console.log(`[${d.constructor.name}]`);
  logger('', false, COMMENTS);
  await q.authQuery();
  await m.mainInit(m, h, l, s, u, d);
})();
