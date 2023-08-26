import { UserParams } from '@src/spa/logic/profile/profileDataManager/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import { IInput } from '@src/spa/view/input/types';

export interface IUserInfoModal {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  getFirstNameInput(): IInput;
  getLastNameInput(): IInput;
  getBirthDateInput(): IInput;
  getAllValues(): UserParams;
}
