import {logger} from './utils';

export class Query {
  constructor(
      URL, filter, hierarchy, hierarchyDetail, linker, ministry, territory,
      program, event) {
    this.URL = URL;
    this.filter = filter;
    this.hierarchy = hierarchy;
    this.hierarchyDetail = hierarchyDetail;
    this.linker = linker;
    this.ministry = ministry;
    this.territory = territory;
    this.program = program;
    this.event = event;
  }

  async getData(URL, options = '') {
    logger(`${this.constructor.name} getData();`, this);
    const q = await fetch(this.URL+URL+options);
    const response = await q.JSON();
    logger(response);
    return response;
  }
}
