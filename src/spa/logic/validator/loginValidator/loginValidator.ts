import { ILoginPage } from '@src/spa/view/pages/loginPage/types';
import Validator from '@src/spa/logic/validator/validator';
import { IInputView } from '@src/spa/view/input/types';
import ILoginValidator from '@src/spa/logic/validator/loginValidator/types';

export default class LoginValidator extends Validator implements ILoginValidator {
  private readonly page: ILoginPage;

  public constructor(loginPage: ILoginPage) {
    super();
    this.page = loginPage;
  }

  public emailCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return this.emptyFieldCheck(input) && this.emailFieldCheck(input) && this.spaceStartEndFieldCheck(input);
  }

  public passwordCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 8, 20) &&
      this.spaceStartEndFieldCheck(input) &&
      this.weakPasswordCheck(input)
    );
  }

  public validate(): boolean {
    const arrFunc = [this.passwordCheck(this.page.getPasswordField()), this.emailCheck(this.page.getEmailField())];
    return arrFunc.every((el) => el === true);
  }
}
