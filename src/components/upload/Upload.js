import {MainView} from '@core/MainView';
import {logger} from '@core/utils';
import {COMMENTS} from '@/index';

export class Upload extends MainView {
  constructor() {
    super();
  }

  init() {
    logger(`init();`, this, COMMENTS);
  }
}