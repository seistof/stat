import {MainView} from '@core/MainView';
import {logger, uploadNode} from '@core/utils';
import {COMMENTS} from '@/index';

export class Upload extends MainView {
  constructor(sendButton, uploadBox) {
    super();
    this.uploadBox = uploadBox;
    this.sendButton = sendButton;
    this.uploadFn = this.uploadData.bind(this);
  }

  init() {
    logger(`init();`, this, COMMENTS);
    this.removeInactiveListeners();
    super.disableUI(true, this.navExport);
    super.clearDisplay();
    super.insertElement(this.DISPLAY, uploadNode());
    this.sendButton = super.initialize('#press');
    this.uploadBox = super.initialize('.upload-box');
    this.addUploadListeners();
  }

  addUploadListeners() {
    try {
      logger(`addUploadListeners();`, this, COMMENTS);
      super.addListener(this.sendButton, 'click', this.uploadFn);
    } catch (e) {
      logger(`addUploadListeners(); ` + e, this, COMMENTS);
    }
  }

  removeUploadListeners() {
    try {
      super.removeListener(this.sendButton, 'click', this.uploadFn);
      logger(`removeUploadListeners();`, this, COMMENTS);
    } catch (e) {
      logger(`removeUploadListeners(); ` + e, this, COMMENTS);
    }
  }

  async uploadData() {
    await super.enableOverlay(true);
    const year = document.querySelector('#year-input').value;
    const mainInput = document.querySelector('#main-input');
    const additionalInput = document.querySelector('#additional-input');
    if (
      parseInt(year) > 0 &&
      mainInput.files[0] &&
      additionalInput.files[0]
    ) {
      try {
        logger(year.value);
        logger(mainInput.files[0].name);
        logger(additionalInput.files[0].name);
        const formData = new FormData();
        formData.append('main_file', mainInput.files[0], mainInput.files[0].name);
        formData.append('additional_file', additionalInput.files[0], additionalInput.files[0].name);
        formData.append('clean_upload', 'True');
        formData.append('year', year);
        const requestOptions = {
          method: 'POST',
          body: formData,
          redirect: 'follow',
        };
        console.log(formData.get('main_file'));
        const response = await fetch(this.serverURL + this.uploadURL, requestOptions);
        console.log(response.status);
        logger(`uploadData();`, this, COMMENTS);
        if (response.status >= 200 && response.status < 300) {
          super.errorMessage(this.uploadBox, 'данные загружены', 2, '#0f7814');
        } else {
          super.errorMessage(this.uploadBox, 'ошибка, данные не загружены', 3);
        }
      } catch (e) {
        logger(`uploadData(); ` + e, this, COMMENTS);
      }
    } else {
      super.errorMessage(this.uploadBox, 'все поля должны быть заполены', 1.5);
    }
    await super.enableOverlay(false);
  }
}
