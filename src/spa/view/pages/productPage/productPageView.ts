import '@src/spa/view/pages/productPage/productPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';
import { CustomProductData } from '@src/spa/logic/catalog/catalogDataManager/types';
import SwiperView from '@src/spa/view/swiper/swiperView';
import { ISwiperView } from '@src/spa/view/swiper/types';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import * as constants from '@src/spa/view/pages/productPage/constants';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { btnParams } from '@src/spa/view/button/types';
import ButtonView from '@src/spa/view/button/buttonView';
import { IProductPage } from '@src/spa/view/pages/productPage/types';
import { IProductPageLogic } from '@src/spa/logic/product/types';
import ProductPageLogic from '@src/spa/logic/product/productPageLogic';
import BasketManager from '@src/spa/logic/basket/basketManger/basketManger';
import PopUpView from '@src/spa/view/popUp/popUpView';
import { ErrorMessages } from '@src/spa/logic/validator/types';

export default class ProductPageView extends PageView implements IProductPage {
  private readonly data: CustomProductData;
  private readonly swiper: ISwiperView;
  private readonly addToBasketBTN: IElementCreator;
  private readonly removeFromBasketBTN: IElementCreator;
  private readonly logic: IProductPageLogic = new ProductPageLogic(this);
  private isProductInBasket: boolean;

  public constructor(data: CustomProductData) {
    super(PageNames.PRODUCT, constants.PRODUCT_PAGE_CLASS);
    this.data = data;
    this.swiper = new SwiperView(data.imgURLs, (): void => this.logic.imgOnClickHandler());
    this.isProductInBasket = data.isProductInBasket;
    this.addToBasketBTN = this.createAddToBasketBTN(this.isProductInBasket);
    this.removeFromBasketBTN = this.createRemoveFromBasketBTN(this.isProductInBasket);
    this.configureView(data);
  }

  public getSwiper(): ISwiperView {
    return this.swiper;
  }

  public getData(): CustomProductData {
    return this.data;
  }

  public getAddToBasketBTN(): IElementCreator {
    return this.addToBasketBTN;
  }

  public getRemoveFromBasketBTN(): IElementCreator {
    return this.removeFromBasketBTN;
  }

  public disableAddToBasketBTN(): void {
    this.addToBasketBTN.setClasses(constants.PRODUCT_BTN_DISABLED_CLASS);
  }

  public enableAddToBasketBTN(): void {
    this.addToBasketBTN.removeClasses(constants.PRODUCT_BTN_DISABLED_CLASS);
  }

  public disableRemoveFromBasketBTN(): void {
    this.removeFromBasketBTN.setClasses(constants.PRODUCT_BTN_DISABLED_CLASS);
  }

  public enableRemoveFromBasketBTN(): void {
    this.removeFromBasketBTN.removeClasses(constants.PRODUCT_BTN_DISABLED_CLASS);
  }

