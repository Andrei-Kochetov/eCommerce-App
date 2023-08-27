import { IElementCreator } from '@src/spa/utils/elementCreator/types';

export interface IModal {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  showModal(): void;
  hideModal(): void;
}
