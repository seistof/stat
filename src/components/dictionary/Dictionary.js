import {MainView} from '@core/MainView';
import {addNewWindowMinistryOrTerritory, dictionaryNode, fillMinistryOrTerritory, logger} from '@core/utils';
import {COMMENTS} from '@/index';

export class Dictionary extends MainView {
  constructor(
      dictionaryContainer,
      addNewRecord,
      dictionarySearch,
      currentData,
  ) {
    super();
    this.MINISTRY = false;
    this.TERRITORY = true;
    this.PROGRAM = false;
    this.dictionaryContainer = dictionaryContainer;
    this.addNewRecord = addNewRecord;
    this.dictionarySearch = dictionarySearch;
    this.autoSearchFn = this.autoSearch.bind(this);
    this.currentData = currentData;
    this.itemControlEdit = [];
    this.itemControlDelete = [];
    this.itemControlAddEvent = [];
    this.eventControlEdit = [];
    this.eventControlDelete = [];
    this.ministryCreateFn = this.ministryCreate.bind(this);
    this.ministryEditFn = this.ministryEdit.bind(this);
    this.ministryDeleteFn = this.ministryDelete.bind(this);
    this.ministryDeleteQueryFn = this.ministryDeleteQuery.bind(this);
    this.ministryUpdateQueryFn = this.ministryUpdateQuery.bind(this);
    this.ministryCreateQueryFn = this.ministryCreateQuery.bind(this);
    this.territoryCreateFn = this.territoryCreate.bind(this);
    this.territoryEditFn = this.territoryEdit.bind(this);
    this.territoryDeleteFn = this.territoryDelete.bind(this);
    this.territoryDeleteQueryFn = this.territoryDeleteQuery.bind(this);
    this.territoryUpdateQueryFn = this.territoryUpdateQuery.bind(this);
    this.territoryCreateQueryFn = this.territoryCreateQuery.bind(this);
    this.programCreateFn = this.programCreate.bind(this);
    this.programEditFn = this.programEdit.bind(this);
    this.programDeleteFn = this.programDelete.bind(this);
    this.programDeleteQueryFn = this.programDeleteQuery.bind(this);
    this.programUpdateQueryFn = this.programUpdateQuery.bind(this);
    this.programCreateQueryFn = this.programCreateQuery.bind(this);
    this.eventCreateFn = this.eventCreate.bind(this);
    this.eventEditFn = this.eventEdit.bind(this);
    this.eventDeleteFn = this.eventDelete.bind(this);
    this.eventDeleteQueryFn = this.eventDeleteQuery.bind(this);
    this.eventUpdateQueryFn = this.eventUpdateQuery.bind(this);
    this.eventCreateQueryFn = this.eventCreateQuery.bind(this);
    this.currentDictionaryId = '';
    this.currentEventId = '';
    this.currentDictionaryObject = ``;
    this.addEventItemFn = this.addEventItem.bind(this);
    this.addEventItemRemoveButtons = [];
    this.addEventItemList = [];
  }

  async init() {
    logger(``, false, COMMENTS);
    logger(`init();`, this, COMMENTS);
    this.MAIN.removeInactiveListeners();
    super.disableUI(true, this.navExport, this.FILTERS, this.SEARCHBOX);
    await super.enableOverlay(true);
    super.clearDisplay();
    if (this.MINISTRY) {
      super.insertElement(this.DISPLAY, dictionaryNode(this.MINISTRY, this.TERRITORY, this.PROGRAM));
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
      // console.log(this.currentData);
      fillMinistryOrTerritory(this.currentData, this.dictionaryContainer, 'ministry');
    }
    if (this.TERRITORY) {
      super.insertElement(this.DISPLAY, dictionaryNode(this.MINISTRY, this.TERRITORY, this.PROGRAM));
      this.dictionaryContainer = super.initialize('.ministry-list');
      this.addNewRecord = super.initialize('.ministry-title__add-new');
      this.dictionarySearch = super.initialize('.ministry-title__search');
      this.dictionaryContainer.innerHTML = '';
      this.currentData = [];
      try {
        const data = await super.sendQuery(this.dictionaryTerritoryURL);
        data.forEach((entry) => {
          const o = {
            id: entry.ID,
            code: entry.code,
            name: entry.name,
          };
          this.currentData.push(o);
        });
      } catch (e) {
        logger(`init(); ` + e, this, COMMENTS);
      }
      // console.log(this.currentData);
      fillMinistryOrTerritory(this.currentData, this.dictionaryContainer, 'territory');
    }
    if (this.PROGRAM) {
      super.insertElement(this.DISPLAY, dictionaryNode(this.MINISTRY, this.TERRITORY, this.PROGRAM));
      this.dictionaryContainer = super.initialize('.ministry-list');
      this.addNewRecord = super.initialize('.ministry-title__add-new');
      this.dictionarySearch = super.initialize('.ministry-title__search');
      this.dictionaryContainer.innerHTML = '';
      this.currentData = [];
      try {
        const data = await super.sendQuery(this.dictionaryProgramURL);
        // console.log(data);
        data.programList.forEach((entry) => {
          const o = {
            id: entry.ID,
            code: entry.code,
            name: entry.name,
            fromYear: entry.fromYear,
            toYear: entry.toYear,
            events: entry.events,
          };
          this.currentData.push(o);
        });
      } catch (e) {
        logger(`init(); ` + e, this, COMMENTS);
      }
      // console.log(this.currentData);
      fillMinistryOrTerritory(this.currentData, this.dictionaryContainer, 'program');
    }
    this.itemControlEdit = [];
    this.itemControlDelete = [];
    this.itemControlAddEvent = [];
    this.eventControlEdit = [];
    this.eventControlDelete = [];
    this.itemControlEdit = super.initialize('.item__control-edit', false);
    this.itemControlDelete = super.initialize('.item__control-delete', false);
    this.itemControlAddEvent = super.initialize('.item__control-add-event', false);
    this.eventControlEdit = super.initialize('.event__control-edit', false);
    this.eventControlDelete = super.initialize('.event__control-delete', false);
    this.removeListeners();
    this.addListeners();
    await super.enableOverlay(false);
    this.currentData.length === 0 ?
      super.errorMessage(this.dictionaryContainer, 'не удалось получить данные', 2) :
      logger(`Ok`, this, COMMENTS);
  }

