import { Address, UserParams } from '@src/spa/logic/profile/profileDataManager/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';

export interface IProfilePage {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  updateUserParams(params: UserParams): void;
  updateEmail(email: string): void;
  updateAddresses(addresses: Address[]): void;
  // and getter methods for important elements and Map, which contain addresses
}
