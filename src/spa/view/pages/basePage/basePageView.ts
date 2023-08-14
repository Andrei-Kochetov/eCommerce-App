import { IHeader } from '@src/spa/view/header/types';
import HeaderView from '@src/spa/view/header/headerView';
import IView from '@src/spa/view/types';
import FooterView from '@src/spa/view/footer/footerView';
import LoginPageView from '@src/spa/view/pages/loginPage/loginPageView';
import { IMain } from '@src/spa/view/main/types';
import MainView from '@src/spa/view/main/mainView';
import RegistrationPageView from '@src/spa/view/pages/registrationPage/registrationPageView';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import State from '@src/spa/logic/state/state';
import { IBasePage } from '@src/spa/view/pages/basePage/types';

export default class BasePage implements IBasePage {
  private readonly header: IHeader;
  private readonly main: IMain;

  public constructor() {
    this.header = new HeaderView();
    this.main = new MainView();
  }

  public getHeader(): IHeader {
    return this.header;
  }

  public getMain(): IMain {
    return this.main;
  }

  public startRendering(): void {
    const footer: IView = new FooterView();
    document.body.append(this.header.getView(), this.main.getView(), footer.getView());
  }

  public renderPage(page: IView): void {
    const state: IState = State.getInstance();

    if (page instanceof LoginPageView || page instanceof RegistrationPageView) {
      state.setRecord(APP_STATE_KEYS.IS_SPECIAL_PAGE, 'true');
    } else {
      state.setRecord(APP_STATE_KEYS.IS_SPECIAL_PAGE, 'false');
    }

    this.header.updateHeader();
    this.main.addPage(page);
  }

  // private getPage(pageName: string): IView {
  //   let page: IView;
  //   switch (pageName) {
  //     case PageNames.MAIN:
  //       page = new HomePageView();
  //       this.pages.set(PageNames.MAIN, page);
  //       return page;
  //     case PageNames.LOGIN:
  //       page = new LoginPageView();
  //       this.pages.set(PageNames.LOGIN, page);
  //       return page;
  //     case PageNames.REGISTRATION:
  //       page = new RegistrationPageView();
  //       this.pages.set(PageNames.REGISTRATION, page);
  //       return page;
  //     case PageNames.CATALOG:
  //       page = this.getNotFoundPage(); // later change on catalog page
  //       this.pages.set(PageNames.CATALOG, page);
  //       return page;
  //     case PageNames.PROFILE:
  //       page = this.getNotFoundPage(); // later change on PROFILE page
  //       this.pages.set(PageNames.PROFILE, page);
  //       return page;
  //     case PageNames.BASKET:
  //       page = this.getNotFoundPage(); // later change on BASKET page
  //       this.pages.set(PageNames.BASKET, page);
  //       return page;
  //     case PageNames.ABOUT_US:
  //       page = this.getNotFoundPage(); // later change on ABOUT_US page
  //       this.pages.set(PageNames.ABOUT_US, page);
  //       return page;
  //     default:
  //       return this.getNotFoundPage();
  //   }
  // }

  // private getNotFoundPage(): IView {
  //   let page: IView | undefined = this.pages.get(PageNames.NOT_FOUND);
  //   if (!page) {
  //     page = new NotFoundPageView();
  //     this.pages.set(PageNames.NOT_FOUND, page);
  //   }
  //   return page;
  // }
}
