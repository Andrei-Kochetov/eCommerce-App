import '@src/spa/view/pages/homePage/homePage.scss';
import View from '@src/spa/view/view';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';

// container properties
const CONTAINER_CLASS_NAME = 'home-page';
const CONTAINER_TAG = 'div';

// img properties
const IMG_TAG = 'div';
const IMG_CONTAINER_CLASS_NAME = 'home-page__img-container';
const IMG_CONTAINER_TAG = 'div';
const IMG_CLASS_NAME = 'home-page__img';

// Content properties
const CONTENT_CONTAINER_CLASS_NAME = 'home-page__content-container';
const CONTENT_CONTAINER_TAG = 'div';
const TITLE_TAG = 'p';
const TITLE_CLASS_NAME = 'home-page__title';
const CONTENT_TAG = 'p';
const CONTENT_CLASS_NAME = 'home-page__content';
const CONTENT_PROMO_CODE = 'home-page__content-promocode';

// text content
const TEXT_TITLE = 'Hello!';
const TEXT_CONTENT_FIRST = `We are glad to welcome you on the pages of our online store! 
Here you can find quality products for every taste.`;
const TEXT_CONTENT_SECOND = 'We hope that shopping in our store will leave you only positive impressions.';
const TEXT_PROMO_CODE_INFO =
  'We have a promotion, enter the promotional code in the cart and get a 33% discount on all products: ';
const TEXT_PROMO_CODE = 'sale_33_percent_on_everything';
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
    const contentPromocodeParams: ElementCreatorParams = {
      tag: CONTENT_TAG,
      classNames: [CONTENT_PROMO_CODE],
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
    const contentPromocodeInfo = new ElementCreator(contentSecondParams);
    contentPromocodeInfo.setTextContent(TEXT_PROMO_CODE_INFO);
    const promocode = new ElementCreator(contentPromocodeParams);
    promocode.setTextContent(TEXT_PROMO_CODE);
    contentContainer.addInnerElement(title, contentFirst, contentSecond, contentPromocodeInfo, promocode);
    this.getViewCreator().setClasses(CONTAINER_CLASS_NAME);
    this.getViewCreator().addInnerElement(imgContainer, contentContainer);
  }
}
