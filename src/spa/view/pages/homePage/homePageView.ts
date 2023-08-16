import '@src/spa/view/pages/homePage/homePage.scss';
import View from '@src/spa/view/view';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';

// container properties
const CONTAINER_CLASS_NAME = 'home-page';
const CONTAINER_TAG = 'div';

// img properties
const IMG_TAG = 'div';
const IMG_CLASS_NAME = 'home-page__img';

// Content properties
const CONTENT_CONTAINER_CLASS_NAME = 'home-page__content-container';
const CONTENT_CONTAINER_TAG = 'div';
const TITLE_TAG = 'p';
const TITLE_CLASS_NAME = 'home-page__title';
const CONTENT_TAG = 'p';
const CONTENT_CLASS_NAME = 'home-page__content';

// text content
const TEXT_TITLE = 'Hello!';
const TEXT_CONTENT_FIRST = `We are glad to welcome you on the pages of our online store! 
Here you can find quality products for every taste.`;
const TEXT_CONTENT_SECOND = 'We hope that shopping in our store will leave you only positive impressions.';

export default class HomePageView extends View {
  constructor() {
    const params: ElementCreatorParams = {
      tag: CONTAINER_TAG,
      classNames: [CONTAINER_CLASS_NAME],
    };
    super(params);

    this.configureView();
  }

  private configureView(): void {
    const imgParams: ElementCreatorParams = {
      tag: IMG_TAG,
      classNames: [IMG_CLASS_NAME],
    };
    const img = new ElementCreator(imgParams);

    const contentContainerParams: ElementCreatorParams = {
      tag: CONTENT_CONTAINER_TAG,
      classNames: [CONTENT_CONTAINER_CLASS_NAME],
    };
    const contentContainer = new ElementCreator(contentContainerParams);

    const titleParams: ElementCreatorParams = {
      tag: TITLE_TAG,
      classNames: [TITLE_CLASS_NAME],
    };
    const title = new ElementCreator(titleParams);
    title.setTextContent(TEXT_TITLE);

    const contentFirstParams: ElementCreatorParams = {
      tag: CONTENT_TAG,
      classNames: [CONTENT_CLASS_NAME],
    };
    const contentFirst = new ElementCreator(contentFirstParams);
    contentFirst.setTextContent(TEXT_CONTENT_FIRST);

    const contentSecondParams: ElementCreatorParams = {
      tag: CONTENT_TAG,
      classNames: [CONTENT_CLASS_NAME],
    };
    const contentSecond = new ElementCreator(contentSecondParams);
    contentSecond.setTextContent(TEXT_CONTENT_SECOND);

    contentContainer.addInnerElement(title, contentFirst, contentSecond);
    this.getViewCreator().setClasses(CONTAINER_CLASS_NAME);
    this.getViewCreator().addInnerElement(img, contentContainer);
  }
}
