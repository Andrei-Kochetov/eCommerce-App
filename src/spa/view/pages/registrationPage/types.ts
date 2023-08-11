import { IInput } from '@src/spa/view/input/types';
import IView from '@src/spa/view/types';

export interface IRegistrationPageView {
  getPasswordField(): IInput;
  getEmailField(): IInput;
  getFirstNameField(): IInput;
  getLastNameField(): IInput;
  getDateBirthField(): IInput;
  getSingleAddress(): IInput;
  getBillingAddressDefault(): IInput;
  getBillingCountryField(): IInput;
  getBillingCityField(): IInput;
  getBillingAddressField(): IInput;
  getBillingPostCodeField(): IInput;
  getShippingAddressDefault(): IInput;
  getShippingCountryField(): IInput;
  getShippingCityField(): IInput;
  getShippingAddressField(): IInput;
  getShippingPostCodeField(): IInput;
  getEnterBTN(): IView;
  getHomeBTN(): IView;
  getToLoginBTN(): IView;
}

export type IHeader = IRegistrationPageView & IView;
