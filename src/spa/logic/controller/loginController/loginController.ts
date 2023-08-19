import { IRouter } from '@src/spa/logic/router/types';
import { ILoginController } from '@src/spa/logic/controller/loginController/types';
import Controller from '@src/spa/logic/controller/controller';
import { ILoginPage } from '@src/spa/view/pages/loginPage/types';
import ILoginValidator from '@src/spa/logic/validator/loginValidator/types';
import LoginValidator from '@src/spa/logic/validator/loginValidator/loginValidator';

export default class LoginController extends Controller implements ILoginController {
  private readonly page: ILoginPage;

  public constructor(router: IRouter, page: ILoginPage) {
    super(router);
    this.page = page;
  }

  public login(element: HTMLElement): void {
    const validator: ILoginValidator = new LoginValidator(this.page);
    if (!validator.validate()) return;
    // TODO: add authorization logic
    this.goTo(element);
  }
}
