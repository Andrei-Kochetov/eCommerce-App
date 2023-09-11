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

  public async addProductInBasket(idProduct: string) {
    const token: TokenStore = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.TOKEN));
    if (!token.token) {
      const responeCreateBasket = await AnonymousBasket.getInstance().createAnonymousBasket();
      State.getInstance().setRecord(APP_STATE_KEYS.TOKEN, JSON.stringify(AnonymousBasket.getInstance().getToken()));
      console.log(responeCreateBasket, 'responeCreateBasket');
      console.log(AnonymousBasket.getInstance().getToken(), 'anon token');
    }
    const responseCart = await AnonymousBasket.getInstance().addProductInCart(idProduct);
    console.log(responseCart.body.lineItems, 'basketManager anon add product');
  }
}
