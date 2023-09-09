import '@src/spa/view/pages/basketPage/basketPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';
import { CustomBasketData, CustomBasketProductData } from '@src/spa/view/pages/basketPage/types';
import * as constants from '@src/spa/view/pages/basketPage/constants';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import SwiperView from '@src/spa/view/swiper/swiperView';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import BasketItemView from '@src/spa/view/pages/basketPage/basketItem/basketItemView';
import { HIDDEN_CLASS } from '../../header/types';

export default class BasketPageView extends PageView {
  private readonly data: CustomBasketData;
  private readonly promoCodeInput: HTMLInputElement;
  private readonly contentWrapper: IElementCreator;
  private readonly total: IElementCreator;
  private readonly discountedTotal: IElementCreator;

  public constructor(data: CustomBasketData) {
    super(PageNames.BASKET, constants.BASKET_PAGE_CLASS);
    this.data = data;
    this.promoCodeInput = BasketPageView.createTextInput(constants.PROMO_CODE_INPUT_CLASS);
    this.contentWrapper = SwiperView.createDivElement(constants.BASKET_CONTENT_WRAPPER_CLASS);
    this.total = new ElementCreator(constants.PRICE_ELEMENT_PARAMS);
    this.discountedTotal = new ElementCreator(constants.DISCOUNTED_PRICE_ELEMENT_PARAMS);
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
      this.contentWrapper.addInnerElement(this.createContent(data));
    }

    this.getViewCreator().addInnerElement(header, this.contentWrapper);
  }

  private createContent(data: CustomBasketData): IElementCreator {
    const content: IElementCreator = SwiperView.createDivElement(constants.BASKET_CONTENT_CLASS);
    const totalSection: IElementCreator = this.createTotalSection(data);

    data.products.forEach((product: CustomBasketProductData): void => {
      content.addInnerElement(new BasketItemView(product).getView());
    });
    content.addInnerElement(totalSection);

    return content;
  }

  private createTotalSection(data: CustomBasketData): IElementCreator {
    const wrapper: IElementCreator = SwiperView.createDivElement(constants.TOTAL_WRAPPER_CLASS);
    const text: IElementCreator = new ElementCreator(constants.TOTAL_TEXT_PARAMS);
    const priceWrapper: IElementCreator = SwiperView.createDivElement(constants.PRICE_WRAPPER_CLASS);

    this.total.setTextContent(data.totalPrice);
    if (data.discountPrice && data.discountPrice !== 'undefined') {
      this.discountedTotal.setTextContent(data.discountPrice);
    } else {
      this.discountedTotal.setTextContent('');
      this.discountedTotal.setClasses(HIDDEN_CLASS);
    }
    priceWrapper.addInnerElement(this.discountedTotal, this.total);
    wrapper.addInnerElement(text, priceWrapper);

    return wrapper;
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
