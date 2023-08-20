import { IRegistrationPage } from '@src/spa/view/pages/registrationPage/types';
import Validator from '@src/spa/logic/validator/validator';
import { IInputView } from '@src/spa/view/input/types';
import { ErrorMessages } from '@src/spa/logic/validator/types';
import { ISelect } from '@src/spa/view/select/types';
import IRegistrationValidator from '@src/spa/logic/validator/registrationValidator/types';

export default class RegistrationValidator extends Validator implements IRegistrationValidator {
  private readonly page: IRegistrationPage;

  public constructor(registrationPage: IRegistrationPage) {
    super();
    this.page = registrationPage;
  }

  protected passwordCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 8, 20) &&
      this.weakPasswordCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected emailCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return this.spaceStartEndFieldCheck(input) && this.emailFieldCheck(input) && this.emptyFieldCheck(input);
  }

  protected firstNameCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 1, 20) &&
      this.onlyTextCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected lastNameCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 1, 20) &&
      this.onlyTextCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected dateBirthCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return this.emptyFieldCheck(input) && this.minDateBirthCheck(input);
  }

  protected billingCountryCheck(select: ISelect): boolean {
    select.setTextError(' ');
    return this.countryCheck(select);
  }

  protected billingCityCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 1, 20) &&
      this.onlyTextCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected billingAddressCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.addressCheck(input) &&
      this.minMaxLengthCheck(input, 4, 30) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected billingPostCodeCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 4, 8) &&
      this.postCodeCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected shippingCountryCheck(select: ISelect): boolean {
    select.setTextError(' ');
    return this.countryCheck(select);
  }

  protected shippingCityCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 1, 20) &&
      this.onlyTextCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected shippingAddressCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.addressCheck(input) &&
      this.minMaxLengthCheck(input, 4, 30) &&
      this.spaceStartEndFieldCheck(input)
    );
  }

  protected shippingPostCodeCheck(input: IInputView): boolean {
    input.setTextError(' ');
    return (
      this.emptyFieldCheck(input) &&
      this.minMaxLengthCheck(input, 4, 8) &&
      this.postCodeCheck(input) &&
      this.spaceStartEndFieldCheck(input)
    );
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
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      const regExp = /^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z- ][а-яА-ЯёЁa-zA-Z ]+$/;
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

  private addressCheck(inputView: IInputView): boolean {
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

  private minDateBirthCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
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
    } else {
      return false;
    }
  }

  private postCodeCheck(inputView: IInputView): boolean {
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

  private countryCheck(selectView: ISelect): boolean {
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
