import { IRouter } from '@src/spa/logic/router/types';
import { ILoginController } from '@src/spa/logic/controller/loginController/types';
import Controller from '@src/spa/logic/controller/controller';
import { ILoginPage } from '@src/spa/view/pages/loginPage/types';
import ILoginValidator from '@src/spa/logic/validator/loginValidator/types';
import LoginValidator from '@src/spa/logic/validator/loginValidator/loginValidator';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import LoginClient from '@src/spa/model/LoginClientApi/LoginClient';
import { ErrorMessages } from '@src/spa/logic/validator/types';
import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';
import PopUpView from '@src/spa/view/popUp/popUpView';
import State from '@src/spa/logic/state/state';
import BasketManager from '@src/spa/logic/basket/basketManger/basketManger';

export default class LoginController extends Controller implements ILoginController {
  private readonly page: ILoginPage;

  public constructor(router: IRouter, page: ILoginPage) {
    super(router);
    this.page = page;
  }

  public async login(element: HTMLElement): Promise<void> {
    const state: IState = State.getInstance();
    const validator: ILoginValidator = new LoginValidator(this.page);
    const emailInput = this.page.getEmailField().getInput().getElement();
    const passwordInput = this.page.getPasswordField().getInput().getElement();
    const loginClient = LoginClient.getInstance();
    const anonymousBasketFlag = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.ANONYMOUS_BASKET_CREATED));
    if (!validator.validate()) return;

    if (emailInput instanceof HTMLInputElement && passwordInput instanceof HTMLInputElement) {
      try {
        let response;
        if (anonymousBasketFlag === true) {
          console.log('run anon basket login');
          response = await loginClient.authorizationAnonumous(emailInput.value, passwordInput.value);

          await loginClient.authorization1(emailInput.value, passwordInput.value);
        } else {
          console.log('run without basket login');
          response = await loginClient.authorization(emailInput.value, passwordInput.value);
        }

        const customerToken: TokenStore = loginClient.getToken();
        console.log(customerToken, 'cust token');
        const customerData: Customer = (await response).body.customer;
        const customerVersion: number = customerData.version;
        const user_login: string = customerData.firstName || customerData.lastName || 'Anonymous';
        console.log(anonymousBasketFlag, 'anon flag');
        console.log(typeof anonymousBasketFlag, 'anon flag');
        state.setRecord(APP_STATE_KEYS.AUTHORIZED, 'true');
        state.setRecord(APP_STATE_KEYS.TOKEN, JSON.stringify(customerToken));
        state.setRecord(APP_STATE_KEYS.USER_LOGIN, user_login);
        state.setRecord(APP_STATE_KEYS.VERSION, `${customerVersion}`);
        /*         if(anonymousBasketFlag === false){
          BasketManager.getInstance().createAuthorizationBasket();
        } */
        PopUpView.getApprovePopUp('You are signed in to the app!').show();
        this.goTo(element);
      } catch (err) {
        console.log(err);
        PopUpView.getRejectPopUp(ErrorMessages.AUTHORIZATION).show();
      }
    }
  }
}
