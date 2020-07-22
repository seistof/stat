import {MainView} from '@core/MainView';
import {initialize, logger, toggleObjectBody} from '@core/utils';

const COMMENTS = false;

export class HierarchyView extends MainView {
  constructor(list, details, editButton, toggleButton, objectContainer) {
    super();
    this.list = list;
    this.details = details;
    this.editButton = editButton;
    this.toggleButton = toggleButton;
    this.objectContainer = objectContainer;
    this.listeners = [];
  }

  initializeToggleButtons() {
    logger(`initializeToggleButtons();`, false, COMMENTS);
    return initialize('.hierarchy-view__object-dropdown', false);
  }

  initializeDetailsButtons() {
    logger(`initializeDetailsButtons();`, false, COMMENTS);
    return initialize('.hierarchy-view__object-details', false);
  }

  initializeEditButtons() {
    logger(`initializeEditButtons();`, false, COMMENTS);
    return initialize('.hierarchy-view__object-edit', false);
  }

  watchToggle(toggleArray) {
    logger(`watchToggle();`, this, COMMENTS);
    toggleArray.forEach((entry) => {
      // this.addListener(entry, 'click', () => {
      //   logger(`showObjectBody();`);
      //   if (entry.parentElement.parentElement.parentElement.querySelector(
      //       '.hierarchy-view__object-body').style.display === 'none') {
      //     entry.parentElement.parentElement.parentElement.querySelector(
      //         '.hierarchy-view__object-body').style.display = 'block';
      //     entry.style.transform = 'rotate(180deg)';
      //   } else {
      //     entry.parentElement.parentElement.parentElement.querySelector(
      //         '.hierarchy-view__object-body').style.display = 'none';
      //     entry.style.transform = 'rotate(0deg)';
      //   }
      // });
      // this.listeners.push(this.addListener(entry, 'click', () => toggleObjectBody(entry)));
      this.listeners.push(this.addListener(entry, 'click', toggleObjectBody));
    });
  }

  removeToggle(toggleArray) {
    logger(`removeToggle();`, this, COMMENTS);
    toggleArray.forEach((entry) => {
      // this.removeListener(entry, 'click', () => {
      //   logger(`showObjectBody();`);
      //   if (entry.parentElement.parentElement.parentElement.querySelector(
      //       '.hierarchy-view__object-body').style.display === 'none') {
      //     entry.parentElement.parentElement.parentElement.querySelector(
      //         '.hierarchy-view__object-body').style.display = 'block';
      //     entry.style.transform = 'rotate(180deg)';
      //   } else {
      //     entry.parentElement.parentElement.parentElement.querySelector(
      //         '.hierarchy-view__object-body').style.display = 'none';
      //     entry.style.transform = 'rotate(0deg)';
      //   }
      // });
      // this.removeListener(entry, 'click', () => toggleObjectBody(entry));
      this.removeListener(entry, 'click', toggleObjectBody);
    });
  }

  showDetails() {
    logger(`showDetails();`, this, COMMENTS);
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
                       >${el.name}<div class="tooltip">${el.name}</div></div>
                </div>
                <div class="hierarchy-view__object-control">
                  <div class="hierarchy-view__object-counter">
                    <span>Записей:</span>
                    <span>${entry.length}</span>
                  </div>
                  <button class="hierarchy-view__object-dropdown button" style="display: none">
                    <span class="material-icons">expand_more</span>
                  </button>
                  <div class="hierarchy-view__object-buttons">
                    <button class="hierarchy-view__object-details button">Подробнее</button>
                    <button class="hierarchy-view__object-edit button">Изменить</button>
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
                  <button class="hierarchy-view__object-dropdown button">
                    <span class="material-icons">expand_more</span>
                  </button>
                  <div class="hierarchy-view__object-buttons">
                    <button class="hierarchy-view__object-details button">Подробнее</button>
                    <button class="hierarchy-view__object-edit button">Изменить</button>
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
