import {MainView} from '@core/MainView';
import {addressBarText, logger} from '@core/utils';

const COMMENTS = true;

export class FilterView extends MainView {
  constructor(box, menuBox, year, ministry, territory, program, readyDisplay,
      readySelect,
      readyAll, apply, reset, searchBox, searchUseFilters, searchInput,
      search, hierarchyButton, linkerButton, uploadButton, excelButton,
      exitButton, overlay) {
    super();
    this.box = box;
    this.menuBox = menuBox;
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
    this.searchUseFilters = searchUseFilters;
    this.searchInput = searchInput;
    this.searchButton = search;
    this.hierarchyButton = hierarchyButton;
    this.linkerButton = linkerButton;
    this.uploadButton = uploadButton;
    this.excelButton = excelButton;
    this.exitButton = exitButton;
    this.overlay = overlay;
  }

  menuEnabled(mode = 'auto') {
    logger(`filterEnabled();`, this, COMMENTS);
    this.menuBox.style['pointer-events'] = `${mode}`;
  }

  searchEnabled(mode = 'auto') {
    logger(`searchEnabled();`, this, COMMENTS);
    this.searchBox.style['pointer-events'] = `${mode}`;
  }

  async enableOverlay(display) {
    logger(`enableOverlay()`, this, COMMENTS);
    const overlay = document.createElement('div');
    const indicator = document.createElement('div');
    overlay.classList.add('overlay');
    indicator.classList.add('overlay__indicator');
    indicator.innerHTML = `<span class="material-icons">autorenew</span>`;
    overlay.appendChild(indicator);
    this.menuEnabled('none');
    this.searchEnabled('none');
    this.overlay = overlay;
    display.appendChild(overlay);
  }

  async disableOverlay(display) {
    logger(`disableOverlay()`, this, COMMENTS);
    setTimeout(async () => {
      display.removeChild(this.overlay);
      this.menuEnabled();
      this.searchEnabled();
    }, 500);
  }

  watchReadyFilter() {
    logger(`watchReadyFilter();`, this, COMMENTS);
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
      logger(`reset();`, this, COMMENTS);
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
      logger(`apply();`, this, COMMENTS);
      // should return data to fill hierarchy or linker
    });
  }

  search() {
    this.addListener(this.searchButton, 'click', () => {
      logger(`search();`, this, COMMENTS);
      // should return data to fill hierarchy or linker
    });
  }

  async fill(data) {
    logger(`fill();`, this, COMMENTS);
    try {
      data.year.forEach((el) => {
        const option = document.createElement('option');
        option.value = el;
        option.textContent = el;
        this.year.appendChild(option);
      });
      data.ministry.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.code;
        option.textContent = el.name.replace('Министерство', 'М.');
        this.ministry.appendChild(option);
      });
      data.territory.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.code;
        option.textContent = el.name;
        this.territory.appendChild(option);
      });
      data.program.forEach((el) => {
        const option = document.createElement('option');
        option.value = el.code;
        option.textContent = el.name.replace('Федеральная целевая программа',
            '');
        this.program.appendChild(option);
      });
    } catch (e) {
      logger(`fill(); ${e}`, this, COMMENTS);
    }
  }
}
