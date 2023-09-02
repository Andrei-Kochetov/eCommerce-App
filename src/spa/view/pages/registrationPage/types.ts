import { IInput } from '@src/spa/view/input/types';
import IView from '@src/spa/view/types';
import { ISelect } from '@src/spa/view/select/types';

export interface IRegistrationPageView {
  getPasswordField(): IInput;
  getEmailField(): IInput;
  getFirstNameField(): IInput;
  getLastNameField(): IInput;
  getDateBirthField(): IInput;
  getSingleAddress(): IInput;
  getBillingAddressDefault(): IInput;
  getBillingCountryField(): ISelect;
  getBillingCityField(): IInput;
  getBillingAddressField(): IInput;
  getBillingPostCodeField(): IInput;
  getShippingAddressDefault(): IInput;
  getShippingCountryField(): ISelect;
  getShippingCityField(): IInput;
  getShippingAddressField(): IInput;
  getShippingPostCodeField(): IInput;
  getEnterBTN(): IView;
  getHomeBTN(): IView;
  getToLoginBTN(): IView;
}

export type IRegistrationPage = IRegistrationPageView & IView;
