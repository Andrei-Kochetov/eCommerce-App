import IView from '@src/spa/view/types';

export interface IPopUpView {
  show(): void;
}

export type IPopUp = IView & IPopUpView;
