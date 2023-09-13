import AnonymousBasket from '@src/spa/model/basketApi/basket';
import State from '@src/spa/logic/state/state';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';
import { TokenStore } from '@commercetools/sdk-client-v2';

export default class BasketManager {
  private static readonly instance = new BasketManager();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    return this.instance;
  }

  /* eslint-disable max-lines-per-function*/
  public async getBasketData() {
    let responseBasket;
    try {
      responseBasket = await AnonymousBasket.getInstance().getBasket();
      let totalPrice = 0;
      responseBasket.lineItems.forEach((el) => {
        if (el.variant.prices) {
          totalPrice += el.variant.prices[0].value.centAmount;
        } else {
          totalPrice += 0;
        }
      });
      const productsArr = responseBasket.lineItems.map((el) => {
        return {
          productAmount: '1',
          id: el.productId,
          path: el.productSlug ? el.productSlug['en-US'].replace(/_/g, '/') : '',
          name: `${el.name['en-US']}`,
          price: el.variant.prices ? `${el.variant.prices[0].value.centAmount}` : 'undefined',
          discountPrice:
            el.variant.prices && el.variant.prices[0].discounted
              ? `${el.variant.prices[0].discounted.value.centAmount}`
              : 'undefined',
          imgURLs: el.variant.images ? el.variant.images.map((el) => el.url) : [],
        };
      });
      responseBasket = {
        basketID: responseBasket.id,
        products: productsArr,
        discountPrice: `${responseBasket.totalPrice.centAmount}`,
        totalPrice: `${totalPrice}`,
      };
    } catch {
      const responseCreateBasket = (await AnonymousBasket.getInstance().createAnonymousBasket()).body;
      responseBasket = {
        basketID: responseCreateBasket.id,
        products: [],
        discountPrice: `${responseCreateBasket.totalPrice.centAmount}`,
        totalPrice: `${0}`,
      };
    }
    return responseBasket;
  }
  /* eslint-enable max-lines-per-function*/
  public async addProductInBasket(idProduct: string) {
    const token: TokenStore = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.TOKEN));
    if (!token.token) {
      const responeCreateBasket = await AnonymousBasket.getInstance().createAnonymousBasket();
      State.getInstance().setRecord(APP_STATE_KEYS.TOKEN, JSON.stringify(AnonymousBasket.getInstance().getToken()));
      console.log(responeCreateBasket, 'responeCreateBasket');
      console.log(AnonymousBasket.getInstance().getToken(), 'anon token');
    }
    const responseCart = await AnonymousBasket.getInstance().addProductInCart(idProduct);
    console.log(responseCart.body, 'basketManager add product');
  }

  public async removeProductInBasket(idProduct: string) {
    const responseCart = await AnonymousBasket.getInstance().removeProductInCart(idProduct);
    console.log(responseCart.body, 'basketManager remove product');
  }
  public async createAuthorizationBasket() {
    const responseCreateCart = await AnonymousBasket.getInstance().createAnonymousBasket();
  }
}
