import {Query} from '../../core/Query';
import {logger} from '../../core/utils';

export class Filter extends Query {
  constructor(URL, year, ministry, territory, program) {
    super();
    this.URL = URL;
    this.year = year || [];
    this.ministry = ministry || [];
    this.territory = territory || [];
    this.program = program || [];
  }

  test() {
    logger(this.URL, this);
    logger(this.year, this);
    logger(this.ministry, this);
    logger(this.territory, this);
    logger(this.program, this);
  }

  async getFilters() {
    return await this.getData(this.filter);
  }
}
