import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';
import { ITopMenu } from '@src/spa/view/topMenu/types';

export interface IHeaderView {
  getHomePageLink(): IElementCreator;
  getHeaderContainer(): IView;
  getNavigation(): ITopMenu;
  updateHeader(): void;
}

export type IHeader = IHeaderView & IView;

export const HIDDEN_CLASS = '_hidden';
