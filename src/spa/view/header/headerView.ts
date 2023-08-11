import '@src/spa/view/header/header.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import IView from '@src/spa/view/types';
import ContainerView from '@src/spa/view/container/containerView';
import { IHeaderView } from '@src/spa/view/header/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import TopMenuView from '@src/spa/view/topMenu/topMenuView';
import { ITopMenu } from '@src/spa/view/topMenu/types';
import { PAGE_NAME_ATTRIBUTE, PageNames } from '@src/spa/view/pages/types';

// header properties
const HEADER_TAG = 'header';
const HEADER_CLASS_NAME = 'header';
const HEADER_CONTAINER_CLASS_NAME = 'header__container';
const HEADER_CONTAINER_HIDDEN_CLASS = 'header__container_hidden';

// logoLink properties
const LOGO_LINK_TAG = 'a';
const LOGO_LINK_CLASS_NAME = 'header__logo-link';
const LOGO_LINK_ATTRIBUTES = {
  href: '#',
  [PAGE_NAME_ATTRIBUTE]: PageNames.MAIN,
};

// logoImg properties
const LOGO_IMG_TAG = 'img';
const LOGO_IMG_CLASS_NAME = 'header__logo-img';
const LOGO_IMG_ATTRIBUTES = {
  src: './assets/onPlug.png',
  [PAGE_NAME_ATTRIBUTE]: PageNames.MAIN,
};

export default class HeaderView extends View implements IHeaderView {
  private readonly container: IView;
  private readonly homePageLink: IElementCreator;
  private readonly navigation: ITopMenu;

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

  public getHomePageLink(): IElementCreator {
    return this.homePageLink;
  }
  public getHeaderContainer(): IView {
    return this.container;
  }

  public getNavigation(): ITopMenu {
    return this.navigation;
  }

  public hideNavigation(): void {
    console.log('LOGIN/REGISTRATION');
    this.navigation.getViewCreator().setClasses(HEADER_CONTAINER_HIDDEN_CLASS);
  }

  public showNavigation(): void {
    console.log('OTHER');
    this.navigation.getViewCreator().removeClasses(HEADER_CONTAINER_HIDDEN_CLASS);
  }

  private configureView(): void {
    this.container.getViewCreator().setClasses(HEADER_CONTAINER_CLASS_NAME);
    this.homePageLink.addInnerElement(this.createLogoImg(LOGO_IMG_ATTRIBUTES, LOGO_IMG_CLASS_NAME).getElement());
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
    return homePageLink;
  }

  private createLogoImg(imgAttributes: Record<string, string>, ...classes: string[]): IElementCreator {
    const params: ElementCreatorParams = {
      tag: LOGO_IMG_TAG,
      classNames: classes,
      attributes: imgAttributes,
    };
    const logoImg: IElementCreator = new ElementCreator(params);
    return logoImg;
  }
}
