import { IRouter } from '@src/spa/logic/router/types';
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
  hideRegisterBTN(): void;
  showRegisterBTN(): void;
  hideSignOutBTN(): void;
  showSignOutBTN(): void;
  hideSignInBTN(): void;
  showSignInBTN(): void;
  changeCaption(userName?: string): void;
  setController(router: IRouter): void;
  hideUserBar(): void;
  showUserBar(): void;
}

export type ITopMenu = ITopMenuView & IView;
