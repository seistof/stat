export const baseMarkup = `
    <div class="header">
      <div class="header__left">
        <div class="header__logo-box">
          <div class="header__logo-img">
            <img src="./logo.png" alt="Logo">
          </div>
          <div class="header__logo-title">Федеральная служба государственной статистики</div>
        </div>
        <div class="header__title">Учет и анализ объектов строительства</div>
      </div>
      <div class="header__right">
        <div class="header__search-box">
          <label>
            <input class="header__search-line" placeholder="Введите запрос">
          </label>
          <button class="header__search-button button">Поиск</button>
          <div class="header__search-checkbox">Применить фильтры: 
            <input type="checkbox" class="header__search-use-filters">
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      
      <div class="menu">
        
        <div class="filter">
          
          <div class="filter__item">
            <label for="select-year">Год: </label>
            <select name="select-year" id="select-year">
              <option value="all">Все</option>
            </select>
          </div>
          
          <div class="filter__item">
            <label for="select-ministry">Министерство: </label>
            <select name="select-ministry" id="select-ministry">
              <option value="all">Все</option>
            </select>
          </div>
          
          <div class="filter__item">
            <label for="select-territory">Территория: </label>
            <select name="select-territory" id="select-territory">
              <option value="all">Все</option>
            </select>
          </div>
          
          <div class="filter__item">
            <label for="select-program">Программа: </label>
            <select name="select-program" id="select-program">
              <option value="all">Все</option>
            </select>
          </div>
          
          <div class="filter__item ">
            <div class="ready-select-box">
              <label for="select-ready">Готовность:</label>
              <label>
                <input class="select-ready-display" type="text" value="Все">
              </label>
            </div>
            <input type="range" id="select-ready" class="select-ready" max="100" min="1">
          </div>
          
          <div class="filter__item ready-select-all-box">
            <label for="select-ready-all">Показать все: </label>
            <input type="checkbox" id="select-ready-all" class="select-ready-all" checked>
          </div>
          
          <div class="filter__buttons">
            <button class="filter__button-search button">Поиск</button>
            <button class="filter__button-reset button">Сбросить</button>
          </div>
        </div>
        
        <div class="navigation">
          
          <div class="navigation__item">
            <button class="navigation__button-main button">На главную</button>
          </div>
          
          <div class="navigation__item">
            <button class="navigation__button-constructor button">Конструктор</button>
          </div>
          
          <div class="navigation__item">
            <button class="navigation__button-upload button">Загрузка</button>
          </div>
          
          <div class="navigation__item">
            <button class="navigation__button-export button">Экспорт</button>
          </div>
          
          <div class="navigation__item">
            <button class="navigation__button-exit button">Выход</button>
          </div>
        
        </div>
        
        <div class="dictionaries">
          
          <div class="dictionaries__title">Справочники</div>
          
          <div class="dictionaries__item">
            <button class="dictionaries__button-ministry button">Министерства</button>
          </div>
          
          <div class="dictionaries__item">
            <button class="dictionaries__button-territory button">Территории</button>
          </div>
          
          <div class="dictionaries__item">
            <button class="dictionaries__button-program button">Программы</button>
          </div>
        
        </div>
      
      </div>
      
      <div class="display">
      
      </div>
    </div>
    <div class="footer">
      <span class="material-icons">copyright</span>
      <span>НИИ Статистики</span>
    </div>
  `;

export function mainOverlayMarkup() {
  const overlay = document.createElement('div');
  const overlayIndicator = document.createElement('div');
  const span = document.createElement('span');
  overlay.classList.add('overlay');
  overlayIndicator.classList.add('overlay__indicator');
  span.classList.add('material-icons');
  span.textContent = 'autorenew';
  overlay.appendChild(overlayIndicator);
  overlayIndicator.appendChild(span);
  return overlay;
}

export function headerOverlayMarkup() {
  const overlay = document.createElement('div');
  overlay.classList.add('header__overlay');
  return overlay;
}

