import { IHeader } from '@src/spa/view/header/types';
import HeaderView from '@src/spa/view/header/headerView';
import IView from '@src/spa/view/types';
import FooterView from '@src/spa/view/footer/footerView';
import { PageNames } from '@src/spa/view/pages/types';
import LoginPageView from '../loginPage/loginPageView';

export default class IBasePage {
  private readonly defaultPage: string = PageNames.MAIN;
  private readonly header: IHeader;
  // private readonly main: IMain;
  private readonly pages: Map<string, IView> = new Map();
  private currentPage: string = this.defaultPage;

  // pass here a main page
  public constructor() {
    this.header = new HeaderView();
    // this.main = new MainView();
  }

  public getHeader(): IHeader {
    return this.header;
  }

  // public getMain(): IMain {
  //   return this.main;
  // }

  public getCurrentPage(): IView {
    const page: IView | undefined = this.pages.get(this.currentPage);
    if (!page) throw new Error('App Error! Current page is missing!');
    return page;
  }

  public startRendering(): void {
    const footer: IView = new FooterView();
    document.body.append(this.header.getView(), footer.getView()); // insert this.main
    this.renderPage(this.defaultPage);
  }

  public renderPage(pageName: string): void {
    let page: IView | undefined = this.pages.get(pageName);
    this.currentPage = pageName;

    if (!page) {
      switch (pageName) {
        case PageNames.MAIN:
          // page = new HomePage();
          // this.pages.set(PageNames.MAIN, page);
          break;
        case PageNames.LOGIN:
          page = new LoginPageView();
          this.pages.set(PageNames.LOGIN, page);
          break;
        case PageNames.REGISTRATION:
          // page = new RegistrationPage();
          // this.pages.set(PageNames.REGISTRATION, page);
          break;
        case PageNames.NOT_FOUND:
          // page = new NotFoundPageView();
          // this.pages.set(PageNames.NOT_FOUND, page);
          break;
        // TODO add other pages
      }
    }

    // this.main.addPage(page);
  }
}
