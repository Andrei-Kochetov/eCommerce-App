import '@src/spa/view/pages/notFoundPage/notFoundPage.scss';
import ContainerView from '@src/spa/view/container/containerView';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';

// notFoundPage properties
const CONTAINER_CLASS_NAME = 'not-found';
const TEXT_TAG = 'p';
const TITLE_CLASS_NAME = 'not-found__title';
const SUBTITLE_CLASS_NAME = 'not-found__subtitle';
const TITLE_TEXT = 'Whoops!';
const SUBTITLE_TEXT = '404 Page Not Found';

// img properties
const IMG_TAG = 'img';
const IMG_CLASS_NAME = 'not-found__img';
const IMG_ATTRIBUTES = {
  src: './assets/404.png',
  alt: '404 error image',
};

export default class NotFoundPageView extends ContainerView {
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
    this.getViewCreator().addInnerElement(img, title, subTitle);
  }
}