export const hierarchyDetailMarkup = `
  <div class="detail-window">
  <div class="detail-window_inner-container">
    <div class="detail-window__header">
      <div>Код стройки</div>
      <div>Стоимость стр-ва - всего</div>
      <div>commissioningProjectPower</div>
      <div>durationCommissioning</div>
      <div>factExecutedBeginningPagesBeforeJanuary1ReportYear</div>
      <div>factExecutedBeginningYearsReportingMonthInclusive</div>
      <div>factFinancedBeginningYearFederalBudget</div>
      <div>factFinancedBeginningYearsBudgetEntitiesRFBudget</div>
      <div>factFinancedBeginningYearsOtherSources</div>
      <div>factYearMonth</div>
      <div>form_ownerCode</div>
      <div>introducedBeginningConstructionUntilJanuary1ReportYear</div>
      <div>introducedBeginningYearReportingMonthInclusively</div>
      <div>investmentLimitYearEntitiesRFBudget</div>
      <div>investmentLimitYearOtherSources</div>
      <div>investmentObjectType</div>
      <div>investment_limitYearFederalBudget</div>
      <div>ministryEconomyDataLimit</div>
      <div>ministryEconomyTerm</div>
      <div>ministryListCode</div>
      <div>ministryListName</div>
      <div>name</div>
      <div>normalizedID</div>
      <div>percentageTechnicalReadiness</div>
      <div>powerAccordingMinistryEconomy</div>
      <div>powerData</div>
      <div>processingSign</div>
      <div>programLisName</div>
      <div>programListCode</div>
      <div>scheduledCommissioningYear</div>
      <div>targetCostItems</div>
      <div>taskCode</div>
      <div>territoryListCode</div>
      <div>territoryListName</div>
      <div>uniqueCode</div>
      <div>yearData</div>
      <div>year_usageCode</div>
    </div>
    <div class="detail-view__rows"></div>
  </div>
  <button class="details-window__close-button button">Закрыть</button>
</div>
`;

// export const hierarchyViewMarkup = `
//     <div class="hierarchy-view">
//         <div class="hierarchy-view-wrapper">
//           <div class="hierarchy-view__header">
//             <div class="hierarchy-view__header-item hierarchy-view__header-year hierarchy-view-size-year">Год</div>
//             <div class="hierarchy-view__header-item hierarchy-view__header-ready hierarchy-view-size-ready">Готово</div>
//             <div class="hierarchy-view__header-item hierarchy-view__header-code hierarchy-view-size-code">Код</div>
//             <div class="hierarchy-view__header-item hierarchy-view__header-info hierarchy-view-size-info">Территория,министерство, программа</div>
//             <div class="hierarchy-view__header-item hierarchy-view__header-name hierarchy-view-size-name">Название</div>
//           </div>
//           <div class="hierarchy-view__object-container">
//           </div>
//         </div>
//         <div class="pagination">
//           <div class="pagination__moveto">
//             <input type="number" class="pagination__moveto-input">
//             <button class="pagination__moveto-button button">Перейти</button>
//           </div>
//           <div class="pagination__nav">
//             <span class="pagination__nav-prev button material-icons">chevron_left
//             </span>
//             <div class="pagination__nav-display">1</div>
//             <span class="pagination__nav-next button material-icons">chevron_right
//             </span>
//           </div>
//           <div class="pagination__info">
//             <div class="pagination__info-pages">
//               <div class="pagination__info-pages-title">Страниц:</div>
//               <div class="pagination__info-pages-value">1</div>
//             </div>
//             <div class="pagination__info-objects">
//               <div class="pagination__info-objects-title">Объектов:</div>
//               <div class="pagination__info-objects-value">3</div>
//             </div>
//           </div>
//         </div>
//       </div>
// `;

