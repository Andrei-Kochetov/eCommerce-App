import { IAddressModalItem } from '@src/spa/view/modal/addressesModal/addressModalItem/types';

export default interface IAddressModalLogic {
  defaultShippingLogic(address: IAddressModalItem): void;
  defaultBillingLogic(address: IAddressModalItem): void;
  countryOnChangeLogic(): void;
  cityOnChangeLogic(): void;
  streetOnChangeLogic(): void;
  postCodeOnChangeLogic(): void;
  isShippingLogic(): void;
  isBillingLogic(): void;
  acceptHandler(): void;
}
