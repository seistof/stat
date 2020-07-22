import {logger} from './utils';

const COMMENTS = false;

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

  async getData(server, url, options = '') {
    logger(`getData();`, this, COMMENTS);
    const response = await fetch(server + url + options);
    return await response.JSON();
  }
}
