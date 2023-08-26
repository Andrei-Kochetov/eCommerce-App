import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import { IInput } from '@src/spa/view/input/types';

export interface IEmailModal {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
  getEmailInput(): IInput;
  showModal(): void;
  hideModal(): void;
}
