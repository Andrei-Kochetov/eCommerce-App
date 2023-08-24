import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import { Address } from '@src/spa/logic/profile/profileDataManager/types';

export interface IAddressView {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  updateAddress(address: Address): void;
}
