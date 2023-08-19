import '@src/spa/view/header/header.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import IView from '@src/spa/view/types';
import ContainerView from '@src/spa/view/container/containerView';
import { HIDDEN_CLASS, IHeaderView } from '@src/spa/view/header/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import TopMenuView from '@src/spa/view/topMenu/topMenuView';
import { ITopMenu } from '@src/spa/view/topMenu/types';
import { PAGE_NAME_ATTRIBUTE, PageNames } from '@src/spa/view/pages/types';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import State from '@src/spa/logic/state/state';
import { IRouter } from '@src/spa/logic/router/types';
import { IController } from '@src/spa/logic/controller/types';
import Controller from '@src/spa/logic/controller/controller';

// header properties
const HEADER_TAG = 'header';
const HEADER_CLASS_NAME = 'header';
const HEADER_CONTAINER_CLASS_NAME = 'header__container';

// logoLink properties
const LOGO_LINK_TAG = 'a';
const LOGO_LINK_CLASS_NAME = 'header__logo-link';
const LOGO_LINK_ATTRIBUTES = {
  [PAGE_NAME_ATTRIBUTE]: PageNames.MAIN,
};

// logoImg properties
const LOGO_IMG_TAG = 'span';
const LOGO_IMG_CLASS_NAME = 'header__logo-img';

export default class HeaderView extends View implements IHeaderView {
  private readonly container: IView;
  private readonly homePageLink: IElementCreator;
  private readonly navigation: ITopMenu;
  private controller: IController | null = null;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: HEADER_TAG,
      classNames: [HEADER_CLASS_NAME],
    };
    super(params);
    this.container = new ContainerView();
    this.homePageLink = this.createHomePageLink(LOGO_LINK_ATTRIBUTES, LOGO_LINK_CLASS_NAME);
    this.navigation = new TopMenuView();
    this.configureView();
  }

  public setControllers(router: IRouter): void {
    this.controller = new Controller(router);
    this.navigation.setController(router);
  }

  public getHomePageLink(): IElementCreator {
    return this.homePageLink;
  }
  public getHeaderContainer(): IView {
    return this.container;
  }

  public getNavigation(): ITopMenu {
    return this.navigation;
  }

  public updateHeader(): void {
    const state: IState = State.getInstance();
    if (state.getRecord(APP_STATE_KEYS.IS_SPECIAL_PAGE) === 'false') {
      this.showNavigation();
    } else {
      this.hideNavigation();
    }

    if (state.getRecord(APP_STATE_KEYS.AUTHORIZED) === 'false') {
      this.navigation.showRegisterBTN();
      this.navigation.changeCaption();
      this.navigation.showSignInBTN();
      this.navigation.hideSignOutBTN();
    } else {
      this.navigation.hideRegisterBTN();
      this.navigation.changeCaption(state.getRecord(APP_STATE_KEYS.USER_LOGIN)[0].toUpperCase());
      this.navigation.hideSignInBTN();
      this.navigation.showSignOutBTN();
    }
  }

  private hideNavigation(): void {
    this.navigation.getViewCreator().setClasses(HIDDEN_CLASS);
  }

  private showNavigation(): void {
    this.navigation.getViewCreator().removeClasses(HIDDEN_CLASS);
  }

  private configureView(): void {
    this.container.getViewCreator().setClasses(HEADER_CONTAINER_CLASS_NAME);
    this.homePageLink.addInnerElement(this.createLogoImg(LOGO_IMG_CLASS_NAME).getElement());
    this.updateHeader();
    this.container.getViewCreator().addInnerElement(this.homePageLink.getElement(), this.navigation.getView());
    this.getViewCreator().addInnerElement(this.container.getViewCreator());
  }

  private createHomePageLink(linkAttributes: Record<string, string>, ...classes: string[]): IElementCreator {
    const params: ElementCreatorParams = {
      tag: LOGO_LINK_TAG,
      classNames: classes,
      attributes: linkAttributes,
    };
    const homePageLink: IElementCreator = new ElementCreator(params);
    homePageLink.setListeners({
      event: 'click',
      callback: (): void => {
        if (!this.controller) throw new Error('There is no controller in header view!');
        this.controller.goTo(homePageLink.getElement());
      },
    });
    return homePageLink;
  }

  private createLogoImg(...classes: string[]): IElementCreator {
    const params: ElementCreatorParams = {
      tag: LOGO_IMG_TAG,
      classNames: classes,
    };
    const logoImg: IElementCreator = new ElementCreator(params);
    return logoImg;
  }
}