  public static createSpanElement(...classes: string[]): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.SPAN_ELEMENT_TAG,
      classNames: classes,
    };
    return new ElementCreator(params);
  }

  private configureView(data: CustomProductData): void {
    const swiper: IElementCreator = this.swiper.getSwiperLayout();
    const pricesWrapper: IElementCreator = this.createPriceBar(data);
    const infoWrapper: IElementCreator = this.createDescriptionSection(data);

    if (data.imgURLs.length < 2) this.swiper.hideNavigation();
    swiper.setClasses(constants.PRODUCT_SWIPER_SMALL_CLASS);
    this.getViewCreator().addInnerElement(swiper, pricesWrapper, infoWrapper);

    if (data.discountPrice && data.discountPrice !== 'undefined') {
      const label: IElementCreator = ProductPageView.createSpanElement(constants.SALE_LABEL_CLASS);
      this.getViewCreator().addInnerElement(label);
    }
  }

  private createPriceBar(data: CustomProductData): IElementCreator {
    const wrapper: IElementCreator = SwiperView.createDivElement(constants.PRICES_WRAPPER_CLASS);
    const price: IElementCreator = ProductPageView.createSpanElement(constants.PRICE_CLASS);

    price.setTextContent(`${+data.price / 100} $`);

    wrapper.addInnerElement(price);
    if (data.discountPrice && data.discountPrice !== 'undefined') {
      const discountPrice: IElementCreator = ProductPageView.createSpanElement(constants.DISCOUNT_PRICE_CLASS);
      price.setClasses(constants.PRICE_CROSSED_CLASS);
      discountPrice.setTextContent(`${+data.discountPrice / 100} $`);
      wrapper.addInnerElement(discountPrice);
    }
    wrapper.addInnerElement(this.addToBasketBTN, this.removeFromBasketBTN);

    return wrapper;
  }

  private createDescriptionSection(data: CustomProductData): IElementCreator {
    const wrapper: IElementCreator = SwiperView.createDivElement(constants.PRODUCT_INFO_WRAPPER_CLASS);
    const nameWrapper: IElementCreator = SwiperView.createDivElement(constants.PRODUCT_NAME_WRAPPER_CLASS);
    const nameTitle: IElementCreator = SwiperView.createDivElement(constants.PRODUCT_NAME_TITLE_CLASS);
    const name: IElementCreator = SwiperView.createDivElement(constants.PRODUCT_NAME_CLASS);
    const description: IElementCreator = SwiperView.createDivElement(constants.PRODUCT_DESCRIPTION_CLASS);
    const descriptionWrapper: IElementCreator = SwiperView.createDivElement(
      constants.PRODUCT_DESCRIPTION_WRAPPER_CLASS
    );
    const descriptionTitle: IElementCreator = SwiperView.createDivElement(constants.PRODUCT_DESCRIPTION_TITLE_CLASS);

    nameTitle.setTextContent(constants.PRODUCT_NAME_TITLE_TEXT);
    descriptionTitle.setTextContent(constants.PRODUCT_DESCRIPTION_TITLE_TEXT);

    name.setTextContent(data.name);
    description.setTextContent(data.description);
    nameWrapper.addInnerElement(nameTitle, name);
    descriptionWrapper.addInnerElement(descriptionTitle, description);
    wrapper.addInnerElement(nameWrapper, descriptionWrapper);

    return wrapper;
  }

  private createAddToBasketBTN(isProductInBasket: boolean): IElementCreator {
    const params: btnParams = {
      textContent: constants.ADD_TO_BASKET_BTN_TEXT,
      classNames: [constants.PRODUCT_BTN_CLASS, constants.ADD_TO_BASKET_BTN_CLASS],
    };
    const btn: IElementCreator = new ButtonView(params).getViewCreator();
    isProductInBasket
      ? btn.setClasses(constants.PRODUCT_BTN_DISABLED_CLASS)
      : btn.removeClasses(constants.PRODUCT_BTN_DISABLED_CLASS);
    btn.getElement().addEventListener('click', async () => {
      if (!this.isProductInBasket) {
        try {
          await BasketManager.getInstance().addProductInBasket(this.data.id);
          btn.setClasses(constants.PRODUCT_BTN_DISABLED_CLASS);
          this.removeFromBasketBTN.removeClasses(constants.PRODUCT_BTN_DISABLED_CLASS);
          this.isProductInBasket = true;
          PopUpView.getApprovePopUp(`${this.data.name} added to basket`).show();
        } catch {
          PopUpView.getRejectPopUp(ErrorMessages.ADD_PRODUCT_BASKET).show();
        }
      }
    });
    return btn;
  }

  private createRemoveFromBasketBTN(isProductInBasket: boolean): IElementCreator {
    const params: btnParams = {
      textContent: constants.REMOVE_FROM_BASKET_BTN_TEXT,
      classNames: [constants.PRODUCT_BTN_CLASS, constants.REMOVE_FROM_BASKET_BTN_CLASS],
    };
    const btn: IElementCreator = new ButtonView(params).getViewCreator();
    isProductInBasket
      ? btn.removeClasses(constants.PRODUCT_BTN_DISABLED_CLASS)
      : btn.setClasses(constants.PRODUCT_BTN_DISABLED_CLASS);
    btn.getElement().addEventListener('click', async () => {
      if (this.isProductInBasket) {
        try {
          await BasketManager.getInstance().removeProductInBasket(this.data.id);
          btn.setClasses(constants.PRODUCT_BTN_DISABLED_CLASS);
          this.addToBasketBTN.removeClasses(constants.PRODUCT_BTN_DISABLED_CLASS);
          this.isProductInBasket = false;
          PopUpView.getApprovePopUp(`${this.data.name} removed from basket`).show();
        } catch {
          PopUpView.getApprovePopUp(ErrorMessages.REMOVE_PRODUCT_BASKET).show();
        }
      }
    });
    return btn;
  }
}
