import {DomMethods} from '@core/DomMethods';
import {logger} from '@core/utils';

const COMMENTS = true;

export class Query extends DomMethods {
  constructor() {
    super();
    this.serverURL = 'http://5.23.55.163';
    this.filterURL = '/get_filters_list/';
    this.hierarchyURL = '/';
    this.hierarchyDetailURL = '/linked_details/';
    this.hierarchyDetailExportURL = '/linked_details_to_excel/';
    this.hierarchySearchURL = 'hierarchySearch';
    this.linkerURL = 'linker';
    this.linkerUpdateURL = 'linkerUpdate';
    this.linkerPredictionURL = 'linkerPrediction';
    this.linkerExistingURL = 'LinkerExisting';
    this.uploadURL = 'upload';
    this.dictionaryURL = 'dictionary';
  }

  async sendQuery(url, options = '', method = 'GET') {
    try {
      const response = await fetch(this.serverURL + url + options, {
        method: method,
        headers: {
          'Authorization': localStorage.getItem('auth'),
        },
      });
      logger(`sendQuery(${this.serverURL + url + options});`, this, COMMENTS);
      return await response.json();
    } catch (e) {
      logger(`sendQuery(${this.serverURL + url + options}); ` + e, this, COMMENTS);
    }
  }

  async authQuery(username, password) {
    try {
      const auth = `{
      "username": "Ih%6qblMQkRo",
      "password": "p@3XROXEwPGq8X3mqy"
      }`;
      const response = await fetch(this.serverURL + '/auth/', {
        method: 'POST',
        body: auth,
      });
      const key = await response.json();
      localStorage.setItem('auth', await key.token);
      logger(`authQuery();`, this, COMMENTS);
    } catch (e) {
      logger(`authQuery(); ` + e, this, COMMENTS);
    }
  }
}
