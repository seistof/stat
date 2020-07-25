import {MainView} from '@/old/core/MainView';
import {
  hierarchyDetail,
  hierarchyEdit, hierarchyToggle,
  initialize,
  logger,
} from '@/old/core/utils';

const COMMENTS = true;

export class HierarchyView extends MainView {
  constructor(
      list, details, editButton, toggleButton, objectContainer, buttons,
      pages) {
    super();
    this.list = list;
    this.details = details;
    this.editButton = editButton;
    this.toggleButton = toggleButton;
    this.objectContainer = objectContainer;
    this.buttons = buttons;
    this.buttonFunctions = [hierarchyToggle, hierarchyDetail, hierarchyEdit];
    this.pages = pages;
  }

  async initHierarchyButtons() {
    logger(`initHierarchyButtons();`, this, COMMENTS);
    const toggleButtons = await initialize('.hierarchy-view__object-dropdown',
        false);
    const detailButtons = await initialize('.hierarchy-view__object-details',
        false);
    const editButtons = await initialize('.hierarchy-view__object-edit', false);
    return [toggleButtons, detailButtons, editButtons];
  }

  addButtonListeners(buttonsArray) {
    logger(`addButtonListeners();`, this, COMMENTS);
    let index = 0;
    buttonsArray.forEach((entry) => {
      entry.forEach((button) => {
        this.addListener(button, 'click', this.buttonFunctions[index]);
      });
      index++;
    });
  }

  removeButtonListeners(buttonsArray) {
    logger(`removeButtonListeners();`, this, COMMENTS);
    let index = 0;
    buttonsArray.forEach((entry) => {
      entry.forEach((button) => {
        this.removeListener(button, 'click', this.buttonFunctions[index]);
      });
      index++;
    });
  }

  fill(data) {
    logger(`fill();`, this, COMMENTS);
    let html = ``;
    data.forEach((entry) => {
      html += ` <div class="hierarchy-view__object">`;
      entry.forEach((el) => {
        if (el === entry[0]) {
          if (entry.length === 1) {
            html += `
             <div class="hierarchy-view__object-title">
                <div class="hierarchy-view__object-data">
                  <div class="hierarchy-view__object-item hierarchy-view__object-year hierarchy-view-size-year">${el.yearData}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-read hierarchy-view-size-ready">${el.maxReadiness}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-code hierarchy-view-size-code">${el.buildCode}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-info hierarchy-view-size-info">
                       ${el.territoryName} - ${el.ministryName} - ${el.programName}
                       <div class="tooltip">${el.territoryName} <br> ${el.ministryName} <br> ${el.programName}</div>
                       </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-name hierarchy-view-size-name"
                       >${el.name}
                       <div class="tooltip">${el.name}</div></div>
                </div>
                <div class="hierarchy-view__object-control">
                  <div class="hierarchy-view__object-counter">
                    <span>Записей:</span>
                    <span>${entry.length}</span>
                  </div>
                  <span class="hierarchy-view__object-dropdown button material-icons" style="display: none">
                  expand_more
<!--                    <span class="material-icons">expand_more</span>-->
                  </span>
                  <div class="hierarchy-view__object-buttons">
                    <button class="hierarchy-view__object-details button" data-id="${el.linkedInfoID}">Подробнее</button>
                    <button class="hierarchy-view__object-edit button" data-id="${el.linkedInfoID}">Изменить</button>
                  </div>
                </div>
              </div>
             <div style="display: none" class="hierarchy-view__object-body">
            `;
          } else {
            html += `
             <div class="hierarchy-view__object-title">
                <div class="hierarchy-view__object-data">
                  <div class="hierarchy-view__object-item hierarchy-view__object-year hierarchy-view-size-year">${el.yearData}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-read hierarchy-view-size-ready">${el.maxReadiness}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-code hierarchy-view-size-code">${el.buildCode}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-info hierarchy-view-size-info">
                  ${el.territoryName} - ${el.ministryName} - ${el.programName}
                  <div class="tooltip">${el.territoryName} <br> ${el.ministryName} <br> ${el.programName}</div>
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-name hierarchy-view-size-name">
                       ${el.name}
                       <div class="tooltip">${el.name}</div>
                       </div>
                </div>
                <div class="hierarchy-view__object-control">
                  <div class="hierarchy-view__object-counter">
                    <span>Записей:</span>
                    <span>${entry.length}</span>
                  </div>
                  <span class="hierarchy-view__object-dropdown button material-icons">expand_more
<!--                    <span class="material-icons">expand_more</span>-->
                  </span>
                  <div class="hierarchy-view__object-buttons">
                    <button class="hierarchy-view__object-details button" data-id="${el.linkedInfoID}">Подробнее</button>
                    <button class="hierarchy-view__object-edit button" data-id="${el.linkedInfoID}">Изменить</button>
                  </div>
                </div>
              </div>
             <div style="display: none" class="hierarchy-view__object-body">
            `;
          }
        } else {
          html += `
          <div class="hierarchy-view__object-body-item">
                  <div class="hierarchy-view__object-item hierarchy-view__object-year hierarchy-view-size-year">${el.yearData}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-read hierarchy-view-size-ready">${el.maxReadiness}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-code hierarchy-view-size-code">${el.buildCode}
                  </div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-info hierarchy-view-size-info">
                       ${el.territoryName} - ${el.ministryName} - ${el.programName}
                       <div class="tooltip">${el.territoryName} <br> ${el.ministryName} <br> ${el.programName}</div></div>
                  <div class="hierarchy-view__object-item hierarchy-view__object-name hierarchy-view-size-name">
                  ${el.name}
                   <div class="tooltip">${el.name}</div>
                  </div>
                </div>
          `;
        }
      });
      html += `</div></div>`;
    });
    this.objectContainer.innerHTML = html;
  }
}
