import {Query} from '@core/Query';
import {logger} from '@core/utils';

const COMMENTS = false;

export class Filter extends Query {
  constructor() {
    super();
  }

  getQueryURL(ministry, territory, program, year, ready, page) {
    logger(`getQueryURL();`, this, COMMENTS);
    let str = `/?`;
    ministry === '0' ? str += `ministryID=${ministry}&` : str += '';
    territory === '0' ? str += `territoryID=${territory}&` : str += '';
    program === '0' ? str += `programID=${program}&` : str += '';
    year === '' ? str += `year=${year}&` : str += '';
    ready === '' ? str += `technical_readiness=${ready}&` : str += '';
    str += `page=${page}`;
    return str;
  }
}
