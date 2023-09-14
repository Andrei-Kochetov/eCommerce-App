import { IRouter } from '@src/spa/logic/router/types';
import Controller from '@src/spa/logic/controller/controller';
import { IRegistrationPage } from '@src/spa/view/pages/registrationPage/types';
import IRegistrationController from '@src/spa/logic/controller/registrationController/types';
import RegistrationValidator from '@src/spa/logic/validator/registrationValidator/registrationValidator';
import IRegistrationValidator from '@src/spa/logic/validator/registrationValidator/types';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import Registration from '@src/spa/model/registration/registration';
import { IRegistration, IRegistrationInputValue } from '@src/spa/model/registration/types';
import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import PopUpView from '@src/spa/view/popUp/popUpView';
import LoginClient from '@src/spa/model/LoginClientApi/LoginClient';
import State from '@src/spa/logic/state/state';

export default class RegistrationController extends Controller implements IRegistrationController {
  private readonly page: IRegistrationPage;

  public constructor(router: IRouter, page: IRegistrationPage) {
    super(router);
    this.page = page;
  }

  public async register(element: HTMLElement, registrationInputValue: IRegistrationInputValue): Promise<void> {
    const state: IState = State.getInstance();
    const validator: IRegistrationValidator = new RegistrationValidator(this.page);
    const registration: IRegistration = Registration.getInstance();
    const loginClient = LoginClient.getInstance();
    const anonymousBasketFlag = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.ANONYMOUS_BASKET_CREATED));
    if (!validator.validate()) return;

    try {
      let response: ClientResponse<CustomerSignInResult>;
      if (this.page.getSingleAddressFlag()) {
        response = await registration.registrationSingleAddress(registrationInputValue);
      } else {
        response = await registration.registrationTwoAddress(registrationInputValue);
      }

      const customerData: Customer = response.body.customer;
      const cutomerVersion: number = customerData.version;
      const user_login: string = customerData.firstName || customerData.lastName || 'Anonymous';

      const email = customerData.email;
      const password = this.page.getPasswordField().getValue();

      if (anonymousBasketFlag === true) {
        await LoginClient.getInstance().authorizationAnonumous(email, password);
        await LoginClient.getInstance().getTokenAfterAnonymousAuthorization(email, password);
      } else {
        await loginClient.authorization(email, password);
      }

      state.setRecord(APP_STATE_KEYS.TOKEN, `${JSON.stringify(loginClient.getToken())}`);
      state.setRecord(APP_STATE_KEYS.AUTHORIZED, 'true');
      state.setRecord(APP_STATE_KEYS.USER_LOGIN, user_login);
      state.setRecord(APP_STATE_KEYS.VERSION, `${cutomerVersion}`);
      PopUpView.getApprovePopUp('You are signed up to the app!').show();
      this.goTo(element);
    } catch (err) {
      if (err instanceof Error) {
        State.getInstance().setRecord(APP_STATE_KEYS.ANONYMOUS_BASKET_CREATED, JSON.stringify(false));
        PopUpView.getRejectPopUp(err.message).show();
      }
    }
  }
}
