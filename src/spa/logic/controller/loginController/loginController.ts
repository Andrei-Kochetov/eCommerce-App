import { IRouter } from '@src/spa/logic/router/types';
import { ILoginController } from '@src/spa/logic/controller/loginController/types';
import Controller from '@src/spa/logic/controller/controller';
import { ILoginPage } from '@src/spa/view/pages/loginPage/types';
import ILoginValidator from '@src/spa/logic/validator/loginValidator/types';
import LoginValidator from '@src/spa/logic/validator/loginValidator/loginValidator';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';
import LoginClient from '@src/spa/model/LoginClientApi/LoginClient';
import { ErrorMessages } from '@src/spa/logic/validator/types';
import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';
import PopUpView from '@src/spa/view/popUp/popUpView';

export default class LoginController extends Controller implements ILoginController {
  private readonly page: ILoginPage;

  public constructor(router: IRouter, page: ILoginPage) {
    super(router);
    this.page = page;
  }

  public async login(element: HTMLElement): Promise<void> {
    const validator: ILoginValidator = new LoginValidator(this.page);
    const emailInput = this.page.getEmailField().getInput().getElement();
    const passwordInput = this.page.getPasswordField().getInput().getElement();
    const loginClient = LoginClient.getInstance();
    if (!validator.validate()) return;

    if (emailInput instanceof HTMLInputElement && passwordInput instanceof HTMLInputElement) {
      try {
        const response: ClientResponse<CustomerSignInResult> = await loginClient.authorization(
          emailInput.value,
          passwordInput.value
        );
        const customerToken: TokenStore = loginClient.getToken();
        const customerData: Customer = response.body.customer;
        const customerVersion: number = customerData.version;
        const user_login: string = customerData.firstName || customerData.lastName || 'Anonymous';

        this.state.setRecord(APP_STATE_KEYS.AUTHORIZED, 'true');
        this.state.setRecord(APP_STATE_KEYS.TOKEN, JSON.stringify(customerToken));
        this.state.setRecord(APP_STATE_KEYS.USER_LOGIN, user_login);
        console.log(customerVersion);
        this.state.setRecord(APP_STATE_KEYS.VERSION, `${customerVersion}`);
        console.log(this.state, 'login state');
        PopUpView.getApprovePopUp('You are signed in to the app!').show();
        this.goTo(element);
      } catch (err) {
        PopUpView.getRejectPopUp(ErrorMessages.AUTHORIZATION).show();
      }
    }
  }
}
