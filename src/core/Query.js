import {DomMethods} from '@core/DomMethods';
import {logger} from '@core/utils';

const COMMENTS = true;

export class Query extends DomMethods {
  constructor() {
    super();
    this.serverURL = 'http://127.0.0.1:8080';
    // this.serverURL = 'https://aa07451d3f76.ngrok.io';
    this.authURL = '/login';
    this.filterURL = '/get_filters_list';
    this.hierarchyURL = '/';
    this.hierarchyDetailURL = '/linked_details';
    this.hierarchyDetailExportURL = '/linked_details_to_excel/';
    this.hierarchySearchURL = '/linked_search';
    this.linkerURL = '/normalized_objects_list';
    this.linkerUpdateURL = 'linkerUpdate';
    this.linkerPredictionURL = 'linkerPrediction';
    this.linkerExistingURL = 'LinkerExisting';
    this.uploadURL = 'upload';
    this.dictionaryURL = 'dictionary';
  }

  async sendQuery(url, options = '', method = 'GET') {
    try {
      const h = new Headers();
      h.append('Authorization', localStorage.getItem('auth'));
      const requestOptions = {
        method: 'GET',
        headers: h,
        redirect: 'follow',
      };
      const response = await fetch(this.serverURL + url + options, requestOptions);
      logger(`sendQuery(${this.serverURL + url + options});`, this, COMMENTS);
      return await response.json();
    } catch (e) {
      logger(`sendQuery(${this.serverURL + url + options}); ` + e, this, COMMENTS);
    }
  }

  async authQuery(username = 'serGEY', password = 'a_man_with_a_homosexual_identity') {
    try {
      const response = await fetch(this.serverURL + this.authURL, {
        method: 'POST',
        body: `{
      "username":"${username}",
      "password":"${password}"
      }`,
        redirect: 'follow',
      });
      const r = JSON.parse(await response.text());
      localStorage.setItem('auth', r.token);
      logger(`authQuery();`, this, COMMENTS);
    } catch (e) {
      logger(`authQuery(); ` + e, this, COMMENTS);
    }
  }
}
