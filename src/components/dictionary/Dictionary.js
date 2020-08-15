import {MainView} from '@core/MainView';
import {addNewWindowMinistryOrTerritory, dictionaryNode, fillMinistryOrTerritory, logger} from '@core/utils';
import {COMMENTS} from '@/index';

export class Dictionary extends MainView {
  constructor(dictionaryContainer,
      addNewRecord,
      dictionarySearch,
      currentData
  ) {
    super();
    this.MINISTRY = true;
    this.TERRITORY = false;
    this.PROGRAM = false;
    this.dictionaryContainer = dictionaryContainer;
    this.addNewRecord = addNewRecord;
    this.dictionarySearch = dictionarySearch;
    this.autoSearchFn = this.autoSearch.bind(this);
    this.currentData = currentData;
    this.itemControlEdit = [];
    this.itemControlDelete = [];
    this.ministryCreateFn = this.ministryCreate.bind(this);
    this.itemControlEditFn = this.ministryEdit.bind(this);
    this.itemControlDeleteFn = this.ministryDelete.bind(this);
    this.ministryDeleteQueryFn = this.ministryDeleteQuery.bind(this);
    this.ministryUpdateQueryFn = this.ministryUpdateQuery.bind(this);
    this.ministryCreateQueryFn = this.ministryCreateQuery.bind(this);
    this.currentDictionaryId = '';
    this.currentDictionaryObject = ``;
  }

  async init() {
    logger(`init();`, this, COMMENTS);
    super.disableUI(true, this.navExport, this.FILTERS, this.SEARCHBOX);
    await super.enableOverlay(true);
    this.MAIN.removeInactiveListeners();
    super.clearDisplay();
    super.insertElement(this.DISPLAY, dictionaryNode(this.MINISTRY, this.TERRITORY, this.PROGRAM));
    if (this.MINISTRY) {
      this.dictionaryContainer = super.initialize('.ministry-list');
      this.addNewRecord = super.initialize('.ministry-title__add-new');
      this.dictionarySearch = super.initialize('.ministry-title__search');
      this.dictionaryContainer.innerHTML = '';
      this.currentData = [];
      try {
        const data = await super.sendQuery(this.dictionaryMinistryURL);
        data.forEach((entry) => {
          const o = {
            id: entry.ID,
            code: entry.code,
            name: entry.name,
            shortName: entry.shortName,
            fromYear: entry.fromYear,
            toYear: entry.toYear,
          };
          this.currentData.push(o);
        });
      } catch (e) {
        logger(`init(); ` + e, this, COMMENTS);
      }
      console.log(this.currentData);
      fillMinistryOrTerritory(this.currentData, this.dictionaryContainer);
    }
    this.itemControlEdit = super.initialize('.item__control-edit', false);
    this.itemControlDelete = super.initialize('.item__control-delete', false);
    this.removeListeners();
    this.addListeners();
    await super.enableOverlay(false);
  }

  addListeners() {
    try {
      super.addListener(this.dictionarySearch, 'input', this.autoSearchFn);
      super.addListener(this.addNewRecord, 'click', this.ministryCreateFn);
      this.itemControlDelete.forEach((button) => {
        super.addListener(button, 'click', this.itemControlDeleteFn);
      });
      this.itemControlEdit.forEach((button) => {
        super.addListener(button, 'click', this.itemControlEditFn);
      });
    } catch (e) {
      logger(`addListeners(); ` + e, this, COMMENTS);
    }
  }

  removeListeners() {
    try {
      super.removeListener(this.dictionarySearch, 'input', this.autoSearchFn);
      super.removeListener(this.addNewRecord, 'click', this.ministryCreateFn);
      this.itemControlDelete.forEach((button) => {
        super.removeListener(button, 'click', this.itemControlDeleteFn);
      });
      this.itemControlEdit.forEach((button) => {
        super.removeListener(button, 'click', this.itemControlEditFn);
      });
    } catch (e) {
      logger(`removeListeners(); ` + e, this, COMMENTS);
    }
  }

  autoSearch() {
    if (this.MINISTRY) {
      const str = this.dictionarySearch.value;
      this.currentData.forEach((entry, i) => {
        if (str !== '') {
          if (entry.name.toLowerCase().includes(str.toLowerCase()) ||
            entry.code.toString().includes(str) ) {
            document.querySelector(`.item-${i}`).style.display = 'flex';
          } else {
            document.querySelector(`.item-${i}`).style.display = 'none';
          }
        } else {
          document.querySelector(`.item-${i}`).style.display = 'flex';
        }
      });
    }
    if (this.dictionaryContainer.scrollHeight > this.dictionaryContainer.clientHeight) {
      this.dictionaryContainer.style.marginRight = '0';
    } else {
      this.dictionaryContainer.style.marginRight = '17px';
    }
  }

