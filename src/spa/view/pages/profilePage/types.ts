import { CustomAddress, ProfileData, UserParams } from '@src/spa/logic/profile/profileDataManager/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';

export interface IProfilePage {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  getInitialState(): ProfileData;
  changeUserInfo(params: UserParams): void;
  changeFirstName(firstName: string): void;
  changeLastName(lastName: string): void;
  changeDateBirth(dateBirth: string): void;
  changeAddresses(addresses: CustomAddress[]): void;
  changeMail(email: string): void;
  getInfoEditBTN(): IElementCreator;
  getPasswordEditBTN(): IElementCreator;
  getMailEditBTN(): IElementCreator;
  getAdressesEditBTN(): IElementCreator;
}
