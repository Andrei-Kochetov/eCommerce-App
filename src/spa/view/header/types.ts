import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';
import { ITopMenu } from '@src/spa/view/topMenu/types';

export interface IHeaderView {
  getHomePageLink(): IElementCreator;
  getHeaderContainer(): IView;
  hideNavigation(): void;
  showNavigation(): void;
  getNavigation(): ITopMenu;
}

export type IHeader = IHeaderView & IView;