export function hierarchyViewMarkup() {
  const hierarchy = document.createElement('div');
  hierarchy.classList.add('hierarchy-view');
  const hierarchyViewWrapper = document.createElement('div');
  hierarchyViewWrapper.classList.add('hierarchy-view-wrapper');
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  hierarchy.appendChild(hierarchyViewWrapper);
  hierarchy.appendChild(pagination);
  const header = document.createElement('div');
  header.classList.add('hierarchy-view__header');
  const container = document.createElement('div');
  container.classList.add('hierarchy-view__object-container');
  hierarchyViewWrapper.appendChild(header);
  hierarchyViewWrapper.appendChild(container);
  const year = document.createElement('div');
  year.classList.add('hierarchy-view__header-item',
      'hierarchy-view__header-year', 'hierarchy-view-size-year');
  const ready = document.createElement('div');
  ready.classList.add('hierarchy-view__header-item',
      'hierarchy-view__header-ready', 'hierarchy-view-size-ready');
  const code = document.createElement('div');
  code.classList.add('hierarchy-view__header-item',
      'hierarchy-view__header-code', 'hierarchy-view-size-code');
  const info = document.createElement('div');
  info.classList.add('hierarchy-view__header-item',
      'hierarchy-view__header-info', 'hierarchy-view-size-info');
  const name = document.createElement('div');
  name.classList.add('hierarchy-view__header-item',
      'hierarchy-view__header-name', 'hierarchy-view-size-name');
  year.textContent = 'Год';
  ready.textContent = 'Готово';
  code.textContent = 'Код';
  info.textContent = 'Министерство, территория, программа';
  name.textContent = 'Название';
  header.appendChild(year);
  header.appendChild(ready);
  header.appendChild(code);
  header.appendChild(info);
  header.appendChild(name);
  const moveTo = document.createElement('div');
  moveTo.classList.add('pagination__moveto');
  const nav = document.createElement('div');
  nav.classList.add('pagination__nav');
  const infoP = document.createElement('div');
  infoP.classList.add('pagination__info');
  pagination.appendChild(moveTo);
  pagination.appendChild(nav);
  pagination.appendChild(infoP);
  const moveToInput = document.createElement('input');
  moveToInput.classList.add('pagination__moveto-input');
  moveToInput.type = 'number';
  const moveToButton = document.createElement('button');
  moveToButton.classList.add('pagination__moveto-button', 'button');
  moveToButton.textContent = 'Перейти';
  moveTo.appendChild(moveToInput);
  moveTo.appendChild(moveToButton);
  const prev = document.createElement('span');
  prev.classList.add('pagination__nav-prev', 'button', 'material-icons');
  prev.textContent = 'chevron_left';
  const currentPage = document.createElement('div');
  currentPage.classList.add('pagination__nav-display');
  currentPage.textContent = '1';
  const next = document.createElement('span');
  next.classList.add('pagination__nav-next', 'button', 'material-icons');
  next.textContent = 'chevron_right';
  nav.appendChild(prev);
  nav.appendChild(currentPage);
  nav.appendChild(next);
  const totalPages = document.createElement('div');
  totalPages.classList.add('pagination__info-pages');
  const totalPagesTitle = document.createElement('div');
  totalPagesTitle.classList.add('pagination__info-pages-title');
  totalPagesTitle.textContent = 'Страниц:';
  const totalPagesValue = document.createElement('div');
  totalPagesValue.classList.add('pagination__info-pages-value');
  const totalObjects = document.createElement('div');
  totalObjects.classList.add('pagination__info-objects');
  const totalObjectsTitle = document.createElement('div');
  totalObjectsTitle.classList.add('pagination__info-objects-title');
  totalObjectsTitle.textContent = 'Объектов:';
  const totalObjectsValue = document.createElement('div');
  totalObjectsValue.classList.add('pagination__info-objects-value');
  totalPages.appendChild(totalPagesTitle);
  totalPages.appendChild(totalPagesValue);
  totalObjects.appendChild(totalObjectsTitle);
  totalObjects.appendChild(totalObjectsValue);
  infoP.appendChild(totalPages);
  infoP.appendChild(totalObjects);
  return hierarchy;
}

