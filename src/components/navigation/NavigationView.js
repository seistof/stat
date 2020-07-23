import {
  navigationHierarchyButton,
  navigationLinkerButton,
  navigationUploadButton,
  navigationExcelButton,
  navigationExitButton,
  logger,
} from '@core/utils';
import {DOM} from '@core/DOM';

const COMMENTS = true;

export class NavigationView extends DOM {
  constructor(hierarchy, linker, upload, excel, exit) {
    super();
    this.hierarchy = hierarchy;
    this.linker = linker;
    this.upload = upload;
    this.excel = excel;
    this.exit = exit;
  }

  addNavigationButtonListeners() {
    logger(`addNavigationButtonListeners();`, this, COMMENTS);
    const button = [
      this.hierarchy,
      this.linker,
      this.upload,
      this.excel,
      this.exit];
    const func = [
      navigationHierarchyButton,
      navigationLinkerButton,
      navigationUploadButton,
      navigationExcelButton,
      navigationExitButton];
    let index = 0;
    button.forEach((entry) => {
      this.addListener(entry, 'click', func[index]);
      index++;
    });
  }
}
