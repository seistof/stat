// inside of .app
export function baseMarkupFn() {
  return `
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
                <input class="select-ready-display" type="text" value="Все" max="100" min="0">
              </label>
            </div>
            <input type="range" id="select-ready" class="select-ready" max="100" min="0">
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
}
