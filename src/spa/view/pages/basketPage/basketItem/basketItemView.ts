import View from '@src/spa/view/view';
import * as constants from '@src/spa/view/pages/basketPage/basketItem/constants';
import { CustomBasketProductData } from '@src/spa/view/pages/basketPage/types';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import SwiperView from '@src/spa/view/swiper/swiperView';
import ButtonView from '@src/spa/view/button/buttonView';
import BasketPageView from '@src/spa/view/pages/basketPage/basketPageView';
import {
  CROSSED_PRICE_CLASS,
  DISCOUNTED_PRICE_ELEMENT_PARAMS,
  PRICE_ELEMENT_PARAMS,
  PRICE_WRAPPER_CLASS,
} from '@src/spa/view/pages/basketPage/constants';
import { HIDDEN_CLASS } from '@src/spa/view/header/types';
import { IBasketPageLogic } from '@src/spa/logic/basket/basketPageLogic/types';
import { IBasketItem } from '@src/spa/view/pages/basketPage/basketItem/types';

export default class BasketItemView extends View implements IBasketItem {
  private readonly data: CustomBasketProductData;
  private readonly amountInput: HTMLInputElement;
  private readonly increaseAmountBTN: IElementCreator;
  private readonly reduceAmountBTN: IElementCreator;
  private readonly removeItemBTN: IElementCreator;
  private readonly price: IElementCreator;
  private readonly discountedPrice: IElementCreator;

  private readonly logic: IBasketPageLogic;

  public constructor(data: CustomBasketProductData, logic: IBasketPageLogic) {
    super(constants.BASKET_ITEM_PARAMS);
    this.data = data;
    this.amountInput = BasketPageView.createNumberInput(constants.INPUT_CLASS);
    this.increaseAmountBTN = new ButtonView(constants.INCREASE_AMOUNT_BTN_PARAMS).getViewCreator();
    this.reduceAmountBTN = new ButtonView(constants.REDUCE_AMOUNT_BTN_PARAMS).getViewCreator();
    this.removeItemBTN = new ButtonView(constants.REMOVE_ITEM_BTN_PARAMS).getViewCreator();
    this.price = new ElementCreator(PRICE_ELEMENT_PARAMS);
    this.discountedPrice = new ElementCreator(DISCOUNTED_PRICE_ELEMENT_PARAMS);
    this.logic = logic;
    this.configureView(data);
  }

  public getData(): CustomBasketProductData {
    return this.data;
  }

  public getAmountInput(): HTMLInputElement {
    return this.amountInput;
  }

  public getProductId(): string {
    return this.data.id;
  }

  public changeProductPriceAndDiscountedPrice(price: string, discountedPrice: string | null): void {
    this.price.setTextContent(`${+price / 100} $`);
    if (discountedPrice !== 'undefined' && discountedPrice) {
      this.discountedPrice.setTextContent(`${+discountedPrice / 100} $`);
      this.price.setClasses(CROSSED_PRICE_CLASS);
    } else {
      this.discountedPrice.setTextContent('');
      this.discountedPrice.setClasses(HIDDEN_CLASS);
    }
  }

  private configureView(data: CustomBasketProductData): void {
    const basketProduct: IElementCreator = SwiperView.createDivElement(constants.BASKET_PRODUCT_CLASS);
    const img: IElementCreator = new ElementCreator(constants.ITEM_IMG_PARAMS);
    const link: IElementCreator = this.createLink(data);
    const amountWrapper: IElementCreator = this.createAmountWrapper(data);
    const priceWrapper: IElementCreator = SwiperView.createDivElement(PRICE_WRAPPER_CLASS);

    img.setAttributes({ src: data.imgURLs[0] });
    basketProduct.addInnerElement(img, link, amountWrapper, this.removeItemBTN);

    this.price.setTextContent(`${+data.price / 100} $`);
    if (data.discountPrice && data.discountPrice !== 'undefined') {
      this.discountedPrice.setTextContent(`${+data.discountPrice / 100} $`);
      this.price.setClasses(CROSSED_PRICE_CLASS);
    } else {
      this.discountedPrice.setTextContent('');
      this.discountedPrice.setClasses(HIDDEN_CLASS);
    }
    priceWrapper.addInnerElement(this.discountedPrice, this.price);

    this.getViewCreator().addInnerElement(basketProduct, priceWrapper);
    this.setListeners();
  }

  private createLink(data: CustomBasketProductData): IElementCreator {
    const params: ElementCreatorParams = {
      tag: 'a',
      classNames: ['basket-product__link'],
      attributes: {
        href: data.path,
      },
      textContent: data.name,
    };
    return new ElementCreator(params);
  }

  private createAmountWrapper(data: CustomBasketProductData): IElementCreator {
    const wrapper: IElementCreator = SwiperView.createDivElement(constants.AMOUNT_WRAPPER_CLASS);
    this.amountInput.value = data.productAmount;
    wrapper.addInnerElement(this.reduceAmountBTN, this.amountInput, this.increaseAmountBTN);
    return wrapper;
  }

  private setListeners(): void {
    this.amountInput.addEventListener('blur', (): void => {
      this.logic.changheProductAmountInputHandler(this);
    });
    this.amountInput.addEventListener('keyup', (event): void => {
      if (event.code === 'Enter') this.logic.changheProductAmountInputHandler(this);
    });
    this.reduceAmountBTN.setListeners({
      event: 'click',
      callback: (): void => this.logic.reduceProductAmountBTNHandler(this),
    });
    this.increaseAmountBTN.setListeners({
      event: 'click',
      callback: (): void => this.logic.increaseProductAmountBTNHandler(this),
    });
    this.removeItemBTN.setListeners({
      event: 'click',
      callback: (): void => this.logic.removeProductFromBasket(this),
    });
  }
}
