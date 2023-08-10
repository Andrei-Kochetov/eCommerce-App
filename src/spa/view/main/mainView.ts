import '@src/spa/view/main/main.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import HomePageView from '@src/spa/view/pages/homePage/homePageView';
import NotFoundPageView from '@src/spa/view/pages/notFoundPage/notFoundPageView';
import IView from '@src/spa/view/types';

// mainSection properties
const MAIN_TAG = 'main';
const MAIN_CLASS_NAME = 'main';

export default class MainView extends View {
  private readonly homePage: IView;
  private readonly notFoundPage: IView;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: MAIN_TAG,
      classNames: [MAIN_CLASS_NAME],
    };
    super(params);

    this.homePage = new HomePageView();
    this.notFoundPage = new NotFoundPageView();

    this.configureView();
  }

  private configureView(): void {
    this.setHomePage();
  }

  public setHomePage(): void {
    this.getViewCreator().clearInnerHTML();
    this.getViewCreator().addInnerElement(this.homePage.getView());
  }

  public setNotFoundPage(): void {
    this.getViewCreator().clearInnerHTML();
    this.getViewCreator().addInnerElement(this.notFoundPage.getView());
  }
}