  addListeners() {
    try {
      if (this.MINISTRY) {
        super.addListener(this.dictionarySearch, 'input', this.autoSearchFn);
        super.addListener(this.addNewRecord, 'click', this.ministryCreateFn);
        this.itemControlDelete.forEach((button) => {
          super.addListener(button, 'click', this.ministryDeleteFn);
        });
        this.itemControlEdit.forEach((button) => {
          super.addListener(button, 'click', this.ministryEditFn);
        });
      }
      if (this.TERRITORY) {
        super.addListener(this.dictionarySearch, 'input', this.autoSearchFn);
        super.addListener(this.addNewRecord, 'click', this.territoryCreateFn);
        this.itemControlDelete.forEach((button) => {
          super.addListener(button, 'click', this.territoryDeleteFn);
        });
        this.itemControlEdit.forEach((button) => {
          super.addListener(button, 'click', this.territoryEditFn);
        });
      }
      if (this.PROGRAM) {
        super.addListener(this.dictionarySearch, 'input', this.autoSearchFn);
        super.addListener(this.addNewRecord, 'click', this.programCreateFn);
        this.itemControlDelete.forEach((button) => {
          super.addListener(button, 'click', this.programDeleteFn);
        });
        this.itemControlEdit.forEach((button) => {
          super.addListener(button, 'click', this.programEditFn);
        });
        this.eventControlEdit.forEach((button) => {
          super.addListener(button, 'click', this.eventEditFn);
        });
        this.eventControlDelete.forEach((button) => {
          super.addListener(button, 'click', this.eventDeleteFn);
        });
        this.itemControlAddEvent.forEach((button) => {
          super.addListener(button, 'click', this.eventCreateFn);
        });
      }
    } catch (e) {
      logger(`addListeners(); ` + e, this, COMMENTS);
    }
  }

  removeListeners() {
    try {
      super.removeListener(this.dictionarySearch, 'input', this.autoSearchFn);
      super.removeListener(this.addNewRecord, 'click', this.ministryCreateFn);
      this.itemControlDelete.forEach((button) => {
        super.removeListener(button, 'click', this.ministryDeleteFn);
      });
      this.itemControlEdit.forEach((button) => {
        super.removeListener(button, 'click', this.ministryEditFn);
      });
      super.removeListener(this.addNewRecord, 'click', this.territoryCreateFn);
      this.itemControlDelete.forEach((button) => {
        super.removeListener(button, 'click', this.territoryDeleteFn);
      });
      this.itemControlEdit.forEach((button) => {
        super.removeListener(button, 'click', this.territoryEditFn);
      });
      super.removeListener(this.addNewRecord, 'click', this.programCreateFn);
      this.itemControlDelete.forEach((button) => {
        super.removeListener(button, 'click', this.programDeleteFn);
      });
      this.itemControlEdit.forEach((button) => {
        super.removeListener(button, 'click', this.programEditFn);
      });
      this.eventControlEdit.forEach((button) => {
        super.removeListener(button, 'click', this.eventEditFn);
      });
      this.eventControlDelete.forEach((button) => {
        super.removeListener(button, 'click', this.eventDeleteFn);
      });
      this.itemControlAddEvent.forEach((button) => {
        super.removeListener(button, 'click', this.eventCreateFn);
      });
      logger(`>>> Listeners removed.`, this, COMMENTS);
    } catch (e) {
      logger(`>>> No listeners detected. ` + e, this, COMMENTS);
    }
  }

  autoSearch() {
    const str = this.dictionarySearch.value;
    this.currentData.forEach((entry, i) => {
      if (str !== '') {
        if (entry.name.toLowerCase().includes(str.toLowerCase()) ||
          entry.code.toString().includes(str)) {
          document.querySelector(`.item-${i}`).style.display = 'flex';
        } else {
          document.querySelector(`.item-${i}`).style.display = 'none';
        }
      } else {
        document.querySelector(`.item-${i}`).style.display = 'flex';
      }
    });
    if (this.dictionaryContainer.scrollHeight > this.dictionaryContainer.clientHeight) {
      this.dictionaryContainer.style.marginRight = '0';
    } else {
      this.dictionaryContainer.style.marginRight = '17px';
    }
  }

