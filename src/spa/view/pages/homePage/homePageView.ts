import '@src/spa/view/pages/homePage/homePage.scss';
import ContainerView from '@src/spa/view/container/containerView';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';

// container properties
const CONTAINER_CLASS_NAME = 'main__container';

// img properties
const IMG_TAG = 'img';
const IMG_CLASS_NAME = 'main__img';
const IMG_ATTRIBUTES = {
  src: './assets/mainPageImg.png',
  alt: 'Happy shopper image',
};

// Content properties
const CONTENT_CONTAINER_CLASS_NAME = 'main__content-container';
const TITLE_TAG = 'p';
const TITLE_CLASS_NAME = 'main__title';
const CONTENT_TAG = 'p';
const CONTENT_CLASS_NAME = 'main__content';

// text content
const TEXT_TITLE = 'Hello!';
const TEXT_CONTENT_FIRST = `We are glad to welcome you on the pages of our online store! 
Here you can find quality products for every taste.`;
const TEXT_CONTENT_SECOND = 'We hope that shopping in our store will leave you only positive impressions.';

export default class HomePage extends ContainerView {
  constructor() {
    super();

    this.configureView();
  }

  private configureView(): void {
    const imgParams: ElementCreatorParams = {
      tag: IMG_TAG,
      classNames: [IMG_CLASS_NAME],
      attributes: IMG_ATTRIBUTES,
    };
    const img = new ElementCreator(imgParams);

    const container = new ContainerView();

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

    container.getViewCreator().setClasses(CONTENT_CONTAINER_CLASS_NAME);
    container.getViewCreator().addInnerElement(title, contentFirst, contentSecond);

    this.getViewCreator().setClasses(CONTAINER_CLASS_NAME);
    this.getViewCreator().addInnerElement(img, container.getViewCreator());
  }
}
