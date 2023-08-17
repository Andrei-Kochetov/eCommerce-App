import { ILoginPage } from '@src/spa/view/pages/loginPage/types';
import Validator from '@src/spa/logic/validator/validator';
import { IInputView } from '@src/spa/view/input/types';

export default class LoginValidator extends Validator {
  private readonly page: ILoginPage;

  public constructor(loginPage: ILoginPage) {
    super();
    this.page = loginPage;
  }
  public emailCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.emailFieldCheck(input);
  }
  public passwordCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.minMaxLengthCheck(input, 8, 20) && this.weakPasswordCheck(input);
  }

  public validate(): boolean {
    const arrFunc = [this.passwordCheck(this.page.getPasswordField()), this.emailCheck(this.page.getEmailField())];
    return arrFunc.every((el) => el === true);
  }
}