  async ministryCreate() {
    await super.enableOverlay(true);
    super.insertElement(this.BODY, addNewWindowMinistryOrTerritory(this.MINISTRY, this.TERRITORY, this.PROGRAM));
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
    await super.enableOverlay(true);
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
    super.insertElement(this.BODY, warningBox);
    const deleteButton = super.initialize('.delete-warning-box__ok');
    const cancelButton = super.initialize('.delete-warning-box__cancel');
    this.currentDictionaryId = this.currentData[parseInt(e.target.dataset.index)].id;
    console.log(this.currentDictionaryId);
    console.log(deleteButton);
    console.log(cancelButton);
    super.addListener(deleteButton, 'click', this.ministryDeleteQueryFn);
    super.addListener(cancelButton, 'click', () => {
      super.removeListener(deleteButton, 'click', this.ministryDeleteQueryFn);
      warningBox.remove();
      super.enableOverlay(false);
    }, true);
    cancelButton.addEventListener('click', () => {
      super.removeListener(deleteButton, 'click', this.ministryDeleteQueryFn);
      warningBox.remove();
      super.enableOverlay(false);
    });
  }

  async ministryEdit(e) {
    logger(`ministryEdit();`, this, COMMENTS);
    await super.enableOverlay(true);
    this.currentDictionaryId = parseInt(this.currentData[e.target.dataset.index].id);
    super.insertElement(this.BODY, addNewWindowMinistryOrTerritory(this.MINISTRY, this.TERRITORY, this.PROGRAM));
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
    logger(`ministryCreateQuery();`, this, COMMENTS);
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
        logger(`ministryCreateQuery(); status: ${response.status}`, this, COMMENTS);
      } catch (e) {
        logger(`ministryCreateQuery(); ` + e, this, COMMENTS);
      }
    } else {
      super.errorMessage(name, 'некоторые поля пусты либо заполнены неверно', 1.5);
    }
  }

  async territoryCreate() {
    logger(`territoryCreate();`, this, COMMENTS);
    await super.enableOverlay(true);
    super.insertElement(this.BODY, addNewWindowMinistryOrTerritory(this.MINISTRY, this.TERRITORY, this.PROGRAM));
    const save = super.initialize('.buttons-save');
    const cancel = super.initialize('.buttons-cancel');
    super.addListener(save, 'click', this.territoryCreateQueryFn);
    super.addListener(cancel, 'click', async () => {
      logger(`cancel();`, this, COMMENTS);
      super.removeListener(save, 'click', this.territoryCreateQueryFn);
      document.querySelector('.add-new-window').remove();
      await super.enableOverlay(false);
    }, true);
  }

  async territoryDelete(e) {
    await this.enableOverlay(true);
    logger(`territoryDelete();`, this, COMMENTS);
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
    super.insertElement(this.BODY, warningBox);
    const deleteButton = super.initialize('.delete-warning-box__ok');
    const cancelButton = super.initialize('.delete-warning-box__cancel');
    this.currentDictionaryId = this.currentData[parseInt(e.target.dataset.index)].id;
    console.log(this.currentDictionaryId);
    super.addListener(deleteButton, 'click', this.territoryDeleteQueryFn);
    super.addListener(cancelButton, 'click', () => {
      super.removeListener(deleteButton, 'click', this.territoryDeleteQueryFn);
      warningBox.remove();
      super.enableOverlay(false);
    }, true);
  }

  async territoryEdit(e) {
    logger(`territoryEdit();`, this, COMMENTS);
    await super.enableOverlay(true);
    this.currentDictionaryId = parseInt(this.currentData[e.target.dataset.index].id);
    super.insertElement(this.BODY, addNewWindowMinistryOrTerritory(this.MINISTRY, this.TERRITORY, this.PROGRAM));
    const title = super.initialize('.add-new-title');
    const name = super.initialize('.add-new-window .name-value');
    const code = super.initialize('.add-new-window .code-value');
    console.log(this.currentData[e.target.dataset.index]);
    title.textContent = 'Редактирование записи';
    name.value = this.currentData[e.target.dataset.index].name;
    code.value = this.currentData[e.target.dataset.index].code;
    const save = super.initialize('.buttons-save');
    const cancel = super.initialize('.buttons-cancel');
    super.addListener(save, 'click', this.territoryUpdateQueryFn);
    super.addListener(cancel, 'click', async () => {
      logger(`cancel();`, this, COMMENTS);
      super.removeListener(save, 'click', this.territoryUpdateQueryFn);
      document.querySelector('.add-new-window').remove();
      await super.enableOverlay(false);
    }, true);
  }

  async territoryDeleteQuery(e) {
    logger(`territoryDeleteQuery();`, this, COMMENTS);
    try {
      const body = `
      {
        "toAdd": [],
        "toUpdate": [],
        "toDelete": [${this.currentDictionaryId}]
      }
      `;
      const response = await fetch(this.serverURL + this.dictionaryTerritoryURL, {
        method: 'PUT',
        body: body,
      });
      if (response.status < 200 || response.status >= 300) {
        super.errorMessage(e.target, 'запись не может быть удалена, пока есть объекты ссылающиеся на нее', 2);
      } else {
        this.currentDictionaryId = '';
        document.querySelector('.delete-warning-box__cancel').click();
        this.MAIN.dicTerritory.click();
      }
      logger(`territoryDeleteQuery(); status: ${response.status}`, this, COMMENTS);
    } catch (e) {
      logger(`territoryDeleteQuery(); ` + e, this, COMMENTS);
    }
  }

  async territoryUpdateQuery(e) {
    logger(`territoryUpdateQuery();`, this, COMMENTS);
    const name = super.initialize('.add-new-window .name-value');
    const code = super.initialize('.add-new-window .code-value');
    if (this.validateForm(name, null, null, code)) {
      try {
        this.currentDictionaryObject = `
    {
      "ID": ${this.currentDictionaryId},
       "code": ${JSON.stringify(code.value)},
       "name": ${JSON.stringify(name.value)}
    }`;
        console.log(this.currentDictionaryObject);
        const body = `
      {
        "toAdd": [],
        "toUpdate": [${this.currentDictionaryObject}],
        "toDelete": []
      }
      `;
        const response = await fetch(this.serverURL + this.dictionaryTerritoryURL, {
          method: 'PUT',
          body: body,
        });
        if (response.status < 200 || response.status >= 300) {
          super.errorMessage(e.target, 'ошибка', 2);
        } else {
          this.currentDictionaryObject = ``;
          document.querySelector('.buttons-cancel').click();
          this.MAIN.dicTerritory.click();
        }
        logger(`territoryUpdateQuery(); status: ${response.status}`, this, COMMENTS);
      } catch (e) {
        logger(`territoryUpdateQuery(); ` + e, this, COMMENTS);
      }
    } else {
      super.errorMessage(name, 'некоторые поля пусты либо заполнены неверно', 1.5);
    }
  }

  async territoryCreateQuery(e) {
    logger(`territoryCreateQuery();`, this, COMMENTS);
    const name = super.initialize('.add-new-window .name-value');
    const code = super.initialize('.add-new-window .code-value');
    if (this.validateForm(name, null, null, code)) {
      try {
        this.currentDictionaryObject = `
    {
      "code": ${JSON.stringify(code.value)},
      "name": ${JSON.stringify(name.value)}
    }`;
        console.log(this.currentDictionaryObject);
        const body = `
      {
        "toAdd": [${this.currentDictionaryObject}],
        "toUpdate": [],
        "toDelete": []
      }
      `;
        const response = await fetch(this.serverURL + this.dictionaryTerritoryURL, {
          method: 'PUT',
          body: body,
        });
        if (response.status < 200 || response.status >= 300) {
          super.errorMessage(e.target, 'ошибка', 2);
        } else {
          this.currentDictionaryObject = ``;
          document.querySelector('.buttons-cancel').click();
          this.MAIN.dicTerritory.click();
        }
        logger(`territoryCreateQuery(); status: ${response.status}`, this, COMMENTS);
      } catch (e) {
        logger(`territoryCreateQuery(); ` + e, this, COMMENTS);
      }
    } else {
      super.errorMessage(name, 'некоторые поля пусты либо заполнены неверно', 1.5);
    }
  }

  async programCreate() {
    logger(`programCreate();`, this, COMMENTS);
    await super.enableOverlay(true);
    this.addEventItemRemoveButtons = [];
    this.addEventItemList = [];
    super.insertElement(this.BODY, addNewWindowMinistryOrTerritory(this.MINISTRY, this.TERRITORY, this.PROGRAM));
    const add = super.initialize('.buttons-add');
    const save = super.initialize('.buttons-save');
    const cancel = super.initialize('.buttons-cancel');
    super.addListener(add, 'click', this.addEventItemFn);
    super.addListener(save, 'click', this.programCreateQueryFn);
    super.addListener(cancel, 'click', async () => {
      logger(`cancel();`, this, COMMENTS);
      super.removeListener(save, 'click', this.programCreateQueryFn);
      super.removeListener(add, 'click', this.addEventItemFn);
      this.addEventItemRemoveButtons.forEach((button) => {
        button.click();
      });
      document.querySelector('.add-new-window').remove();
      await super.enableOverlay(false);
    }, true);
  }

  async programDelete(e) {
    await this.enableOverlay(true);
    logger(`programDelete();`, this, COMMENTS);
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
    super.insertElement(this.BODY, warningBox);
    const deleteButton = super.initialize('.delete-warning-box__ok');
    const cancelButton = super.initialize('.delete-warning-box__cancel');
    this.currentDictionaryId = this.currentData[parseInt(e.target.dataset.index)].id;
    console.log(this.currentDictionaryId);
    super.addListener(deleteButton, 'click', this.programDeleteQueryFn);
    super.addListener(cancelButton, 'click', () => {
      super.removeListener(deleteButton, 'click', this.programDeleteQueryFn);
      warningBox.remove();
      super.enableOverlay(false);
    }, true);
  }

  async programEdit(e) {
    logger(`programEdit();`, this, COMMENTS);
    await super.enableOverlay(true);
    this.currentDictionaryId = parseInt(this.currentData[e.target.dataset.index].id);
    super.insertElement(this.BODY, addNewWindowMinistryOrTerritory(this.MINISTRY, this.TERRITORY, this.PROGRAM));
    const title = super.initialize('.add-new-title');
    const name = super.initialize('.add-new-window .name-value');
    const yearFrom = super.initialize('.add-new-window .year-from');
    const yearTo = super.initialize('.add-new-window .year-to');
    const code = super.initialize('.add-new-window .code-value');
    console.log(this.currentData[e.target.dataset.index]);
    title.textContent = 'Редактирование записи';
    name.value = this.currentData[e.target.dataset.index].name;
    yearFrom.value = this.currentData[e.target.dataset.index].fromYear;
    yearTo.value = this.currentData[e.target.dataset.index].toYear;
    code.value = this.currentData[e.target.dataset.index].code;
    super.initialize('.buttons-add').style.display = 'none';
    const save = super.initialize('.buttons-save');
    const cancel = super.initialize('.buttons-cancel');
    // super.addListener(add, 'click', this.addEventItemFn);
    super.addListener(save, 'click', this.programUpdateQueryFn);
    super.addListener(cancel, 'click', async () => {
      logger(`cancel();`, this, COMMENTS);
      super.removeListener(save, 'click', this.programUpdateQueryFn);
      // super.removeListener(add, 'click', this.addEventItemFn);
      document.querySelector('.add-new-window').remove();
      await super.enableOverlay(false);
    }, true);
  }

  async programDeleteQuery(e) {
    logger(`programDeleteQuery();`, this, COMMENTS);
    try {
      const body = `
      {
        "toAdd": [],
        "toUpdate": [],
        "toDelete": [${this.currentDictionaryId}]
      }
      `;
      const response = await fetch(this.serverURL + this.dictionaryProgramURL, {
        method: 'PUT',
        body: body,
      });
      if (response.status < 200 || response.status >= 300) {
        super.errorMessage(e.target, 'запись не может быть удалена, пока есть объекты ссылающиеся на нее', 2);
      } else {
        this.currentDictionaryId = '';
        document.querySelector('.delete-warning-box__cancel').click();
        this.MAIN.dicProgram.click();
      }
      logger(`programDeleteQuery(); status: ${response.status}`, this, COMMENTS);
    } catch (e) {
      logger(`programDeleteQuery(); ` + e, this, COMMENTS);
    }
  }

  async programUpdateQuery(e) {
    logger(`programUpdateQuery();`, this, COMMENTS);
    const name = super.initialize('.add-new-window .name-value');
    const yearFrom = super.initialize('.add-new-window .year-from');
    const yearTo = super.initialize('.add-new-window .year-to');
    const code = super.initialize('.add-new-window .code-value');
    // check
    let errors = 0;
    const numbers = /^[0-9]+$/;
    name.value === '' ? name.style.background = '#a0111154' : name.style.background = 'none';
    yearFrom.value === '' ? yearFrom.style.background = '#a0111154' : yearFrom.style.background = 'none';
    yearTo.value === '' ? yearTo.style.background = '#a0111154' : yearTo.style.background = 'none';
    code.value === '' ? code.style.background = '#a0111154' : code.style.background = 'none';
    name.value === '' ? errors++ : errors;
    yearFrom.value === '' ? errors++ : errors;
    yearTo.value === '' ? errors++ : errors;
    code.value === '' ? errors++ : errors;
    !code.value.match(numbers) ? code.style.background = '#a0111154' : code.style.background = 'none';
    !code.value.match(numbers) ? errors++ : errors;
    // check
    if (errors === 0) {
      try {
        this.currentDictionaryObject =
          `{
          "ID": ${parseInt(this.currentDictionaryId)},
          "code": ${JSON.stringify(code.value)},
          "name": ${JSON.stringify(name.value)},
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
        console.log(body);
        const response = await fetch(this.serverURL + this.dictionaryProgramURL, {
          method: 'PUT',
          body: body,
        });
        if (response.status < 200 || response.status >= 300) {
          super.errorMessage(e.target, 'ошибка', 2);
        } else {
          console.log('DONE!');
          this.currentDictionaryObject = ``;
          document.querySelector('.close-button').click();
          this.MAIN.dicProgram.click();
        }
        logger(`programUpdateQuery(); status: ${response.status}`, this, COMMENTS);
      } catch (e) {
        logger(`programUpdateQuery(); ` + e, this, COMMENTS);
      }
    }
  }

  async programCreateQuery(e) {
    logger(`programCreateQuery();`, this, COMMENTS);
    const name = super.initialize('.add-new-window .name-value');
    const yearFrom = super.initialize('.add-new-window .year-from');
    const yearTo = super.initialize('.add-new-window .year-to');
    const code = super.initialize('.add-new-window .code-value');
    // get all event objects

    // check
    this.addEventItemList = super.initialize('.add-new-event-item', false);
    let errors = 0;
    const numbers = /^[0-9]+$/;
    name.value === '' ? name.style.background = '#a0111154' : name.style.background = 'none';
    yearFrom.value === '' ? yearFrom.style.background = '#a0111154' : yearFrom.style.background = 'none';
    yearTo.value === '' ? yearTo.style.background = '#a0111154' : yearTo.style.background = 'none';
    code.value === '' ? code.style.background = '#a0111154' : code.style.background = 'none';
    name.value === '' ? errors++ : errors;
    yearFrom.value === '' ? errors++ : errors;
    yearTo.value === '' ? errors++ : errors;
    code.value === '' ? errors++ : errors;
    !code.value.match(numbers) ? code.style.background = '#a0111154' : code.style.background = 'none';
    !code.value.match(numbers) ? errors++ : errors;
    this.addEventItemList.forEach((item) => {
      if (item.querySelector('.code-value').value === '' || !item.querySelector('.code-value').value.match(numbers)) {
        item.querySelector('.code-value').style.background = '#a0111154';
        errors++;
      } else {
        item.querySelector('.code-value').style.background = 'none';
      }
      if (item.querySelector('.name-value').value === '') {
        item.querySelector('.name-value').style.background = '#a0111154';
        errors++;
      } else {
        item.querySelector('.name-value').style.background = 'none';
      }
      if (item.querySelector('.short-value').value === '' || !item.querySelector('.short-value').value.match(numbers)) {
        item.querySelector('.short-value').style.background = '#a0111154';
        errors++;
      } else {
        item.querySelector('.short-value').style.background = 'none';
      }
      if (item.querySelector('.year-from').value === '') {
        item.querySelector('.year-from').style.background = '#a0111154';
        errors++;
      } else {
        item.querySelector('.year-from').style.background = 'none';
      }
      if (item.querySelector('.year-to').value === '') {
        item.querySelector('.year-to').style.background = '#a0111154';
        errors++;
      } else {
        item.querySelector('.year-to').style.background = 'none';
      }
    });
    // check
    if (errors === 0) {
      const events = [];
      console.log(this.addEventItemList);
      this.addEventItemList.forEach((item) => {
        const code = item.querySelector('.code-value').value;
        const name = item.querySelector('.name-value').value;
        const displayCode = item.querySelector('.short-value').value;
        const yearFrom = item.querySelector('.year-from').value;
        const yearTo = item.querySelector('.year-to').value;
        const obj =
          `{
        "code": ${JSON.stringify(code)},
        "name": ${JSON.stringify(name)},
        "displayCode": ${JSON.stringify(displayCode)},
        "fromYear": ${parseInt(yearFrom)},
        "toYear": ${parseInt(yearTo)}
      }`;
        events.push(obj);
      });
      console.log(events);
      try {
        this.currentDictionaryObject =
          `{
          "code": ${JSON.stringify(code.value)},
          "name": ${JSON.stringify(name.value)},
          "fromYear": ${parseInt(yearFrom.value)},
          "toYear": ${parseInt(yearTo.value)},
          "events": [${events}]
        }`;
        console.log(this.currentDictionaryObject);
        const body = `
            {
              "toAdd": [${this.currentDictionaryObject}],
              "toUpdate": [],
              "toDelete": []
            }
            `;
        console.log(this.serverURL);
        console.log(this.dictionaryProgramURL);
        console.log(body);
        const response = await fetch(this.serverURL + this.dictionaryProgramURL, {
          method: 'PUT',
          body: body,
        });
        if (response.status < 200 || response.status >= 300) {
          super.errorMessage(e.target, 'ошибка', 2);
        } else {
          console.log('DONE!');
          this.currentDictionaryObject = ``;
          document.querySelector('.close-button').click();
          this.MAIN.dicProgram.click();
        }
        logger(`programCreateQuery(); status: ${response.status}`, this, COMMENTS);
      } catch (e) {
        logger(`programCreateQuery(); ` + e, this, COMMENTS);
      }
    }
  }

  async eventCreate(e) {
    logger(`programCreate();`, this, COMMENTS);
    await super.enableOverlay(true);
    this.currentDictionaryId = this.currentData[e.target.dataset.index].id;
    super.insertElement(this.BODY, addNewWindowMinistryOrTerritory(this.MINISTRY, this.TERRITORY, this.PROGRAM));
    const save = super.initialize('.buttons-save');
    const cancel = super.initialize('.buttons-cancel');
    const shortBox = document.createElement('div');
    const shortTitle = document.createElement('div');
    const shortValue = document.createElement('input');
    shortBox.classList.add('short-box', 'add-new-data-box');
    shortTitle.className = 'short-title';
    shortValue.classList.add('display-code', 'short-value');
    shortTitle.textContent = 'Код для УК:';
    shortValue.type = 'text';
    shortBox.appendChild(shortTitle);
    shortBox.appendChild(shortValue);
    super.initialize('.add-new-data').appendChild(shortBox);
    super.initialize('.buttons-add').style.display = 'none';
    super.addListener(save, 'click', this.eventCreateQueryFn);
    super.addListener(cancel, 'click', async () => {
      logger(`cancel();`, this, COMMENTS);
      super.removeListener(save, 'click', this.eventCreateQueryFn);
      document.querySelector('.add-new-window').remove();
      await super.enableOverlay(false);
    }, true);
  }

  async eventDelete(e) {
    await this.enableOverlay(true);
    logger(`programDelete();`, this, COMMENTS);
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
    super.insertElement(this.BODY, warningBox);
    const deleteButton = super.initialize('.delete-warning-box__ok');
    const cancelButton = super.initialize('.delete-warning-box__cancel');
    this.currentEventId = this.currentData[parseInt(e.target.dataset.mainIndex)].events[e.target.dataset.index].id;
    super.addListener(deleteButton, 'click', this.eventDeleteQueryFn);
    super.addListener(cancelButton, 'click', () => {
      super.removeListener(deleteButton, 'click', this.eventDeleteQueryFn);
      warningBox.remove();
      super.enableOverlay(false);
    }, true);
  }

  async eventEdit(e) {
    logger(`eventEdit();`, this, COMMENTS);
    await super.enableOverlay(true);
    this.currentDictionaryId = parseInt(this.currentData[e.target.dataset.mainIndex].id);
    this.currentEventId = this.currentData[parseInt(e.target.dataset.mainIndex)].events[e.target.dataset.index].id;
    super.insertElement(this.BODY, addNewWindowMinistryOrTerritory(this.MINISTRY, this.TERRITORY, this.PROGRAM));
    const shortBox = document.createElement('div');
    const shortTitle = document.createElement('div');
    const shortValue = document.createElement('input');
    shortBox.classList.add('short-box', 'add-new-data-box');
    shortTitle.className = 'short-title';
    shortValue.classList.add('display-code', 'short-value');
    shortTitle.textContent = 'Код для УК:';
    shortValue.type = 'text';
    shortBox.appendChild(shortTitle);
    shortBox.appendChild(shortValue);
    super.initialize('.add-new-data').appendChild(shortBox);
    super.initialize('.buttons-add').style.display = 'none';
    const name = super.initialize('.add-new-window .name-value');
    const short = super.initialize('.add-new-window .short-value');
    const yearFrom = super.initialize('.add-new-window .year-from');
    const yearTo = super.initialize('.add-new-window .year-to');
    const code = super.initialize('.add-new-window .code-value');
    name.value = this.currentData[e.target.dataset.mainIndex].events[e.target.dataset.index].name;
    short.value = this.currentData[e.target.dataset.mainIndex].events[e.target.dataset.index].display_code;
    yearFrom.value = this.currentData[e.target.dataset.mainIndex].events[e.target.dataset.index].from_year;
    yearTo.value = this.currentData[e.target.dataset.mainIndex].events[e.target.dataset.index].to_year;
    code.value = this.currentData[e.target.dataset.mainIndex].events[e.target.dataset.index].code;
    const save = super.initialize('.buttons-save');
    const cancel = super.initialize('.buttons-cancel');
    super.addListener(save, 'click', this.eventUpdateQueryFn);
    super.addListener(cancel, 'click', async () => {
      logger(`cancel();`, this, COMMENTS);
      super.removeListener(save, 'click', this.eventUpdateQueryFn);
      document.querySelector('.add-new-window').remove();
      await super.enableOverlay(false);
    }, true);
  }

  async eventDeleteQuery(e) {
    logger(`programDeleteQuery();`, this, COMMENTS);
    try {
      const body = `
      {
        "toAdd": [],
        "toUpdate": [],
        "toDelete": [${this.currentEventId}]
      }
      `;
      const response = await fetch(this.serverURL + this.dictionaryEventURL, {
        method: 'PUT',
        body: body,
      });
      if (response.status < 200 || response.status >= 300) {
        super.errorMessage(e.target, 'запись не может быть удалена, пока есть объекты ссылающиеся на нее', 2);
      } else {
        this.currentDictionaryId = '';
        this.currentEventId = '';
        document.querySelector('.delete-warning-box__cancel').click();
        this.MAIN.dicProgram.click();
      }
      logger(`programDeleteQuery(); status: ${response.status}`, this, COMMENTS);
    } catch (e) {
      logger(`programDeleteQuery(); ` + e, this, COMMENTS);
    }
  }

  async eventUpdateQuery(e) {
    logger(`eventUpdateQuery();`, this, COMMENTS);
    const name = super.initialize('.add-new-window .name-value');
    const yearFrom = super.initialize('.add-new-window .year-from');
    const yearTo = super.initialize('.add-new-window .year-to');
    const code = super.initialize('.add-new-window .code-value');
    const displayCode = super.initialize('.add-new-window .short-value');
    // get all event objects
    // check
    const numbers = /^[0-9]+$/;
    let errors = 0;
    name.value === '' ? name.style.background = '#a0111154' : name.style.background = 'none';
    yearFrom.value === '' ? yearFrom.style.background = '#a0111154' : yearFrom.style.background = 'none';
    yearTo.value === '' ? yearTo.style.background = '#a0111154' : yearTo.style.background = 'none';
    (!code.value.match(numbers) || code.value === '') ?
      code.style.background = '#a0111154' :
      code.style.background = 'none';
    (!displayCode.value.match(numbers) || displayCode.value === '') ?
      displayCode.style.background = '#a0111154' :
      displayCode.style.background = 'none';
    name.value === '' ? errors++ : errors;
    yearFrom.value === '' ? errors++ : errors;
    yearTo.value === '' ? errors++ : errors;
    (!code.value.match(numbers) || code.value === '') ? errors++ : errors;
    (!displayCode.value.match(numbers) || displayCode.value === '') ? errors++ : errors;
    // check
    if (errors === 0) {
      try {
        this.currentDictionaryObject =
          `{
          "ID": ${parseInt(this.currentEventId)},
          "code": ${JSON.stringify(code.value)},
          "name": ${JSON.stringify(name.value)},
          "displayCode": ${JSON.stringify(displayCode.value)},
          "fromYear": ${parseInt(yearFrom.value)},
          "toYear": ${parseInt(yearTo.value)},
          "programID": ${parseInt(this.currentDictionaryId)}
        }`;
        console.log(this.currentDictionaryObject);
        const body = `
            {
              "toAdd": [],
              "toUpdate": [${this.currentDictionaryObject}],
              "toDelete": []
            }
            `;
        const response = await fetch(this.serverURL + this.dictionaryEventURL, {
          method: 'PUT',
          body: body,
        });
        if (response.status < 200 || response.status >= 300) {
          super.errorMessage(e.target, 'ошибка', 2);
        } else {
          console.log('DONE!');
          this.currentDictionaryObject = ``;
          this.currentEventId = '';
          document.querySelector('.close-button').click();
          this.MAIN.dicProgram.click();
        }
        logger(`eventUpdateQuery(); status: ${response.status}`, this, COMMENTS);
      } catch (e) {
        logger(`eventUpdateQuery(); ` + e, this, COMMENTS);
      }
    }
  }

  async eventCreateQuery(e) {
    logger(`eventCreateQuery();`, this, COMMENTS);
    const name = super.initialize('.add-new-window .name-value');
    const yearFrom = super.initialize('.add-new-window .year-from');
    const yearTo = super.initialize('.add-new-window .year-to');
    const code = super.initialize('.add-new-window .code-value');
    const displayCode = super.initialize('.add-new-window .short-value');
    // get all event objects
    // check
    const numbers = /^[0-9]+$/;
    let errors = 0;
    name.value === '' ? name.style.background = '#a0111154' : name.style.background = 'none';
    yearFrom.value === '' ? yearFrom.style.background = '#a0111154' : yearFrom.style.background = 'none';
    yearTo.value === '' ? yearTo.style.background = '#a0111154' : yearTo.style.background = 'none';
    (!code.value.match(numbers) || code.value === '') ?
      code.style.background = '#a0111154' :
      code.style.background = 'none';
    (!displayCode.value.match(numbers) || displayCode.value === '') ?
      displayCode.style.background = '#a0111154' :
      displayCode.style.background = 'none';
    name.value === '' ? errors++ : errors;
    yearFrom.value === '' ? errors++ : errors;
    yearTo.value === '' ? errors++ : errors;
    (!code.value.match(numbers) || code.value === '') ? errors++ : errors;
    (!displayCode.value.match(numbers) || displayCode.value === '') ? errors++ : errors;
    // check
    if (errors === 0) {
      try {
        this.currentDictionaryObject =
          `{
          "code": ${JSON.stringify(code.value)},
          "name": ${JSON.stringify(name.value)},
          "displayCode": ${JSON.stringify(displayCode.value)},
          "fromYear": ${parseInt(yearFrom.value)},
          "toYear": ${parseInt(yearTo.value)},
          "programID": ${parseInt(this.currentDictionaryId)}
        }`;
        console.log(this.currentDictionaryObject);
        const body = `
            {
              "toAdd": [${this.currentDictionaryObject}],
              "toUpdate": [],
              "toDelete": []
            }
            `;
        const response = await fetch(this.serverURL + this.dictionaryEventURL, {
          method: 'PUT',
          body: body,
        });
        if (response.status < 200 || response.status >= 300) {
          super.errorMessage(e.target, 'ошибка', 2);
        } else {
          console.log('DONE!');
          this.currentDictionaryObject = ``;
          document.querySelector('.close-button').click();
          this.MAIN.dicProgram.click();
        }
        logger(`eventCreateQuery(); status: ${response.status}`, this, COMMENTS);
      } catch (e) {
        logger(`eventCreateQuery(); ` + e, this, COMMENTS);
      }
    }
  }

  validateForm(name, yearFrom = null, yearTo = null, code) {
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
    if (yearFrom !== null && yearTo !== null) {
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

  addEventItem() {
    const eventBox = super.initialize('.add-new-window-event-box');

    const data = document.createElement('div');
    const nameBox = document.createElement('div');
    const nameTitle = document.createElement('div');
    const nameValue = document.createElement('textarea');
    const shortBox = document.createElement('div');
    const shortTitle = document.createElement('div');
    const shortValue = document.createElement('input');
    const yearBox = document.createElement('div');
    const yearTitle = document.createElement('div');
    const yearFrom = document.createElement('input');
    const yearDiv = document.createElement('div');
    const yearTo = document.createElement('input');
    const codeBox = document.createElement('div');
    const codeTitle = document.createElement('div');
    const codeValue = document.createElement('input');
    const buttonsBox = document.createElement('div');
    const buttonsCancel = document.createElement('div');

    data.className = 'add-new-data add-new-event-item';
    nameBox.classList.add('name-box', 'add-new-data-box');
    nameTitle.className = 'name-title';
    nameValue.className = 'name-value';
    shortBox.classList.add('short-box', 'add-new-data-box');
    shortTitle.className = 'short-title';
    shortValue.className = 'short-value';
    yearBox.classList.add('year-box', 'add-new-data-box');
    yearTitle.className = 'year-title';
    yearFrom.className = 'year-from';
    yearDiv.className = 'year-div';
    yearTo.className = 'year-to';
    codeBox.classList.add('code-box', 'add-new-data-box');
    codeTitle.className = 'code-title';
    codeValue.className = 'code-value';
    buttonsBox.className = 'buttons-box';
    buttonsCancel.classList.add('buttons-cancel', 'button');
    eventBox.className = 'add-new-window-event-box';

    nameTitle.textContent = 'Название:';
    shortTitle.textContent = 'Код для УК:';
    yearTitle.textContent = 'Год:';
    codeTitle.textContent = 'Код:';
    buttonsCancel.textContent = 'Удалить';
    yearDiv.textContent = '-';
    shortValue.type = 'text';
    yearFrom.type = 'number';
    yearFrom.min = '2011';
    yearFrom.max = '2100';
    yearTo.type = 'number';
    yearTo.min = '2011';
    yearTo.max = '2100';

    data.appendChild(nameBox);
    data.appendChild(yearBox);
    data.appendChild(shortBox);
    data.appendChild(codeBox);
    data.appendChild(buttonsBox);
    nameBox.appendChild(nameTitle);
    nameBox.appendChild(nameValue);
    shortBox.appendChild(shortTitle);
    shortBox.appendChild(shortValue);
    yearBox.appendChild(yearTitle);
    yearBox.appendChild(yearFrom);
    yearBox.appendChild(yearDiv);
    yearBox.appendChild(yearTo);
    codeBox.appendChild(codeTitle);
    codeBox.appendChild(codeValue);
    buttonsBox.appendChild(buttonsCancel);

    eventBox.appendChild(data);
    this.addEventItemRemoveButtons.push(buttonsCancel);
    super.addListener(buttonsCancel, 'click', () => {
      data.remove();
    }, true);
  }
}
