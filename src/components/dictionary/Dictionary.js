import {MainView} from '@core/MainView';
import {logger} from '@core/utils';
import {COMMENTS} from '@/index';

export class Dictionary extends MainView {
  constructor() {
    super();
  }

  init() {
    logger(`init();`, this, COMMENTS);
  }
}
