import '@src/spa/view/pages/basketPage/basketPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';
import { CustomBasketData } from '@src/spa/view/pages/basketPage/types';
import * as constants from '@src/spa/view/pages/basketPage/constants';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import SwiperView from '@src/spa/view/swiper/swiperView';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';

export default class BasketPageView extends PageView {
  private readonly data: CustomBasketData;
  private readonly promoCodeInput: HTMLInputElement;
  private readonly contentWrapper: IElementCreator;

  public constructor(data: CustomBasketData) {
    super(PageNames.BASKET, constants.BASKET_PAGE_CLASS);
    this.data = data;
    this.promoCodeInput = BasketPageView.createTextInput(constants.PROMO_CODE_INPUT_CLASS);
    this.contentWrapper = SwiperView.createDivElement(constants.BASKET_CONTENT_WRAPPER_CLASS);
    this.configureView(data);
  }

  public static createTextInput(...classes: string[]): HTMLInputElement {
    const element: HTMLInputElement = document.createElement('input');
    element.setAttribute('type', 'text');
    element.classList.add(...classes);

    return element;
  }

  private configureView(data: CustomBasketData): void {
    const header: IElementCreator = this.createPageHeader();

    if (data.products.length === 0) {
      this.contentWrapper.addInnerElement(this.createEmptyBasketView());
    } else {
      console.log(data.products);
    }

    this.getViewCreator().addInnerElement(header, this.contentWrapper);
  }

  private createEmptyBasketView(): IElementCreator {
    const emptyBasket: IElementCreator = SwiperView.createDivElement(constants.EMPTY_BASKET_CLASS);
    const img: IElementCreator = new ElementCreator(constants.EMPTY_BASKET_IMG_PARAMS);
    const title: IElementCreator = new ElementCreator(constants.EMPTY_BASKET_TITLE_PARAMS);
    const span_1: IElementCreator = new ElementCreator(constants.EMPTY_BASKET_TEXT_1_PARAMS);
    const span_2: IElementCreator = new ElementCreator(constants.EMPTY_BASKET_TEXT_2_PARAMS);
    const link: IElementCreator = new ElementCreator(constants.EMPTY_BASKET_LINK_PARAMS);
    const textWrapper: IElementCreator = new ElementCreator(constants.EMPTY_BASKET_TEXT_WRAPPER_PARAMS);

    textWrapper.addInnerElement(span_1, link, span_2);
    emptyBasket.addInnerElement(img, title, textWrapper);

    return emptyBasket;
  }

  private createPageHeader(): IElementCreator {
    const header: IElementCreator = SwiperView.createDivElement(constants.PAGE_HEADER_CLASS);
    const title: IElementCreator = new ElementCreator(constants.PAGE_TITLE_PARAMS);
    const promoCode: IElementCreator = this.createPromoCodeElement();

    header.addInnerElement(title, promoCode);
    return header;
  }

  private createPromoCodeElement(): IElementCreator {
    const promoCode: IElementCreator = SwiperView.createDivElement(constants.PROMO_CODE_CLASS);
    const promoCodeImg: IElementCreator = new ElementCreator(constants.PROMO_CODE_IMG_PARAMS);

    this.promoCodeInput.setAttribute('placeholder', constants.PROMO_CODE_INPUT_PLACEHOLDER);
    promoCode.addInnerElement(promoCodeImg, this.promoCodeInput);

    return promoCode;
  }
}
