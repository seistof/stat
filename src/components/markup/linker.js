// inside of .display
export function linkerMarkupFn() {
  return `
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
                <button class="linker__object-main-select button">
                  <span class="material-icons">playlist_add_check</span>
                </button>
                <button class="linker__object-main-add button">
                  <span class="material-icons">add</span>
                </button>
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
            
          </div>
        
        </div>
        
        <div class="pagination">
          
          <div class="pagination__moveto">
            <input type="number" class="pagination__moveto-input">
            <button class="pagination__moveto-button button">Перейти</button>
          </div>
          
          <div class="pagination__nav">
            <button class="pagination__nav-prev button">
              <span class="material-icons">chevron_left</span>
            </button>
            <div class="pagination__nav-display">1</div>
            <button class="pagination__nav-next button">
              <span class="material-icons">chevron_right</span>
            </button>
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
}
