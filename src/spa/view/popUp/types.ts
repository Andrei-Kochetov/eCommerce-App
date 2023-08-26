import IView from '@src/spa/view/types';

export interface IPopUpView {
  show(): void;
  showWithoutAutoHiding(): void;
}

export type IPopUp = IView & IPopUpView;
