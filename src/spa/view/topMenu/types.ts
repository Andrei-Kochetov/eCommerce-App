import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface ITopMenuView {
  getMainBTN(): IElementCreator;
  getCatalogBTN(): IElementCreator;
  getAboutUsBTN(): IElementCreator;
  getSingInBTN(): IElementCreator;
  getSingOutBTN(): IElementCreator;
  getRegisterBTN(): IElementCreator;
  getUserBar(): IElementCreator;
  getBasket(): IElementCreator;
}

export type ITopMenu = ITopMenuView & IView;
