import { IHeader } from '@src/spa/view/header/types';
import HeaderView from '@src/spa/view/header/headerView';
import IView from '@src/spa/view/types';
import FooterView from '@src/spa/view/footer/footerView';
import { PageNames } from '@src/spa/view/pages/types';
import LoginPageView from '../loginPage/loginPageView';
import { IMain } from '@src/spa/view/main/types';
import MainView from '@src/spa/view/main/mainView';
import HomePageView from '@src/spa/view/pages/homePage/homePageView';
import NotFoundPageView from '@src/spa/view/pages/notFoundPage/notFoundPageView';
import RegistrationPageView from '@src/spa/view/pages/registrationPage/registrationPageView';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';

export default class IBasePage {
  private readonly defaultPage: string = PageNames.MAIN;
  private readonly header: IHeader;
  private readonly main: IMain;
  private readonly pages: Map<string, IView> = new Map();
  private readonly state: IState;
  private currentPage = '';

  public constructor(state: IState) {
    this.header = new HeaderView(state);
    this.main = new MainView();
    this.state = state;
  }

  public getHeader(): IHeader {
    return this.header;
  }

  public getMain(): IMain {
    return this.main;
  }

  public getCurrentPage(): IView {
    const page: IView | undefined = this.pages.get(this.currentPage);
    if (!page) throw new Error('App Error! Current page is missing!');
    return page;
  }

  public startRendering(): void {
    const footer: IView = new FooterView();
    document.body.append(this.header.getView(), this.main.getView(), footer.getView());
    this.renderPage(this.defaultPage);
  }

  public renderPage(pageName: string): void {
    let page: IView | undefined = this.pages.get(pageName);
    if (pageName === this.currentPage) return; // blocking rendering same page
    this.currentPage = pageName;

    if (!page) {
      page = this.getPage(pageName);
    }

    if (page instanceof LoginPageView || page instanceof RegistrationPageView) {
      this.state.setRecord(APP_STATE_KEYS.IS_SPECIAL_PAGE, 'true');
    } else {
      this.state.setRecord(APP_STATE_KEYS.IS_SPECIAL_PAGE, 'false');
    }

    this.header.updateHeader();
    this.main.addPage(page);
  }

  private getPage(pageName: string): IView {
    let page: IView;
    switch (pageName) {
      case PageNames.MAIN:
        page = new HomePageView();
        this.pages.set(PageNames.MAIN, page);
        return page;
      case PageNames.LOGIN:
        page = new LoginPageView();
        this.pages.set(PageNames.LOGIN, page);
        return page;
      case PageNames.REGISTRATION:
        page = new RegistrationPageView();
        this.pages.set(PageNames.REGISTRATION, page);
        return page;
      case PageNames.CATALOG:
        page = this.getNotFoundPage(); // later change on catalog page
        this.pages.set(PageNames.CATALOG, page);
        return page;
      case PageNames.PROFILE:
        page = this.getNotFoundPage(); // later change on PROFILE page
        this.pages.set(PageNames.PROFILE, page);
        return page;
      case PageNames.BASKET:
        page = this.getNotFoundPage(); // later change on BASKET page
        this.pages.set(PageNames.BASKET, page);
        return page;
      case PageNames.ABOUT_US:
        page = this.getNotFoundPage(); // later change on ABOUT_US page
        this.pages.set(PageNames.ABOUT_US, page);
        return page;
      default:
        return this.getNotFoundPage();
    }
  }

  private getNotFoundPage(): IView {
    let page: IView | undefined = this.pages.get(PageNames.NOT_FOUND);
    if (!page) {
      page = new NotFoundPageView();
      this.pages.set(PageNames.NOT_FOUND, page);
    }
    return page;
  }
}
