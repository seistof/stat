import {DomMethods} from '@core/DomMethods';
import {logger} from '@core/utils';

const COMMENTS = true;

export class Query extends DomMethods {
  constructor() {
    super();
    this.serverURL = 'http://666ppnh.io';
    this.filterURL = '/get_filters_list/';
    this.hURL = '/?ministryID=0&territoryID=0&programID=0&year=0&technical_readiness=-1&limit=2&offset=0';
    this.hDetailURL = '/linked_details/';
    this.hSearchURL = 'hierarchySearch';
    this.lURL = 'linker';
    this.lUpdateURL = 'linkerUpdate';
    this.lPredictionURL = 'linkerPrediction';
    this.lExistingURL = 'LinkerExisting';
    this.uURL = 'upload';
    this.dURL = 'dictionary';
  }

  async sendQuery(url, options = '') {
    try {
      const response = await fetch(this.serverURL + url + options);
      logger(`sendQuery(${this.serverURL + url + options});`, this, COMMENTS);
      return await response.json();
    } catch (e) {
      logger(`sendQuery(${this.serverURL + url + options}); ` + e, this,
          COMMENTS);
    }
  }
}