export const linkerMarkup = `
  <div class="linker">
        
        <div class="linker__top-container">
          
          <div class="linker__object">
            
            <div class="linker__object-title">
              <div class="linker__object-title-code linker__object-size-code">Код</div>
              <div class="linker__object-title-year linker__object-size-year">Год</div>
              <div class="linker__object-title-name linker__object-size-name">Название</div>
            </div>
            
            <div class="linker__object-box">
              
              <div class="linker__object-main">
                <div class="linker__object-main-box">
                  <div class="linker__object-main-code linker__object-size-code"></div>
                  <div class="linker__object-main-year linker__object-size-year"></div>
                  <div class="linker__object-main-name linker__object-size-name"
                       title="">
                  </div>
                </div>
                <span class="linker__object-main-select button material-icons">playlist_add_check
                  
                </span>
                <span class="linker__object-main-add button material-icons">add
                </span>
              </div>
             
              <div class="linker__object-additional-container">
                
              </div>
            
            </div>
          
          </div>
          
          <div class="linker__control">
            
            <div class="linker__control-similarity">
              <div class="linker__control-similarity-box">
                <label for="select-similarity">Совпадение:</label>
                <label>
                  <input class="select-similarity-display" type="text" value="75" max="100" min="0">
                </label>
              </div>
              <input type="range" id="select-similarity" class="select-similarity" max="100" min="0">
            </div>
            
            <div class="linker__control-buttons">
              <button class="linker__control-save button">Сохранить</button>
              <button class="linker__control-check-objects button">Проверить существующие объекты</button>
              <button class="linker__control-show-similar button">Отобразить похожие записи</button>
              <button class="linker__control-delete button">Удалить</button>
              <button class="linker__control-reset button">Сбросить</button>
              <button class="linker__control-main-page button">На главную</button>
            </div>
          
          </div>
        
        </div>
        
        <div class="linker__bottom-container">
          
          <div class="linker__list-header">
            <div class="linker__list-header-code linker__list-size-code">Код</div>
            <div class="linker__list-header-year linker__list-size-year">Год</div>
            <div class="linker__list-header-ready linker__list-size-ready">Готово</div>
            <div class="linker__list-header-ministry linker__list-size-ministry">Министерство</div>
            <div class="linker__list-header-territory linker__list-size-territory">Территория</div>
            <div class="linker__list-header-program linker__list-size-program">Программа</div>
            <div class="linker__list-header-name linker__list-size-name">Название</div>
            <div class="linker__list-header-details linker__list-size-details">Подробнее</div>
          </div>
          
          <div class="linker__list">
            <div class="linker__list-item">
              <div class="linker__list-item-code linker__list-size-code">764910</div>
              <div class="linker__list-item-year linker__list-size-year">2011</div>
              <div class="linker__list-item-ready linker__list-size-ready">73</div>
              <div class="linker__list-item-ministry linker__list-size-ministry">Не твоих
                собачьих дел <div class="tooltip">Не твоих собачьих дел</div>
              </div>
              <div class="linker__list-item-territory linker__list-size-territory">Московская
                область <div class="tooltip">Московская
                  область</div>
              </div>
              <div class="linker__list-item-program linker__list-size-program" >Программа помощи не особо нуждающимся в
                помощи гражданам стран дальнего и ближнего заруюежья<div class="tooltip">рограмма помощи не особо нуждающимся в
                  помощи гражданам стран дальнего и ближнего заруюежья</div>
              </div>
              <div class="linker__list-item-name linker__list-size-name">Обеление имени хана Батыя в
                историческом
                сознании граждан российской федерации в период с 2020 по 2024 годы <div class="tooltip">Обеление имени хана Батыя в
                  историческом
                  сознании граждан российской федерации в период с 2020 по 2024 годы</div>
              </div>
              <div class="linker__list-item-details linker__list-size-details">
                <button class="linker__list-item-details-button button">Подробнее</button>
                <button class="linker__list-item-pick-button button">Выбрать</button>
              </div>
            </div>
            <div class="linker__list-item">
              <div class="linker__list-item-code linker__list-size-code">764910</div>
              <div class="linker__list-item-year linker__list-size-year">2011</div>
              <div class="linker__list-item-ready linker__list-size-ready">73</div>
              <div class="linker__list-item-ministry linker__list-size-ministry">Не твоих
                собачьих дел <div class="tooltip">Не твоих собачьих дел</div>
              </div>
              <div class="linker__list-item-territory linker__list-size-territory">Московская
                область <div class="tooltip">Московская
                  область</div>
              </div>
              <div class="linker__list-item-program linker__list-size-program" >Программа помощи не особо нуждающимся в
                помощи гражданам стран дальнего и ближнего заруюежья<div class="tooltip">рограмма помощи не особо нуждающимся в
                  помощи гражданам стран дальнего и ближнего заруюежья</div>
              </div>
              <div class="linker__list-item-name linker__list-size-name">Обеление имени хана Батыя в
                историческом
                сознании граждан российской федерации в период с 2020 по 2024 годы <div class="tooltip">Обеление имени хана Батыя в
                  историческом
                  сознании граждан российской федерации в период с 2020 по 2024 годы</div>
              </div>
              <div class="linker__list-item-details linker__list-size-details">
                <button class="linker__list-item-details-button button">Подробнее</button>
                <button class="linker__list-item-pick-button button">Выбрать</button>
              </div>
            </div>
            <div class="linker__list-item">
              <div class="linker__list-item-code linker__list-size-code">764910</div>
              <div class="linker__list-item-year linker__list-size-year">2011</div>
              <div class="linker__list-item-ready linker__list-size-ready">73</div>
              <div class="linker__list-item-ministry linker__list-size-ministry">Не твоих
                собачьих дел <div class="tooltip">Не твоих собачьих дел</div>
              </div>
              <div class="linker__list-item-territory linker__list-size-territory">Московская
                область <div class="tooltip">Московская
                  область</div>
              </div>
              <div class="linker__list-item-program linker__list-size-program" >Программа помощи не особо нуждающимся в
                помощи гражданам стран дальнего и ближнего заруюежья<div class="tooltip">рограмма помощи не особо нуждающимся в
                  помощи гражданам стран дальнего и ближнего заруюежья</div>
              </div>
              <div class="linker__list-item-name linker__list-size-name">Обеление имени хана Батыя в
                историческом
                сознании граждан российской федерации в период с 2020 по 2024 годы <div class="tooltip">Обеление имени хана Батыя в
                  историческом
                  сознании граждан российской федерации в период с 2020 по 2024 годы</div>
              </div>
              <div class="linker__list-item-details linker__list-size-details">
                <button class="linker__list-item-details-button button">Подробнее</button>
                <button class="linker__list-item-pick-button button">Выбрать</button>
              </div>
            </div>
            <div class="linker__list-item">
              <div class="linker__list-item-code linker__list-size-code">764910</div>
              <div class="linker__list-item-year linker__list-size-year">2011</div>
              <div class="linker__list-item-ready linker__list-size-ready">73</div>
              <div class="linker__list-item-ministry linker__list-size-ministry">Не твоих
                собачьих дел <div class="tooltip">Не твоих собачьих дел</div>
              </div>
              <div class="linker__list-item-territory linker__list-size-territory">Московская
                область <div class="tooltip">Московская
                  область</div>
              </div>
              <div class="linker__list-item-program linker__list-size-program" >Программа помощи не особо нуждающимся в
                помощи гражданам стран дальнего и ближнего заруюежья<div class="tooltip">рограмма помощи не особо нуждающимся в
                  помощи гражданам стран дальнего и ближнего заруюежья</div>
              </div>
              <div class="linker__list-item-name linker__list-size-name">Обеление имени хана Батыя в
                историческом
                сознании граждан российской федерации в период с 2020 по 2024 годы <div class="tooltip">Обеление имени хана Батыя в
                  историческом
                  сознании граждан российской федерации в период с 2020 по 2024 годы</div>
              </div>
              <div class="linker__list-item-details linker__list-size-details">
                <button class="linker__list-item-details-button button">Подробнее</button>
                <button class="linker__list-item-pick-button button">Выбрать</button>
              </div>
            </div>
            <div class="linker__list-item">
              <div class="linker__list-item-code linker__list-size-code">764910</div>
              <div class="linker__list-item-year linker__list-size-year">2011</div>
              <div class="linker__list-item-ready linker__list-size-ready">73</div>
              <div class="linker__list-item-ministry linker__list-size-ministry">Не твоих
                собачьих дел <div class="tooltip">Не твоих собачьих дел</div>
              </div>
              <div class="linker__list-item-territory linker__list-size-territory">Московская
                область <div class="tooltip">Московская
                  область</div>
              </div>
              <div class="linker__list-item-program linker__list-size-program" >Программа помощи не особо нуждающимся в
                помощи гражданам стран дальнего и ближнего заруюежья<div class="tooltip">рограмма помощи не особо нуждающимся в
                  помощи гражданам стран дальнего и ближнего заруюежья</div>
              </div>
              <div class="linker__list-item-name linker__list-size-name">Обеление имени хана Батыя в
                историческом
                сознании граждан российской федерации в период с 2020 по 2024 годы <div class="tooltip">Обеление имени хана Батыя в
                  историческом
                  сознании граждан российской федерации в период с 2020 по 2024 годы</div>
              </div>
              <div class="linker__list-item-details linker__list-size-details">
                <button class="linker__list-item-details-button button">Подробнее</button>
                <button class="linker__list-item-pick-button button">Выбрать</button>
              </div>
            </div>
            <div class="linker__list-item">
              <div class="linker__list-item-code linker__list-size-code">764910</div>
              <div class="linker__list-item-year linker__list-size-year">2011</div>
              <div class="linker__list-item-ready linker__list-size-ready">73</div>
              <div class="linker__list-item-ministry linker__list-size-ministry">Не твоих
                собачьих дел <div class="tooltip">Не твоих собачьих дел</div>
              </div>
              <div class="linker__list-item-territory linker__list-size-territory">Московская
                область <div class="tooltip">Московская
                  область</div>
              </div>
              <div class="linker__list-item-program linker__list-size-program" >Программа помощи не особо нуждающимся в
                помощи гражданам стран дальнего и ближнего заруюежья<div class="tooltip">рограмма помощи не особо нуждающимся в
                  помощи гражданам стран дальнего и ближнего заруюежья</div>
              </div>
              <div class="linker__list-item-name linker__list-size-name">Обеление имени хана Батыя в
                историческом
                сознании граждан российской федерации в период с 2020 по 2024 годы <div class="tooltip">Обеление имени хана Батыя в
                  историческом
                  сознании граждан российской федерации в период с 2020 по 2024 годы</div>
              </div>
              <div class="linker__list-item-details linker__list-size-details">
                <button class="linker__list-item-details-button button">Подробнее</button>
                <button class="linker__list-item-pick-button button">Выбрать</button>
              </div>
            </div>
          </div>
        
        </div>
        
        <div class="pagination">
          
          <div class="pagination__moveto">
            <input type="number" class="pagination__moveto-input">
            <button class="pagination__moveto-button button">Перейти</button>
          </div>
          
          <div class="pagination__nav">
            <span class="pagination__nav-prev button material-icons">chevron_left
            </span>
            <div class="pagination__nav-display">1</div>
            <span class="pagination__nav-next button material-icons">chevron_right
            </span>
          </div>
          
          <div class="pagination__info">
            <div class="pagination__info-pages">
              <div class="pagination__info-pages-title">Страниц:</div>
              <div class="pagination__info-pages-value">1</div>
            </div>
            <div class="pagination__info-objects">
              <div class="pagination__info-objects-title">Объектов:</div>
              <div class="pagination__info-objects-value">3</div>
            </div>
          </div>
        
        </div>
      
      </div>
`;

