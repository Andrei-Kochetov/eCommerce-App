import { IInput } from '@src/spa/view/input/types';
import IView from '@src/spa/view/types';

export interface ILoginPageView {
  getPasswordField(): IInput;
  getEmailField(): IInput;
  getEnterBTN(): IView;
  getHomeBTN(): IView;
  getToRegistrationBTN(): IView;
}

export type IHeader = ILoginPageView & IView;
