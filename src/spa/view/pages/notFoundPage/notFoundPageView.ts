import '@src/spa/view/pages/notFoundPage/notFoundPage.scss';
import View from '@src/spa/view/view';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import ButtonView from '@src/spa/view/button/buttonView';
import { PAGE_NAME_ATTRIBUTE, PageNames } from '@src/spa/view/pages/types';
import { btnParams } from '@src/spa/view/button/types';
import { IRouter } from '@src/spa/logic/router/types';
import { IController } from '@src/spa/logic/controller/types';
import Controller from '@src/spa/logic/controller/controller';

// notFoundPage properties
const CONTAINER_CLASS_NAME = 'not-found';
const CONTAINER_TAG = 'div';
const TEXT_TAG = 'p';
const TITLE_CLASS_NAME = 'not-found__title';
const SUBTITLE_CLASS_NAME = 'not-found__subtitle';
const TITLE_TEXT = 'Whoops!';
const SUBTITLE_TEXT = '404 Page Not Found';

// img properties
const IMG_TAG = 'div';
const IMG_CLASS_NAME = 'not-found__img';

// BTN properties
const MAIN_BTN_TEXT = 'Main';
const MAIN_BTN_CLASS_NAME = 'btn_to-main-page';

export default class NotFoundPageView extends View {
  private readonly mainBTN: IElementCreator;
  private readonly controller: IController;

  constructor(router: IRouter) {
    const params: ElementCreatorParams = {
      tag: CONTAINER_TAG,
      classNames: [CONTAINER_CLASS_NAME],
    };
    super(params);

    this.mainBTN = this.createMainBTN();
    this.configureView();
    this.controller = new Controller(router);
  }

  private configureView(): void {
    const imgParams: ElementCreatorParams = {
      tag: IMG_TAG,
      classNames: [IMG_CLASS_NAME],
    };
    const img = new ElementCreator(imgParams);

    const titleParams: ElementCreatorParams = {
      tag: TEXT_TAG,
      classNames: [TITLE_CLASS_NAME],
    };
    const title = new ElementCreator(titleParams);

    const subTitleParams: ElementCreatorParams = {
      tag: TEXT_TAG,
      classNames: [SUBTITLE_CLASS_NAME],
    };
    const subTitle = new ElementCreator(subTitleParams);

    title.setTextContent(TITLE_TEXT);
    subTitle.setTextContent(SUBTITLE_TEXT);

    this.getViewCreator().setClasses(CONTAINER_CLASS_NAME);
    this.getViewCreator().addInnerElement(img, title, subTitle, this.mainBTN);
  }

  private createMainBTN(): IElementCreator {
    const params: btnParams = {
      textContent: MAIN_BTN_TEXT,
      classNames: [MAIN_BTN_CLASS_NAME],
    };

    const button: IElementCreator = new ButtonView(params).getViewCreator();
    button.setAttributes({ [PAGE_NAME_ATTRIBUTE]: PageNames.MAIN });
    button.setListeners({
      event: 'click',
      callback: (): void => this.controller.goTo(button.getElement()),
    });
    return button;
  }
}
