import { IRouter } from '@src/spa/logic/router/types';
import { ILoginController } from '@src/spa/logic/controller/loginController/types';
import Controller from '@src/spa/logic/controller/controller';
import { ILoginPage } from '@src/spa/view/pages/loginPage/types';
import ILoginValidator from '@src/spa/logic/validator/loginValidator/types';
import LoginValidator from '@src/spa/logic/validator/loginValidator/loginValidator';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';
import LoginClient from '@src/spa/model/LoginClientApi/LoginClient';
import { ErrorMessages } from '@src/spa/logic/validator/types';

export default class LoginController extends Controller implements ILoginController {
  private readonly page: ILoginPage;

  public constructor(router: IRouter, page: ILoginPage) {
    super(router);
    this.page = page;
  }

  public login(element: HTMLElement): void {
    const validator: ILoginValidator = new LoginValidator(this.page);
    const emailInput = this.page.getEmailField().getInput().getElement();
    const passwordInput = this.page.getPasswordField().getInput().getElement();
    const loginClient = LoginClient.getInstance();
    if (!validator.validate()) return;
    if (emailInput instanceof HTMLInputElement && passwordInput instanceof HTMLInputElement) {
      loginClient
        .authorization(emailInput.value, passwordInput.value)
        .then((response) => {
          // This is the token and the client data that you requested to withdraw
          const customerToken = loginClient.getToken();
          const customerData = response.body.customer;

          this.state.setRecord(APP_STATE_KEYS.AUTHORIZED, 'true');
          this.state.setRecord(APP_STATE_KEYS.USER_LOGIN, 'Anonymous');
          this.goTo(element);
        })
        .catch((e) => this.page.getPasswordField().setTextError(ErrorMessages.AUTHORIZATION));
    }
  }
}
