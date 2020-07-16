import './scss/index.scss';
import './logo.png';
import {baseMarkupFn} from './components/markup/base';
import {Query} from './core/Query';
import {Display} from './components/display/Display';
import {fillFilter, comment} from './core/utils';
import {hierarchyViewMarkupFn} from './components/markup/hierarchy-view';
import {Menu} from './components/menu/Menu';
import {linkerMarkupFn} from './components/markup/linker';
import {uploadMarkupFn} from './components/markup/upload';

comment('Begin');

const root = document.querySelector('#app');
const baseMarkup = baseMarkupFn();
const hierarchyMarkup = hierarchyViewMarkupFn();
const linkerMarkup = linkerMarkupFn();
const uploadMarkup = uploadMarkupFn();

const display = new Display();
root.innerHTML = baseMarkup;
const menu = new Menu();

const query = new Query();

fillFilter(query.filter.year, query.filter.ministry, query.filter.territory,
    query.filter.program);

comment(menu.export);
menu.addListener(menu.main, 'click', () => display.renderHTML(hierarchyMarkup));
menu.addListener(menu.constructor, 'click', () => display.renderHTML(linkerMarkup));
menu.addListener(menu.upload, 'click', () => display.renderHTML(uploadMarkup));
