import { CustomAddress } from '@src/spa/logic/profile/profileDataManager/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import { IAddressModalItem } from '@src/spa/view/modal/addressesModal/addressModalItem/types';

export interface IAddressesModal {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  getAllAddressesInfo(): CustomAddress[];
  getSingleAddressInfo(id: string): CustomAddress | null;
  getAllAddressModalItems(): IAddressModalItem[];
  getSingleAddressModalItem(id: string): IAddressModalItem | null;
  showModal(): void;
  hideModal(): void;
  getInitialState(): CustomAddress[];
  addNewAddress(address: IAddressModalItem): void;
  removeAddress(address: IAddressModalItem): void;
}
