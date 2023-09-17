import '@src/spa/view/pages/basketPage/basketPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';
import { CustomBasketData, CustomBasketProductData, IBasketPage } from '@src/spa/view/pages/basketPage/types';
import * as constants from '@src/spa/view/pages/basketPage/constants';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import SwiperView from '@src/spa/view/swiper/swiperView';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import BasketItemView from '@src/spa/view/pages/basketPage/basketItem/basketItemView';
import { HIDDEN_CLASS } from '@src/spa/view/header/types';
import ButtonView from '@src/spa/view/button/buttonView';
import { IBasketPageLogic } from '@src/spa/logic/basket/basketPageLogic/types';
import { BasketPageLogic } from '@src/spa/logic/basket/basketPageLogic/basketPageLogic';
import { IBasketItem } from '@src/spa/view/pages/basketPage/basketItem/types';

export default class BasketPageView extends PageView implements IBasketPage {
  private readonly data: CustomBasketData;
  private readonly promoCodeInput: HTMLInputElement;
  private readonly contentWrapper: IElementCreator;
  private readonly total: IElementCreator;
  private readonly discountedTotal: IElementCreator;
  private readonly clearBasketBTN: IElementCreator;
  private readonly resetPromocodetBTN: IElementCreator;
  private readonly promoCodeBTN: IElementCreator;
  private applyPromocode: boolean;
  private readonly items: Map<string, IBasketItem>;
  private readonly logic: IBasketPageLogic = new BasketPageLogic(this);

  public constructor(data: CustomBasketData) {
    super(PageNames.BASKET, constants.BASKET_PAGE_CLASS);
    this.data = data;
    this.promoCodeInput = BasketPageView.createTextInput(constants.PROMO_CODE_INPUT_CLASS);
    this.promoCodeBTN = new ButtonView(constants.PROMO_CODE_BTN_PARAMS).getViewCreator();
    this.contentWrapper = SwiperView.createDivElement(constants.BASKET_CONTENT_WRAPPER_CLASS);
    this.total = new ElementCreator(constants.PRICE_ELEMENT_PARAMS);
    this.discountedTotal = new ElementCreator(constants.DISCOUNTED_PRICE_ELEMENT_PARAMS);
    this.clearBasketBTN = new ButtonView(constants.CLEAR_BASKET_BTN_PARAMS).getViewCreator();
    this.resetPromocodetBTN = new ButtonView(constants.RESET_PROMO_CODE_BTN_PARAMS).getViewCreator();
    this.applyPromocode = data.hasPromocode;
    this.items = new Map();
    this.configureView(data);
  }

  public static createTextInput(...classes: string[]): HTMLInputElement {
    const element: HTMLInputElement = document.createElement('input');
    element.setAttribute('type', 'text');
    element.classList.add(...classes);

    return element;
  }

  public static createNumberInput(...classes: string[]): HTMLInputElement {
    const element: HTMLInputElement = document.createElement('input');
    element.setAttribute('type', 'number');
    element.classList.add(...classes);

    return element;
  }

  public getData(): CustomBasketData {
    return this.data;
  }

  // return false if no need to recalculate prices and total, otherwise true
  public removeProduct(product: IBasketItem): boolean {
    this.items.delete(product.getData().id);
    const rest: number = Array.from(this.items.values()).length;

    if (rest === 0) {
      this.showEmptyBasketView();
      return false;
    } else {
      product.getView().remove();
      return true;
    }
  }

  public clearBasket(): void {
    this.items.clear();
    this.showEmptyBasketView();
  }

  public changeTotalAndDiscountedTotalPrices(totalPrice: string, discountedTotal: string | null): void {
    this.total.setTextContent(`${+totalPrice / 100} $`);
    if (discountedTotal && discountedTotal !== 'undefined' && this.applyPromocode) {
      this.discountedTotal.setTextContent(`With promocode ${+discountedTotal / 100} $`);
      this.discountedTotal.removeClasses(HIDDEN_CLASS);
      this.total.setClasses(constants.CROSSED_PRICE_CLASS);
    } else if (discountedTotal && discountedTotal !== 'undefined' && !this.applyPromocode) {
      this.discountedTotal.setTextContent(`${+discountedTotal / 100} $`);
      this.total.setClasses(constants.CROSSED_PRICE_CLASS);
    } else {
      this.discountedTotal.setTextContent('');
      this.discountedTotal.setClasses(HIDDEN_CLASS);
      this.total.removeClasses(constants.CROSSED_PRICE_CLASS);
    }
  }

