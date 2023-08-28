import { IRegistrationPage } from '@src/spa/view/pages/registrationPage/types';
import Validator from '@src/spa/logic/validator/validator';
import { IInputView } from '@src/spa/view/input/types';
import { ErrorMessages, MAX_AGE, MIN_AGE } from '@src/spa/logic/validator/types';
import { ISelect } from '@src/spa/view/select/types';
import IRegistrationValidator from '@src/spa/logic/validator/registrationValidator/types';

export default class RegistrationValidator extends Validator implements IRegistrationValidator {
  private readonly page: IRegistrationPage;

  public constructor(registrationPage: IRegistrationPage) {
    super();
    this.page = registrationPage;
  }

  public static passwordCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 8, 20) &&
      this.weakPasswordCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  public static emailCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return this.spaceStartEndFieldCheck(input) && this.emailFieldCheck(input) && this.emptyFieldCheck(input);
  }

  public static firstNameCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 1, 20) &&
      this.onlyTextCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  public static lastNameCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 1, 20) &&
      this.onlyTextCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  public static dateBirthCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return this.emptyFieldCheck(input) && this.minDateBirthCheck(input) && this.maxDateBirthCheck(input);
  }

  public static billingCountryCheck(select: ISelect): boolean {
    select.setTextError(' ');
    return this.countryCheck(select);
  }

  public static billingCityCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 1, 20) &&
      this.onlyTextCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  public static billingAddressCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.addressCheck(input) &&
      this.minMaxLengthCheck(input, 1, 30) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  public static billingPostCodeCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 4, 10) &&
      this.postCodeCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected static shippingCountryCheck(select: ISelect): boolean {
    select.setTextError(' ');
    return this.countryCheck(select);
  }

  protected static shippingCityCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 1, 20) &&
      this.onlyTextCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected static shippingAddressCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.addressCheck(input) &&
      this.minMaxLengthCheck(input, 1, 30) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected static shippingPostCodeCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 4, 10) &&
      this.postCodeCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  public validate(): boolean {
    let arrFunc;
    if (!this.page.getSingleAddressFlag()) {
      arrFunc = [this.singleAddressValidation(), this.validationBillingAddresses()];
    } else {
      arrFunc = [this.singleAddressValidation()];
    }
    return arrFunc.every((el) => el === true);
  }

  private singleAddressValidation(): boolean {
    const arrFunc = [
      RegistrationValidator.passwordCheck(this.page.getPasswordField()),
      RegistrationValidator.emailCheck(this.page.getEmailField()),
      RegistrationValidator.firstNameCheck(this.page.getFirstNameField()),
      RegistrationValidator.lastNameCheck(this.page.getLastNameField()),
      RegistrationValidator.dateBirthCheck(this.page.getDateBirthField()),
      RegistrationValidator.shippingCountryCheck(this.page.getShippingCountryField()),
      RegistrationValidator.shippingCityCheck(this.page.getShippingCityField()),
      RegistrationValidator.shippingAddressCheck(this.page.getShippingAddressField()),
      RegistrationValidator.shippingPostCodeCheck(this.page.getShippingPostCodeField()),
    ];
    return arrFunc.every((el) => el === true);
  }
  private validationBillingAddresses(): boolean {
    const arrFunc = [
      RegistrationValidator.billingCountryCheck(this.page.getBillingCountryField()),
      RegistrationValidator.billingCityCheck(this.page.getBillingCityField()),
      RegistrationValidator.billingAddressCheck(this.page.getBillingAddressField()),
      RegistrationValidator.billingPostCodeCheck(this.page.getBillingPostCodeField()),
    ];
    return arrFunc.every((el) => el === true);
  }

  private static onlyTextCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      const regExp = /^([a-zа-яё -])+$/i;
      if (!regExp.test(input.value)) {
        inputView.setTextError(ErrorMessages.ONLY_TEXT);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  private static addressCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      const regExp = /^[а-яА-ЯёЁa-zA-Z0-9- .,/]+$/;
      if (!regExp.test(input.value)) {
        inputView.setTextError(ErrorMessages.ADDRESS);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  private static minDateBirthCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      const dateNow = new Date();
      const date13YearsAgo = new Date(
        `${+dateNow.getFullYear() - MIN_AGE}-${dateNow.getMonth() + 1}-${+dateNow.getDate() + 1}`
      ).getTime();
      const dateValue = new Date(input.value).getTime();
      if (date13YearsAgo < dateValue) {
        inputView.setTextError(ErrorMessages.MIN_DATE_BIRTH);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  private static maxDateBirthCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      const dateNow = new Date();
      const maxYearBack = new Date(
        `${+dateNow.getFullYear() - MAX_AGE}-${dateNow.getMonth() + 1}-${+dateNow.getDate() + 1}`
      ).getTime();
      const dateValue = new Date(input.value).getTime();
      if (maxYearBack > dateValue) {
        inputView.setTextError(ErrorMessages.MAX_DATE_BIRTH);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  private static postCodeCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      const regExp = /^[A-Z0-9 ]+$/;
      if (!regExp.test(input.value)) {
        inputView.setTextError(ErrorMessages.POST_CODE);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  private static countryCheck(selectView: ISelect): boolean {
    const select = selectView.getSelect().getElement();
    if (select instanceof HTMLSelectElement) {
      if (select.options.selectedIndex === 0) {
        selectView.setTextError(ErrorMessages.COUNTRY);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
