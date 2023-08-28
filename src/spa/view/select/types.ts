import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface ISelectView {
  getSelect(): IElementCreator;
  setTextError(textError: string): void;
  getValue(): string;
}

export type ISelect = ISelectView & IView;
