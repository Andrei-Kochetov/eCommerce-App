import BasketApi from '@src/spa/model/basketApi/basket';
import State from '@src/spa/logic/state/state';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';
import { TokenStore } from '@commercetools/sdk-client-v2';
import { Cart } from '@commercetools/platform-sdk';

export default class BasketManager {
  private static readonly instance = new BasketManager();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    return this.instance;
  }

  public async getBasketData() {
    let responseBasket;
    try {
      responseBasket = this.adapterDataBasket(await BasketApi.getInstance().getBasket());
    } catch {
      const responseCreateBasket = (await BasketApi.getInstance().createAnonymousBasket()).body;
      responseBasket = {
        basketID: responseCreateBasket.id,
        products: [],
        discountPrice: `${responseCreateBasket.totalPrice.centAmount}`,
        totalPrice: `${0}`,
        hasPromocode: false,
      };
    }
    return responseBasket;
  }

  public async getProductsIdInBasket() {
    let result: string[];
    try {
      const responseBasket = await BasketApi.getInstance().getBasket();
      const productsId: string[] = [];
      responseBasket.lineItems.forEach((el) => {
        productsId.push(el.productId);
      });
      result = productsId;
    } catch {
      result = [];
    }
    return result;
  }

  public async addProductInBasket(idProduct: string): Promise<void> {
    const token: TokenStore = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.TOKEN));
    if (!token.token) {
      await BasketApi.getInstance().createAnonymousBasket();
      State.getInstance().setRecord(APP_STATE_KEYS.TOKEN, JSON.stringify(BasketApi.getInstance().getToken()));
    }
    await BasketApi.getInstance().addProductInCart(idProduct);
  }

  public async removeProductInBasket(idProduct: string) {
    const responseBasket = (await BasketApi.getInstance().removeProductInCart(idProduct)).body;
    return responseBasket;
  }

  public async setPromoCode(promocode: string) {
    const responseBasket = (await BasketApi.getInstance().setPromoCode(promocode)).body;
    return responseBasket;
  }

  public async deletePromoCode() {
    const responseBasket = (await BasketApi.getInstance().deletePromoCode()).body;
    return responseBasket;
  }

  public async removeAllProductsInBasket(): Promise<void> {
    await BasketApi.getInstance().removeAllProductsInCart();
  }

  public async createAuthorizationBasket(): Promise<void> {
    await BasketApi.getInstance().createAuthorizationBasket();
  }

  public async changeQuantityProductInCart(quantity: number, id: string) {
    return (await BasketApi.getInstance().changeQuantityProductInCart(quantity, id)).body;
  }

  public adapterDataBasket(responseBasket: Cart) {
    const discountedPrice = responseBasket.totalPrice.centAmount;

    let totalPrice = 0;
    responseBasket.lineItems.forEach((el) => {
      if (el.variant.prices) {
        totalPrice += el.variant.prices[0].value.centAmount * el.quantity;
      } else {
        totalPrice += 0;
      }
    });

    const productsArr = responseBasket.lineItems.map((el) => {
      return {
        productAmount: `${el.quantity}`,
        id: el.productId,
        path: el.productSlug ? el.productSlug['en-US'].replace(/_/g, '/') : '',
        name: `${el.name['en-US']}`,
        price: el.variant.prices ? `${el.variant.prices[0].value.centAmount * el.quantity}` : 'undefined',
        discountPrice:
          el.variant.prices && el.variant.prices[0].discounted
            ? `${el.variant.prices[0].discounted.value.centAmount * el.quantity}`
            : 'undefined',
        imgURLs: el.variant.images ? el.variant.images.map((el) => el.url) : [],
      };
    });

    return {
      basketID: responseBasket.id,
      products: productsArr,
      discountPrice: discountedPrice === totalPrice ? null : `${discountedPrice}`,
      totalPrice: `${totalPrice}`,
      hasPromocode: responseBasket.discountCodes.length > 0,
    };
  }
}