  async ministryCreate() {
    await super.enableOverlay(true);
    super.insertElement(this.DISPLAY, addNewWindowMinistryOrTerritory());
    const save = super.initialize('.buttons-save');
    const cancel = super.initialize('.buttons-cancel');
    super.addListener(save, 'click', this.ministryCreateQueryFn);
    super.addListener(cancel, 'click', async () => {
      logger(`cancel();`, this, COMMENTS);
      super.removeListener(save, 'click', this.ministryCreateQueryFn);
      document.querySelector('.add-new-window').remove();
      await super.enableOverlay(false);
    }, true);
  }

  async ministryDelete(e) {
    await this.enableOverlay(true);
    logger(`ministryDelete();`, this, COMMENTS);
    const warningBox = document.createElement('div');
    const text = document.createElement('div');
    const box = document.createElement('div');
    const del = document.createElement('button');
    const cancel = document.createElement('button');
    warningBox.className = 'delete-warning-box';
    text.className = 'delete-warning-box__name';
    box.className = 'delete-warning-box__box';
    del.className = 'delete-warning-box__ok';
    cancel.className = 'delete-warning-box__cancel';
    text.textContent = 'Удалить запись?';
    del.textContent = 'удалить';
    cancel.textContent = 'отмена';
    warningBox.appendChild(text);
    warningBox.appendChild(box);
    box.appendChild(del);
    box.appendChild(cancel);
    super.insertElement(this.DISPLAY, warningBox);
    const deleteButton = super.initialize('.delete-warning-box__ok');
    const cancelButton = super.initialize('.delete-warning-box__cancel');
    this.currentDictionaryId = this.currentData[parseInt(e.target.dataset.index)].id;
    console.log(this.currentDictionaryId);
    super.addListener(deleteButton, 'click', this.ministryDeleteQueryFn);
    super.addListener(cancelButton, 'click', () => {
      super.removeListener(deleteButton, 'click', this.ministryDeleteQueryFn);
      warningBox.remove();
      super.enableOverlay(false);
    }, true);
  }

  async ministryEdit(e) {
    logger(`ministryEdit();`, this, COMMENTS);
    await super.enableOverlay(true);
    this.currentDictionaryId = parseInt(this.currentData[e.target.dataset.index].id);
    super.insertElement(this.DISPLAY, addNewWindowMinistryOrTerritory());
    const title = super.initialize('.add-new-title');
    const name = super.initialize('.add-new-window .name-value');
    const short = super.initialize('.add-new-window .short-value');
    const yearFrom = super.initialize('.add-new-window .year-from');
    const yearTo = super.initialize('.add-new-window .year-to');
    const code = super.initialize('.add-new-window .code-value');
    console.log(this.currentData[e.target.dataset.index]);
    title.textContent = 'Редактирование записи';
    name.value = this.currentData[e.target.dataset.index].name;
    short.value = this.currentData[e.target.dataset.index].shortName;
    yearFrom.value = this.currentData[e.target.dataset.index].fromYear;
    yearTo.value = this.currentData[e.target.dataset.index].toYear;
    code.value = this.currentData[e.target.dataset.index].code;
    const save = super.initialize('.buttons-save');
    const cancel = super.initialize('.buttons-cancel');
    super.addListener(save, 'click', this.ministryUpdateQueryFn);
    super.addListener(cancel, 'click', async () => {
      logger(`cancel();`, this, COMMENTS);
      super.removeListener(save, 'click', this.ministryUpdateQueryFn);
      document.querySelector('.add-new-window').remove();
      await super.enableOverlay(false);
    }, true);
  }

  async ministryDeleteQuery(e) {
    logger(`ministryDeleteQuery();`, this, COMMENTS);
    try {
      const body = `
      {
        "toAdd": [],
        "toUpdate": [],
        "toDelete": [${this.currentDictionaryId}]
      }
      `;
      const response = await fetch(this.serverURL + this.dictionaryMinistryURL, {
        method: 'PUT',
        body: body,
      });
      if (response.status < 200 || response.status >= 300) {
        super.errorMessage(e.target, 'запись не может быть удалена, пока есть объекты ссылающиеся на нее', 2);
      } else {
        this.currentDictionaryId = '';
        document.querySelector('.delete-warning-box__cancel').click();
        this.MAIN.dicMinistry.click();
      }
      logger(`ministryDeleteQuery(); status: ${response.status}`, this, COMMENTS);
    } catch (e) {
      logger(`ministryDeleteQuery(); ` + e, this, COMMENTS);
    }
  }

