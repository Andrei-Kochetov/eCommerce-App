import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface IInputView {
  getInput(): IElementCreator;
  getLabel(): IElementCreator;
  getSpanError(): IElementCreator;
  setTextError(textError: string): void;
  changeLabelText(text: string): void;
  changeID(newID: string): void;
  getValue(): string;
}

export type IInput = IInputView & IView;

export type IInputViewParams = {
  attributes: {
    id: string;
    [key: string]: string;
  };
  textLabel: string;
  classes?: string[];
};
