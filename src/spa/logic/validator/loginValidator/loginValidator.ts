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

  public static emailCheck(input: IInputView): boolean {
    input.setTextError(' ');

    return this.spaceStartEndFieldCheck(input) && this.emptyFieldCheck(input) && this.emailFieldCheck(input);
  }

  public static passwordCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 8, 20) &&
      this.spaceStartEndFieldCheck(input) &&
      this.weakPasswordCheck(input)
    );
  }

  public validate(): boolean {
    const arrFunc = [
      LoginValidator.passwordCheck(this.page.getPasswordField()),
      LoginValidator.emailCheck(this.page.getEmailField()),
    ];
    return arrFunc.every((el) => el === true);
  }
}
