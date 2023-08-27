import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface IPopUpView {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  show(): void;
  showWithoutAutoHiding(): void;
}

export type IPopUp = IView & IPopUpView;