export const uploadMarkup = `
    <div class="upload">
        
        <div class="upload-box">
          <form id="upload-form" class="upload-form">
            
            <div class="upload-form__item">
              <div class="upload-form__item-title">Каталог:</div>
              <input id="main-input" type="file" name="main" accept="text/plain">
            </div>
            
            <div class="upload-form__item">
              <div class="upload-form__item-title">Данные:</div>
              <input id="additional-input" type="file" name="additional" accept="text/plain">
            </div>
            
            <div class="upload-form__item">
              <div class="upload-form__item-title">Год:</div>
              <input id="year-input" type="number" name="year" value="" min="2011" max="2100">
            </div>
          </form>
          
          <button id="press" class="upload__button-send button">Отправить</button>
        
        </div>
      
      </div>
  `;

export function testHierarchyData() {
  return {
    totalLen: 8,
    data: [
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
      [
        {
          linkedInfoID: 50,
          normalizedID: 38,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '810',
          name: 'ФГБУ «Национальный медицинский исследовательский центр гематологии» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция лечебного корпуса, г.Москва/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 93.8,
        },
        {
          linkedInfoID: 48,
          normalizedID: 37,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '710',
          name: 'ФГБУ «Национальный медицинский исследовательский центр хирургии им.А.В.Вишневского» Министерства здравоохранения Российской Федерации, г.Москва/*/Реконструкция и приспособление для современного использования корпусов по адресу: г.Москва, ул. Б.Серпуховская, д.27/*/реконструкция',
          ministryCode: 1320700,
          ministryName: 'Министерство здравоохранения РФ',
          territoryCode: '45000000000',
          territoryName: 'Город Москва столица Российской Федерации город федерального значения',
          programCode: '1020000',
          programName: 'Объекты, мероприятия (укрупненные инвестиционные проекты), не включенные в долгосрочные (федеральные) целевые программы',
          maxReadiness: 24.1,
        },
        {
          linkedInfoID: 49,
          normalizedID: 116,
          yearData: 2019,
          uniqueCode: '324',
          buildCode: '11110',
          name: 'ФКУ «Федеральное управление автодорог «Урал» Федерального дорожного агентства», г.Екатеринбург/*/Реконструкция моста через реку Большой Салым на км 810+976 автодороги Р-404 Тюмень - Тобольск - Ханты-Мансийск, Ханты-Мансийский АО/*/реконструкция',
          ministryCode: 1326060,
          ministryName: 'Федеральное дорожное агентство',
          territoryCode: '71100000000',
          territoryName: 'Ханты-Мансийский автономный округ - Югра (Тюменская область)',
          programCode: '1008100',
          programName: 'Федеральная целевая программа Развитие транспортной системы России(2010-2020 годы)',
          maxReadiness: 96.2,
        },
      ],
    ],
  };
}
