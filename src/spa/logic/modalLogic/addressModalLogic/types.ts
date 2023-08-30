import { IAddressModalItem } from '@src/spa/view/modal/addressesModal/addressModalItem/types';
import { CustomAddress } from '@src/spa/logic/profile/profileDataManager/types';

export default interface IAddressModalLogic {
  defaultShippingLogic(address: IAddressModalItem): void;
  defaultBillingLogic(address: IAddressModalItem): void;
  acceptHandler(): void;
  exitHandler(): void;
  createNewAddress(): void;
  removeAddress(address: IAddressModalItem): void;
}

export const EMPTY_ADDRESS: Omit<CustomAddress, 'id'> = {
  country: '',
  city: '',
  street: '',
  postcode: '',
  isBilling: 'false',
  isShipping: 'false',
  isDefaultBilling: 'false',
  isDefaultShipping: 'false',
};
