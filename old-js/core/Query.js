import {logger} from './utils';

const COMMENTS = true;

export class Query {

  constructor(
      URL, filter, hierarchy, hierarchySearch, hierarchyDetail, linker,
      ministry, territory,
      program, event) {
    this.URL = URL;
    this.filter = filter;
    this.hierarchy = hierarchy;
    this.hierarchySearch = hierarchySearch;
    this.hierarchyDetail = hierarchyDetail;
    this.linker = linker;
    this.ministry = ministry;
    this.territory = territory;
    this.program = program;
    this.event = event;
  }

  async getData(mainURL, url, query = '') {
    logger(`getData();`, this, COMMENTS);
    try {
      const r = await fetch(mainURL + url + query);
      return await r.json();
    } catch (e) {
      logger(`getData(); ${e}`, this, COMMENTS);
      return [];
    }
  }

}
