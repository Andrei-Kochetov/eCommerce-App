import { IHeader } from '@src/spa/view/header/types';
import IView from '@src/spa/view/types';
import { IMain } from '@src/spa/view/main/types';

export interface IBasePage {
  getHeader(): IHeader;
  getMain(): IMain;
  startRendering(): void;
  renderPage(page: IView): void;
}
