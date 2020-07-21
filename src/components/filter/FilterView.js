import {MainView} from '../../core/MainView';
import {addressBarText, logger} from '../../core/utils';

export class FilterView extends MainView {
  constructor(box, year, ministry, territory, program, readyDisplay,
      readySelect,
      readyAll, apply, reset, searchBox, searchInput, search) {
    super();
    this.box = box;
    this.year = year;
    this.ministry = ministry;
    this.territory = territory;
    this.program = program;
    this.readyDisplay = readyDisplay;
    this.readySelect = readySelect;
    this.readyAll = readyAll;
    this.applyButton = apply;
    this.resetButton = reset;
    this.searchBox = searchBox;
    this.searchInput = searchInput;
    this.searchButton = search;
  }

  filterEnabled(mode = 'auto') {
    logger(`filterEnabled();`, this);
    this.box.style['pointer-events'] = `${mode}`;
  }

  searchEnabled(mode = 'auto') {
    logger(`searchEnabled();`, this);
    this.searchBox.style['pointer-events'] = `${mode}`;
  }

  watchReadyFilter() {
    logger(`watchReadyFilter();`, this);
    this.addListener(this.readySelect, 'input', () => {
      this.readyAll.checked = false;
      this.readyDisplay.value = this.readySelect.value;
    });
    this.addListener(this.readyAll, 'click', () => {
      if (this.readyAll.checked) {
        this.readyDisplay.value = `Все`;
      } else {
        this.readyDisplay.value = this.readySelect.value;
      }
    });
  }

  reset() {
    this.addListener(this.resetButton, 'click', () => {
      logger(`reset();`, this);
      this.year.selectedIndex = '0';
      this.ministry.selectedIndex = '0';
      this.territory.selectedIndex = '0';
      this.program.selectedIndex = '0';
      this.readyDisplay.value = 'Все';
      this.readySelect.value = 50;
      this.readyAll.checked = true;
      addressBarText();
    });
  }

  apply() {
    this.addListener(this.applyButton, 'click', () => {
      logger(`apply();`, this);
    });
  }

  fill(year, ministry, territory, program) {
    logger(`fill();`, this);

    year.forEach((el) => {
      const option = document.createElement('option');
      option.value = el.name;
      option.textContent = el.name;
      this.year.appendChild(option);
    });
    ministry.forEach((el) => {
      const option = document.createElement('option');
      option.value = el.code;
      option.textContent = el.name;
      this.ministry.appendChild(option);
    });
    territory.forEach((el) => {
      const option = document.createElement('option');
      option.value = el.code;
      option.textContent = el.name;
      this.territory.appendChild(option);
    });
    program.forEach((el) => {
      const option = document.createElement('option');
      option.value = el.code;
      option.textContent = el.name;
      this.program.appendChild(option);
    });
  }

  test() {
    logger(this.box, this);
    logger(this.year, this);
    logger(this.ministry, this);
    logger(this.territory, this);
    logger(this.program, this);
    logger(this.readyDisplay, this);
    logger(this.readySelect, this);
    logger(this.readyAll, this);
    logger(this.applyButton, this);
    logger(this.resetButton, this);
    logger(this.searchBox, this);
    logger(this.searchInput, this);
    logger(this.searchButton, this);
  }
}
