import { IHeader } from '@src/spa/view/header/types';
import IView from '@src/spa/view/types';

export interface IBasePageView {
  getHeader(): IHeader;
  // getMain(): IMain;
}

export type IBasePage = IBasePageView & IView;
