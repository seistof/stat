import {DomMethods} from '@core/DomMethods';
import {logger} from '@core/utils';

const COMMENTS = true;

export class Query extends DomMethods {
  constructor(server) {
    super();
    this.serverURL = 'http://666ppnh';
    this.filterURL = '/get_filters_list/';
    this.hierarchyURL = '/?ministryID=0&territoryID=0&programID=0&year=0&technical_readiness=-1&limit=2&offset=0';
    this.hierarchyDetailURL = '/linked_details/';
    this.hierarchySearchURL = 'hierarchySearch';
    this.linkerURL = 'linker';
    this.linkerUpdateURL = 'linkerUpdate';
    this.linkerPredictionURL = 'linkerPrediction';
    this.LinkerExistingURL = 'LinkerExisting';
    this.uploadURL = 'upload';
    this.dictionaryURL = 'dictionary';
    this.mainMenuBox = document.querySelector('.menu');
    this.menuFilterBox = document.querySelector('.filter');
    this.mainHeaderSearchBox = document.querySelector('.header__search-box');
    this.mainOverlay = document.querySelector('.overlay');
    this.mainHeaderSearchOverlay = document.querySelector('.header__overlay');
    this.mainDisplay = document.querySelector('.display');
    this.mainDetailWindow = document.querySelector('.detail-window');
    this.mainDetailContainer = document.querySelector('.detail-view__rows');
    this.mainDetailClose = document.querySelector('.details-window__close-button');
  }

  async sendQuery(url, options = '') {
    logger(`sendQuery(${this.serverURL + url + options});`, this, COMMENTS);
    try {
      const response = await fetch(this.serverURL + url + options);
      return await response.json();
    } catch (e) {
      logger(`sendQuery(); ` + e, this, COMMENTS);
      console.log(this.serverURL);
    }
  }
}
