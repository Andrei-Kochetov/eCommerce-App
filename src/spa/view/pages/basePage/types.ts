import { IHeader } from '@src/spa/view/header/types';
import IView from '@src/spa/view/types';
import { PageNames } from '@src/spa/view/pages/types';

export interface IBasePage {
  getHeader(): IHeader;
  // getMain(): IMain;
  startRendering(): void;
  renderPage(pageName: PageNames): void;
  getCurrentPage(): IView;
}
