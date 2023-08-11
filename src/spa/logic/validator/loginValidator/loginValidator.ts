import { ILoginPage } from '@src/spa/view/pages/loginPage/types';
import Validator from '@src/spa/logic/validator/validator';

export default class LoginValidator extends Validator {
  private readonly page: ILoginPage; // needed page

  // is passing here
  public constructor(loginPage: ILoginPage) {
    super();
    this.page = loginPage;
  }

  public passwordCheck(): boolean {
    // empty field check
    // special symbols check
    // ...... and so on
    // if any of the checks return not empty string method should return false and show appropriate error, given from check method,
    // below appropriate input field
    return false;
  }

  public validate(): boolean {
    // validation of each field
    return false;
  }
}
