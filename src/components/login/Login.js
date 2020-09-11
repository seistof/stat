import {MainView} from '@core/MainView';
import {loginNode} from '@core/utils';

export class Login extends MainView {
  constructor() {
    super();
  }

  async init(m, h, l, s, u, d) {
    super.initialize('#app').style.display = 'none';
    super.insertElement(document.body, loginNode());

    const login = document.querySelector('.login');
    const overlay = document.createElement('div');
    const overlayIndicator = document.createElement('div');
    const span = document.createElement('span');
    overlay.classList.add('overlay');
    overlayIndicator.classList.add('overlay__indicator');
    span.classList.add('material-icons');
    span.textContent = 'autorenew';
    overlay.appendChild(overlayIndicator);
    overlayIndicator.appendChild(span);
    super.insertElement(login, overlay);

    const loginForm = super.initialize('.login-form');
    const loginBox = super.initialize('.login-box');
    loginBox.style.display = 'none';

    const check = await super.sendQuery(this.dictionaryMinistryURL);
    if (check !== 'error') {
      await m.MAIN.mainInit(m, h, l, s, u, d);
      super.initialize('#app').style.display = 'flex';
      super.initialize('.login').remove();
    } else {
      loginBox.style.display = 'block';
      overlay.remove();
    }

    super.addListener(loginForm, 'submit', async (e) => {
      e.preventDefault();
      const login = super.initialize('.login-name').value;
      const password = super.initialize('.login-password').value;
      const response = await super.authQuery(login, password);
      if (response) {
        console.log('success');
        await m.MAIN.mainInit(m, h, l, s, u, d);
        super.initialize('#app').style.display = 'flex';
        super.initialize('.login').remove();
      } else {
        const submit = super.initialize('.login-submit');
        super.errorMessage(submit, 'пользователя с таким логином и/или паролем не существует', 2);
      }
    });
  }

  checkFields() {
    const login = super.initialize('.login-name');
    const loginLabel = super.initialize('.login-name-label');
    const password = super.initialize('.login-password');
    const passwordLabel = super.initialize('.login-password-label');
    if (login.value === '' && password.value === '') {
      super.errorMessage(loginLabel, 'введите логин');
      super.errorMessage(passwordLabel, 'введите пароль');
      return false;
    } else if (login.value === '') {
      super.errorMessage(loginLabel, 'введите логин');
      return false;
    } else if (password.value === '') {
      super.errorMessage(passwordLabel, 'введите пароль');
      return false;
    } else {
      return true;
    }
  }
}
