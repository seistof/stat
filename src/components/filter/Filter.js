import {Query} from '@core/Query';
import {logger} from '@core/utils';

const COMMENTS = false;

export class Filter extends Query {
  constructor(URL, year, ministry, territory, program) {
    super();
    this.year = year || [];
    this.ministry = ministry || [];
    this.territory = territory || [];
    this.program = program || [];
  }

  test() {
    logger(this.year, this);
    logger(this.ministry, this);
    logger(this.territory, this);
    logger(this.program, this);
  }

  async getFilters(url) {
    logger(`getFilters();`, this, COMMENTS);
    return await this.getData(url);
  }

  getQueryURL(ministry, territory, program, year, ready, page) {
    logger(`getQueryURL();`, this, COMMENTS);
    return `
    /?ministryID=${ministry}&territoryID=${territory}&programID=${program}&year=${year}&technical_readiness=${ready}&pae=${page}
    `;
  }
}
