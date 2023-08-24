import { IRouter } from '@src/spa/logic/router/types';
import Controller from '@src/spa/logic/controller/controller';
import { IRegistrationPage } from '@src/spa/view/pages/registrationPage/types';
import IRegistrationController from '@src/spa/logic/controller/registrationController/types';
import RegistrationValidator from '@src/spa/logic/validator/registrationValidator/registrationValidator';
import IRegistrationValidator from '@src/spa/logic/validator/registrationValidator/types';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';
import Registration from '@src/spa/model/registration/registration';
import { IRegistration, IRegistrationInputValue } from '@src/spa/model/registration/types';
import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';
import PopUpView from '@src/spa/view/popUp/popUpView';

export default class RegistrationController extends Controller implements IRegistrationController {
  private readonly page: IRegistrationPage;

  public constructor(router: IRouter, page: IRegistrationPage) {
    super(router);
    this.page = page;
  }

  public async register(element: HTMLElement, registrationInputValue: IRegistrationInputValue): Promise<void> {
    const validator: IRegistrationValidator = new RegistrationValidator(this.page);
    const registration: IRegistration = Registration.getInstance();
    if (!validator.validate()) return;

    try {
      let response: ClientResponse<CustomerSignInResult>;
      if (this.page.getSingleAddressFlag()) {
        response = await registration.registrationSingleAddress(registrationInputValue);
      } else {
        response = await registration.registrationTwoAddress(registrationInputValue);
      }

      const customerToken: TokenStore = registration.getToken();
      console.log(customerToken);
      const customerData: Customer = response.body.customer;
      const user_login: string = customerData.firstName || customerData.lastName || 'Anonymous';

      this.state.setRecord(APP_STATE_KEYS.AUTHORIZED, 'true');
      this.state.setRecord(APP_STATE_KEYS.TOKEN, JSON.stringify(customerToken));
      this.state.setRecord(APP_STATE_KEYS.USER_LOGIN, user_login);
      PopUpView.getApprovePopUp('You are signed up to the app!').show();
      this.goTo(element);
    } catch (err) {
      if (err instanceof Error) {
        PopUpView.getRejectPopUp(err.message).show();
      }
    }
  }
}
