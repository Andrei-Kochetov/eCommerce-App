import { Address } from '@src/spa/logic/profile/profileDataManager/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import { IAddressModalItem } from '@src/spa/view/modal/addressesModal/addressModalItem/types';

export interface IAddressesModal {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  getAllAddressesInfo(): Address[];
  getSingleAddressInfo(id: string): Address | null;
  getAllAddressModalItems(): IAddressModalItem[];
  getSingleAddressModalItem(id: string): IAddressModalItem | null;
}
