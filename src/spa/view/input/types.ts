import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface IInputView {
  getInput(): IElementCreator;
  getLabel(): IElementCreator;
  getSpanError(): IElementCreator;
}

export type IInput = IInputView & IView;

export type IInputViewParams = {
  attributes: Record<string, string>;
  classes: string[];
  textLabel: string;
};
