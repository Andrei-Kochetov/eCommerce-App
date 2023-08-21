import { IRouter } from '@src/spa/logic/router/types';
import Controller from '@src/spa/logic/controller/controller';
import { IRegistrationPage } from '@src/spa/view/pages/registrationPage/types';
import IRegistrationController from '@src/spa/logic/controller/registrationController/types';
import RegistrationValidator from '@src/spa/logic/validator/registrationValidator/registrationValidator';
import IRegistrationValidator from '@src/spa/logic/validator/registrationValidator/types';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';
import Registration from '@src/spa/model/registration/registration';
import { IRegistrationInputValue } from '@src/spa/model/registration/types';

export default class RegistrationController extends Controller implements IRegistrationController {
  private readonly page: IRegistrationPage;

  public constructor(router: IRouter, page: IRegistrationPage) {
    super(router);
    this.page = page;
  }

  public register(element: HTMLElement, registrationInputValue: IRegistrationInputValue): void {
    const validator: IRegistrationValidator = new RegistrationValidator(this.page);
    if (!validator.validate()) return;

    // test logic to check registration working
    this.state.setRecord(APP_STATE_KEYS.AUTHORIZED, 'true');
    this.state.setRecord(APP_STATE_KEYS.USER_LOGIN, 'Anonymous');
    // end of test logic
    // TODO: add registration logic
    Registration.registration(registrationInputValue);

    this.goTo(element);
  }
}
