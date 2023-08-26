import { IElementCreator } from '@src/spa/utils/elementCreator/types';

export interface ICheckbox {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  getCheckbox(): IElementCreator;
  getSpan(): IElementCreator;
  getValue(): 'true' | 'false';
  check(toBeChecked: boolean): void;
}
