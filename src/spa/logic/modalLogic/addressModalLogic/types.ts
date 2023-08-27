import { IAddressModalItem } from '@src/spa/view/modal/addressesModal/addressModalItem/types';

export default interface IAddressModalLogic {
  defaultShippingLogic(address: IAddressModalItem): void;
  defaultBillingLogic(address: IAddressModalItem): void;
  acceptHandler(): void;
  exitHandler(): void;
}
