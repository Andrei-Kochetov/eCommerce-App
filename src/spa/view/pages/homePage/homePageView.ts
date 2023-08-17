import '@src/spa/view/pages/homePage/homePage.scss';
import View from '@src/spa/view/view';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';

// container properties
const CONTAINER_CLASS_NAME = 'home-page';
const CONTAINER_TAG = 'div';

// img properties
const IMG_CONTAINER_CLASS_NAME = 'home-page__img-container';
const IMG_CONTAINER_TAG = 'div';
const IMG_TAG = 'img';
const IMG_CLASS_NAME = 'home-page__img';
const IMG_ATTRIBUTES = {
  src: './assets/mainPageImg.png',
  alt: 'Happy shopper image',
};

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
    const imgtContainerParams: ElementCreatorParams = {
      tag: IMG_CONTAINER_TAG,
      classNames: [IMG_CONTAINER_CLASS_NAME],
    };
    const imgParams: ElementCreatorParams = {
      tag: IMG_TAG,
      classNames: [IMG_CLASS_NAME],
      attributes: IMG_ATTRIBUTES,
    };
    const contentContainerParams: ElementCreatorParams = {
      tag: CONTENT_CONTAINER_TAG,
      classNames: [CONTENT_CONTAINER_CLASS_NAME],
    };
    const titleParams: ElementCreatorParams = {
      tag: TITLE_TAG,
      classNames: [TITLE_CLASS_NAME],
    };
    const contentFirstParams: ElementCreatorParams = {
      tag: CONTENT_TAG,
      classNames: [CONTENT_CLASS_NAME],
    };
    const contentSecondParams: ElementCreatorParams = {
      tag: CONTENT_TAG,
      classNames: [CONTENT_CLASS_NAME],
    };
    const imgContainer = new ElementCreator(imgtContainerParams);
    const img = new ElementCreator(imgParams);
    imgContainer.addInnerElement(img);
    const contentContainer = new ElementCreator(contentContainerParams);
    const title = new ElementCreator(titleParams);
    title.setTextContent(TEXT_TITLE);
    const contentFirst = new ElementCreator(contentFirstParams);
    contentFirst.setTextContent(TEXT_CONTENT_FIRST);
    const contentSecond = new ElementCreator(contentSecondParams);
    contentSecond.setTextContent(TEXT_CONTENT_SECOND);
    contentContainer.addInnerElement(title, contentFirst, contentSecond);
    this.getViewCreator().setClasses(CONTAINER_CLASS_NAME);
    this.getViewCreator().addInnerElement(imgContainer, contentContainer);
  }
}
