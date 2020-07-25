import {Query} from '@core/Query';
import {addressBarText, logger} from '@/core/utils';

const COMMENTS = true;

export class MainView extends Query {
  constructor(filterBox, menuBox, filterYear, filterMinistry, filterTerritory,
      filterProgram, filterReadyDisplay,
      filterReadySelect,
      filterReadyAll, filterApplyButton, filterResetButton, headerSearchBox,
      headerSearchUseFilters, headerSearchInput,
      headerSearchButton, hierarchyButton, linkerButton, uploadButton,
      excelButton,
      exitButton, overlay, searchOverlay, display, dataFilters) {
    super();
    this.filterBox = filterBox;
    this.menuBox = menuBox;
    this.filterYear = filterYear;
    this.filterMinistry = filterMinistry;
    this.filterTerritory = filterTerritory;
    this.filterProgram = filterProgram;
    this.filterReadyDisplay = filterReadyDisplay;
    this.filterReadySelect = filterReadySelect;
    this.filterReadyAll = filterReadyAll;
    this.filterApplyButton = filterApplyButton;
    this.filterResetButton = filterResetButton;
    this.headerSearchBox = headerSearchBox;
    this.headerSearchUseFilters = headerSearchUseFilters;
    this.headerSearchInput = headerSearchInput;
    this.headerSearchButton = headerSearchButton;
    this.hierarchyButton = hierarchyButton;
    this.linkerButton = linkerButton;
    this.uploadButton = uploadButton;
    this.excelButton = excelButton;
    this.exitButton = exitButton;
    this.overlay = overlay;
    this.headerSearchOverlay = searchOverlay;
    this.display = display;
    this.dataFilters = dataFilters;
  }

  disableUI(token, ...target) {
    logger(`disableUI(${token});`, this, COMMENTS);
    if (token) {
      target.forEach((entry) => {
        entry.style['pointer-events'] = 'none';
      });
    } else {
      target.forEach((entry) => {
        entry.style['pointer-events'] = 'auto';
      });
    }
  }

  // disableUI(token = true) {
  //   logger(`disableUI(${token});`, this, COMMENTS);
  //   if (token) {
  //     this.menuBox.style['pointer-events'] = 'none';
  //     this.headerSearchBox.style['pointer-events'] = 'none';
  //   } else {
  //     this.menuBox.style['pointer-events'] = 'auto';
  //     this.headerSearchBox.style['pointer-events'] = 'auto';
  //   }
  // }

  enableOverlay(token, ...target) {
    logger(`enableOverlay(${token});`, this, COMMENTS);
    if (token) {
      target.forEach((entry) => {
        entry.style.display = 'flex';
      });
    } else {
      target.forEach((entry) => {
        entry.style.display = 'none';
      });
    }
  }

  // enableOverlay(token = true) {
  //   logger(`enableOverlay(${token});`, this, COMMENTS);
  //   if (token) {
  //     this.overlay.style.display = 'flex';
  //     this.headerSearchOverlay.style.display = 'flex';
  //   } else {
  //     this.overlay.style.display = 'none';
  //     this.headerSearchOverlay.style.display = 'none';
  //   }
  // }

  filterWatchReady() {
    logger(`filterWatchReady();`, this, COMMENTS);
    this.addListener(this.filterReadySelect, 'input', () => {
      this.filterReadyAll.checked = false;
      this.filterReadyDisplay.value = this.filterReadySelect.value;
    });
    this.addListener(this.filterReadyAll, 'click', () => {
      if (this.filterReadyAll.checked) {
        this.filterReadyDisplay.value = `Все`;
      } else {
        this.filterReadyDisplay.value = this.filterReadySelect.value;
      }
    });
  }

  filterFill(data) {
    logger(`filterFill();`, this, COMMENTS);
    try {
      data.year.forEach((el) => {
        const option = document.createElement('option');
        option.value = el;
        option.textContent = el;
        this.filterYear.appendChild(option);
      });
      data.ministry.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.code;
        option.textContent = el.name.replace('Министерство', 'Мин.').
            replace('Федеральная служба', 'ФС').
            replace('Федеральное агенство', 'ФА');
        this.filterMinistry.appendChild(option);
      });
      data.territory.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.code;
        option.textContent = el.name.replace('область', 'обл.').
            replace('Республика', 'Р.').
            replace('Город', 'г.');
        this.filterTerritory.appendChild(option);
      });
      data.program.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.code;
        option.textContent = el.name.replace('Федеральная целевая программа',
            '');
        this.filterProgram.appendChild(option);
      });
    } catch (e) {
      logger(`fill(); ${e}`, this, COMMENTS);
    }
  }

  filterReset() {
    this.addListener(this.filterResetButton, 'click', () => {
      logger(`filterReset();`, this, COMMENTS);
      this.filterYear.selectedIndex = '0';
      this.filterMinistry.selectedIndex = '0';
      this.filterTerritory.selectedIndex = '0';
      this.filterProgram.selectedIndex = '0';
      this.filterReadyDisplay.value = 'Все';
      this.filterReadySelect.value = 50;
      this.filterReadyAll.checked = true;
      addressBarText();
    });
  }

  filterApply() {
    this.addListener(this.applyButton, 'click', () => {
      logger(`apply();`, this, COMMENTS);
      // should return data to fill hierarchy or linker
    });
  }

  filterSearch() {
    this.addListener(this.searchButton, 'click', () => {
      logger(`search();`, this, COMMENTS);
      // should return data to fill hierarchy or linker
    });
  }
}
