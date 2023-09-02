import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface ISelectView {
  getSelect(): IElementCreator;
  setTextError(textErorr: string): void;
}

export type ISelect = ISelectView & IView;
