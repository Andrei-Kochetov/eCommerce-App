import { IRouter } from '@src/spa/logic/router/types';
import { ILoginController } from '@src/spa/logic/controller/loginController/types';
import Controller from '@src/spa/logic/controller/controller';
import { ILoginPage } from '@src/spa/view/pages/loginPage/types';
import ILoginValidator from '@src/spa/logic/validator/loginValidator/types';
import LoginValidator from '@src/spa/logic/validator/loginValidator/loginValidator';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';

export default class LoginController extends Controller implements ILoginController {
  private readonly page: ILoginPage;

  public constructor(router: IRouter, page: ILoginPage) {
    super(router);
    this.page = page;
  }

  public login(element: HTMLElement): void {
    const validator: ILoginValidator = new LoginValidator(this.page);
    if (!validator.validate()) return;

    // test logic to check sign in working
    this.state.setRecord(APP_STATE_KEYS.AUTHORIZED, 'true');
    this.state.setRecord(APP_STATE_KEYS.USER_LOGIN, 'Anonymous');
    // end of test logic
    // TODO: add authorization logic

    this.goTo(element);
  }
}
