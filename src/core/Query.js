import {DomMethods} from '@core/DomMethods';
import {logger} from '@core/utils';

const COMMENTS = true;

export class Query extends DomMethods {
  constructor() {
    super();
    this.serverURL = 'http://127.0.0.1:8080';
    this.authURL = '/login';
    this.filterURL = '/get_filters_list';
    this.hierarchyURL = '/';
    this.hierarchyDetailURL = '/linked_details';
    this.hierarchyDetailExportURL = '/linked_details_to_excel';
    this.hierarchyExportURL = '/linked_objects_to_excel';
    this.hierarchySearchURL = '/linked_search';
    this.linkerURL = '/normalized_objects_list';
    this.linkerGetEditURL = '/get_edit_data';
    this.linkerDeleteURL = '/delete_linked_object';
    this.linkerUpdateURL = '/update_linked_object';
    this.linkerCreateURL = '/create_linked_object';
    this.linkerPredictionNewURL = '/predict_new_linking';
    this.linkerPredictionExistingURL = '/predict_exists_linking';
    this.uploadURL = '/data_load';
    this.dictionaryMinistryURL = '/ministry_list';
    this.dictionaryTerritoryURL = '/territory_list';
    this.dictionaryProgramURL = '/program_list';
  }

  async sendQuery(url, options = '', method = 'GET') {
    try {
      // const h = new Headers();
      // h.append('Authorization', localStorage.getItem('auth'));
      const requestOptions = {
        method: method,
        // headers: h,
        redirect: 'follow',
      };
      const response = await fetch(this.serverURL + url + options, requestOptions);
      logger(`sendQuery(${this.serverURL + url + options});`, this, COMMENTS);
      return await response.json();
    } catch (e) {
      logger(`sendQuery(${this.serverURL + url + options}); ` + e, this, COMMENTS);
    }
  }

  async deleteQuery(uniqueCode) {
    try {
      // const h = new Headers();
      // h.append('Authorization', localStorage.getItem('auth'));
      const requestOptions = {
        method: 'DELETE',
        // headers: h,
        redirect: 'follow',
      };
      const response = await fetch(this.serverURL + this.linkerDeleteURL + `?unique_code=${uniqueCode}`, requestOptions);
      logger(`deleteQuery(${this.serverURL + this.linkerDeleteURL} + ?unique_code=${uniqueCode}});`, this, COMMENTS);
      return response.status;
    } catch (e) {
      logger(`deleteQuery(${this.serverURL + this.linkerDeleteURL} + ?unique_code=${uniqueCode}}); ` + e, this, COMMENTS);
    }
  }

  async authQuery(username = '', password = '') {
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
