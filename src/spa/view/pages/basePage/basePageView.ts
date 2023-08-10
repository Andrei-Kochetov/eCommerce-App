import View from '@src/spa/view/view';
import { IHeader } from '@src/spa/view/header/types';
import HeaderView from '@src/spa/view/header/headerView';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';
import FooterView from '@src/spa/view/footer/footerView';

const SPA_WRAPPER_TAG = 'div';
const SPA_WRAPPER_CLASSES = ['spa'];

export default class BasePageView extends View {
  private header: IHeader;
  // private main: IMain;
  // pass here a main page
  public constructor() {
    const params: ElementCreatorParams = {
      tag: SPA_WRAPPER_TAG,
      classNames: SPA_WRAPPER_CLASSES,
    };
    super(params);
    this.header = new HeaderView();
    // this.main = new MainView();
    this.configureView();
  }

  public getHeader(): IHeader {
    return this.header;
  }

  // public getMain(): IMain {
  //   return this.main;
  // }

  private configureView(): void {
    const footer: IView = new FooterView();
    this.getViewCreator().addInnerElement(this.header.getView(), footer.getView()); // insert this.main
  }
}