  async ministryUpdateQuery(e) {
    logger(`ministryUpdateQuery();`, this, COMMENTS);
    const name = super.initialize('.add-new-window .name-value');
    const short = super.initialize('.add-new-window .short-value');
    const yearFrom = super.initialize('.add-new-window .year-from');
    const yearTo = super.initialize('.add-new-window .year-to');
    const code = super.initialize('.add-new-window .code-value');
    if (this.validateForm(name, yearFrom, yearTo, code)) {
      try {
        this.currentDictionaryObject = `
    {
      "ID": ${this.currentDictionaryId},
       "code": ${parseInt(code.value)},
       "name": ${JSON.stringify(name.value)},
       "shortName": ${JSON.stringify(short.value)},
       "fromYear": ${parseInt(yearFrom.value)},
       "toYear": ${parseInt(yearTo.value)}
    }`;
        console.log(this.currentDictionaryObject);
        const body = `
      {
        "toAdd": [],
        "toUpdate": [${this.currentDictionaryObject}],
        "toDelete": []
      }
      `;
        const response = await fetch(this.serverURL + this.dictionaryMinistryURL, {
          method: 'PUT',
          body: body,
        });
        if (response.status < 200 || response.status >= 300) {
          super.errorMessage(e.target, 'ошибка', 2);
        } else {
          this.currentDictionaryObject = ``;
          document.querySelector('.buttons-cancel').click();
          this.MAIN.dicMinistry.click();
        }
        logger(`ministryUpdateQuery(); status: ${response.status}`, this, COMMENTS);
      } catch (e) {
        logger(`ministryUpdateQuery(); ` + e, this, COMMENTS);
      }
    } else {
      super.errorMessage(name, 'некоторые поля пусты либо заполнены неверно', 1.5);
    }
  }

  async ministryCreateQuery(e) {
    logger(`ministryUpdateQuery();`, this, COMMENTS);
    const name = super.initialize('.add-new-window .name-value');
    const short = super.initialize('.add-new-window .short-value');
    const yearFrom = super.initialize('.add-new-window .year-from');
    const yearTo = super.initialize('.add-new-window .year-to');
    const code = super.initialize('.add-new-window .code-value');
    if (this.validateForm(name, yearFrom, yearTo, code)) {
      try {
        this.currentDictionaryObject = `
    {
      "code": ${parseInt(code.value)},
      "name": ${JSON.stringify(name.value)},
      "shortName": ${JSON.stringify(short.value)},
      "fromYear": ${parseInt(yearFrom.value)},
      "toYear": ${parseInt(yearTo.value)}
    }`;
        console.log(this.currentDictionaryObject);
        const body = `
      {
        "toAdd": [${this.currentDictionaryObject}],
        "toUpdate": [],
        "toDelete": []
      }
      `;
        const response = await fetch(this.serverURL + this.dictionaryMinistryURL, {
          method: 'PUT',
          body: body,
        });
        if (response.status < 200 || response.status >= 300) {
          super.errorMessage(e.target, 'ошибка', 2);
        } else {
          this.currentDictionaryObject = ``;
          document.querySelector('.buttons-cancel').click();
          this.MAIN.dicMinistry.click();
        }
        logger(`ministryUpdateQuery(); status: ${response.status}`, this, COMMENTS);
      } catch (e) {
        logger(`ministryUpdateQuery(); ` + e, this, COMMENTS);
      }
    } else {
      super.errorMessage(name, 'некоторые поля пусты либо заполнены неверно', 1.5);
    }
  }

  validateForm(name, yearFrom, yearTo, code) {
    const numbers = /^[0-9]+$/;
    let errors = 0;
    if (name.value === '') {
      console.log(name.value === '');
      name.style.background = '#a0111154';
      super.errorMessage(name, 'данное поле должно быть заполнено', 9999);
      errors++;
    } else {
      name.style.background = '#ffffff';
    }
    if (yearFrom.value === '') {
      console.log(yearFrom.value === '');
      yearFrom.style.background = '#a0111154';
      super.errorMessage(yearFrom, 'данное поле должно быть заполнено');
      errors++;
    } else {
      yearFrom.style.background = '#ffffff';
    }
    if (yearTo.value === '') {
      console.log(yearTo.value === '');
      yearTo.style.background = '#a0111154';
      super.errorMessage(yearTo, 'данное поле должно быть заполнено');
      errors++;
    } else {
      yearTo.style.background = '#ffffff';
    }
    if (!code.value.match(numbers)) {
      console.log(!code.value.match(numbers));
      code.style.background = '#a0111154';
      super.errorMessage(code, 'код должен состоять только из цифр');
      errors++;
    } else {
      code.style.background = '#ffffff';
    }
    return errors === 0;
  }
}
