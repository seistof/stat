// inside of .display
export function uploadMarkupFn() {
  return `
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
}
