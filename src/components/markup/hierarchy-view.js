// inside of .display
export function hierarchyViewMarkupFn() {
  return `
    <div class="hierarchy-view">
        
        <div class="hierarchy-view-wrapper">
          
          <div class="hierarchy-view__header">
            <div class="hierarchy-view__header-item hierarchy-view__header-year hierarchy-view-size-year">Год</div>
            <div class="hierarchy-view__header-item hierarchy-view__header-ready hierarchy-view-size-ready">Готово</div>
            <div class="hierarchy-view__header-item hierarchy-view__header-code hierarchy-view-size-code">Код</div>
            <div class="hierarchy-view__header-item hierarchy-view__header-info hierarchy-view-size-info">Территория,
              министерство, программа
            </div>
            <div class="hierarchy-view__header-item hierarchy-view__header-name hierarchy-view-size-name">Название</div>
          </div>
          
          <div class="hierarchy-view__object-container">
            
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
