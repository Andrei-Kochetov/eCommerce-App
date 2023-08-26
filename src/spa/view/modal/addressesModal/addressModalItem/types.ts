import { Address } from '@src/spa/logic/profile/profileDataManager/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import { ICheckbox } from '@src/spa/view/checkbox/types';
import { IInput } from '@src/spa/view/input/types';

export interface IAddressModalItem {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  getCountryInput(): IInput;
  getCityInput(): IInput;
  getStreetInput(): IInput;
  getPostCodeInput(): IInput;
  getIsShippingInput(): ICheckbox;
  getIsBillingInput(): ICheckbox;
  getIsDefaultShippingInput(): ICheckbox;
  getIsDefaultBillingInput(): ICheckbox;
  getAllValues(): Address;
  getID(): string;
}
