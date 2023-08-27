import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import { IInput } from '@src/spa/view/input/types';

export interface ChangePasswordValues {
  newPassword: string;
  repeatNewPassword: string;
  oldPassword: string;
}

export interface IPasswordModal {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  getNewPasswordInput(): IInput;
  getRepeatNewPasswordInput(): IInput;
  getOldPasswordInput(): IInput;
  getAllValues(): ChangePasswordValues;
  showModal(): void;
  hideModal(): void;
}
