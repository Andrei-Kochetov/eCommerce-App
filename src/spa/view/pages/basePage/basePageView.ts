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
    this.header.getHumburgerMenu().removeClasses('active');
    this.header.getNavigation().getViewCreator().removeClasses('active');
    if (page instanceof LoginPageView || page instanceof RegistrationPageView) {
      state.setRecord(APP_STATE_KEYS.IS_SPECIAL_PAGE, 'true');
    } else {
      state.setRecord(APP_STATE_KEYS.IS_SPECIAL_PAGE, 'false');
    }

    this.header.updateHeader();
    this.main.addPage(page);
  }
}