  private showEmptyBasketView(): void {
    this.contentWrapper.clearInnerHTML();
    this.contentWrapper.addInnerElement(this.createEmptyBasketView());
    this.promoCodeInput.value = '';
  }

  private configureView(data: CustomBasketData): void {
    const header: IElementCreator = this.createPageHeader();

    if (data.products.length === 0) {
      this.contentWrapper.addInnerElement(this.createEmptyBasketView());
    } else {
      this.contentWrapper.addInnerElement(this.createContent(data));
    }

    this.getViewCreator().addInnerElement(header, this.contentWrapper);
    this.setListeners();
  }

  private createContent(data: CustomBasketData): IElementCreator {
    const content: IElementCreator = SwiperView.createDivElement(constants.BASKET_CONTENT_CLASS);
    const totalSection: IElementCreator = this.createTotalSection(data);

    data.products.forEach((product: CustomBasketProductData): void => {
      const item: IBasketItem = new BasketItemView(product, this.logic);
      this.items.set(product.id, item);
      content.addInnerElement(item.getView());
    });

    const wrapper = SwiperView.createDivElement(constants.BASKET_WRAPPER_BTN_CLASS);
    if (!this.applyPromocode) this.resetPromocodetBTN.setClasses(constants.RESET_PROMOCODE_BTN_DISABLED_CLASS);
    wrapper.addInnerElement(this.clearBasketBTN, this.resetPromocodetBTN);
    content.addInnerElement(totalSection, wrapper.getElement());
    return content;
  }

  private createTotalSection(data: CustomBasketData): IElementCreator {
    const wrapper: IElementCreator = SwiperView.createDivElement(constants.TOTAL_WRAPPER_CLASS);
    const text: IElementCreator = new ElementCreator(constants.TOTAL_TEXT_PARAMS);
    const priceWrapper: IElementCreator = SwiperView.createDivElement(constants.PRICE_WRAPPER_CLASS);

    this.total.setTextContent(`${+data.totalPrice / 100} $`);

    if (data.discountPrice && data.discountPrice !== 'undefined' && this.applyPromocode) {
      this.discountedTotal.setTextContent(`With promocode ${+data.discountPrice / 100} $`);
      this.discountedTotal.removeClasses(HIDDEN_CLASS);
      this.total.setClasses(constants.CROSSED_PRICE_CLASS);
    } else if (data.discountPrice && data.discountPrice !== 'undefined' && !this.applyPromocode) {
      this.discountedTotal.setTextContent(`${+data.discountPrice / 100} $`);
      this.total.setClasses(constants.CROSSED_PRICE_CLASS);
    } else {
      this.discountedTotal.setTextContent('');
      this.discountedTotal.setClasses(HIDDEN_CLASS);
      this.total.removeClasses(constants.CROSSED_PRICE_CLASS);
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
    promoCode.addInnerElement(promoCodeImg, this.promoCodeInput, this.promoCodeBTN);

    return promoCode;
  }

  private setListeners(): void {
    this.clearBasketBTN.setListeners({
      event: 'click',
      callback: (): void => this.logic.clearBasket(this.applyPromocode),
    });
    this.promoCodeBTN.setListeners({
      event: 'click',
      callback: (): void => {
        if (!this.promoCodeInput.value) return;
        this.applyPromocode = true;
        this.logic.setPromoCode(this.promoCodeInput);
        this.resetPromocodetBTN.removeClasses(constants.RESET_PROMOCODE_BTN_DISABLED_CLASS);
      },
    });
    this.resetPromocodetBTN.setListeners({
      event: 'click',
      callback: (): void => {
        if (this.applyPromocode) {
          this.logic.deletePromoCode();
          this.applyPromocode = false;
          this.resetPromocodetBTN.setClasses(constants.RESET_PROMOCODE_BTN_DISABLED_CLASS);
        } else {
          return;
        }
      },
    });
  }
}
