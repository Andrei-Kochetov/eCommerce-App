import { IRegistrationPage } from '@src/spa/view/pages/registrationPage/types';
import Validator from '@src/spa/logic/validator/validator';
import { IInputView } from '@src/spa/view/input/types';
import { ErrorMessages } from '@src/spa/logic/validator/types';
import { ISelect } from '@src/spa/view/select/types';

export default class RegistrationValidator extends Validator {
  private readonly page: IRegistrationPage;

  public constructor(registrationPage: IRegistrationPage) {
    super();
    this.page = registrationPage;
  }
  public passwordCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.minMaxLengthCheck(input, 8, 20) && this.weakPasswordCheck(input);
  }

  public emailCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.emailFieldCheck(input);
  }

  public firstNameCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.minMaxLengthCheck(input, 1, 20) && this.onlyTextCheck(input);
  }

  public lastNameCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.minMaxLengthCheck(input, 1, 20) && this.onlyTextCheck(input);
  }

  public dateBirthCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.minDateBirthCheck(input);
  }

  public billingCountryCheck(select: ISelect): boolean {
    return this.countryCheck(select);
  }

  public billingCityCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.minMaxLengthCheck(input, 1, 20) && this.onlyTextCheck(input);
  }

  public billingAddressCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.addessCheck(input) && this.minMaxLengthCheck(input, 4, 30);
  }

  public billingPostCodeCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.minMaxLengthCheck(input, 4, 8) && this.postCodeCheck(input);
  }

  public shippingCountryCheck(select: ISelect): boolean {
    return this.countryCheck(select);
  }

  public shippingCityCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.minMaxLengthCheck(input, 1, 20) && this.onlyTextCheck(input);
  }

  public shippingAddressCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.addessCheck(input) && this.minMaxLengthCheck(input, 4, 30);
  }

  public shippingPostCodeCheck(input: IInputView): boolean {
    return this.emptyFieldCheck(input) && this.minMaxLengthCheck(input, 4, 8) && this.postCodeCheck(input);
  }

  public validate(): boolean {
    const arrFunc = [
      this.passwordCheck(this.page.getPasswordField()),
      this.emailCheck(this.page.getEmailField()),
      this.firstNameCheck(this.page.getFirstNameField()),
      this.lastNameCheck(this.page.getLastNameField()),
      this.dateBirthCheck(this.page.getDateBirthField()),
      this.billingCountryCheck(this.page.getBillingCountryField()),
      this.billingCityCheck(this.page.getBillingCityField()),
      this.billingAddressCheck(this.page.getBillingAddressField()),
      this.billingPostCodeCheck(this.page.getBillingPostCodeField()),
      this.shippingCountryCheck(this.page.getShippingCountryField()),
      this.shippingCityCheck(this.page.getShippingCityField()),
      this.shippingAddressCheck(this.page.getShippingAddressField()),
      this.shippingPostCodeCheck(this.page.getShippingPostCodeField()),
    ];
    return arrFunc.every((el) => el === true);
  }

  private onlyTextCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement() as HTMLInputElement;
    const regExp = /^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z-]+$/;
    if (!regExp.test(input.value)) {
      inputView.setTextError(ErrorMessages.ONLY_TEXT);
      return false;
    } else {
      return true;
    }
  }
  private addessCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement() as HTMLInputElement;
    const regExp = /^[а-яА-ЯёЁa-zA-Z0-9- .,/]+$/;
    if (!regExp.test(input.value)) {
      inputView.setTextError(ErrorMessages.ADDRESS);
      return false;
    } else {
      return true;
    }
  }
  private minDateBirthCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement() as HTMLInputElement;
    const dateNow = new Date();
    const date13YearsAgo = new Date(
      `${+dateNow.getFullYear() - 13}-${dateNow.getMonth() + 1}-${+dateNow.getDate() + 1}`
    ).getTime();
    const dateValue = new Date(input.value).getTime();
    if (date13YearsAgo < dateValue) {
      inputView.setTextError(ErrorMessages.MIN_DATE_BIRTH);
      return false;
    } else {
      return true;
    }
  }
  private postCodeCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement() as HTMLInputElement;
    const regExp = /^[A-Z0-9 ]+$/;
    if (!regExp.test(input.value)) {
      inputView.setTextError(ErrorMessages.POST_CODE);
      return false;
    } else {
      return true;
    }
  }
  private countryCheck(selectView: ISelect): boolean {
    const select = selectView.getSelect().getElement() as HTMLSelectElement;
    console.log(select);
    if (select.options.selectedIndex === 0) {
      selectView.setTextError(ErrorMessages.COUNTRY);
      return false;
    } else {
      return true;
    }
  }
}
