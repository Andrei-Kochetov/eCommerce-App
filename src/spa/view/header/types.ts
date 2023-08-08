import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface IHeaderView {
  getHomePageLink(): IElementCreator;
  getHeaderContainer(): IView;
}

export type IHeader = IHeaderView & IView;
