import { createApiBuilderFromCtpClient, Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import { options } from '@src/spa/model/LoginClientApi/constants';
import { IBasketApi } from './types';
import { Client, ClientBuilder, TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import MyTokenCache from '@src/spa/model/LoginClientApi/tokenCache';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import State from '@src/spa/logic/state/state';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';

export default class BasketApi {
  private static readonly instance: IBasketApi = new BasketApi();
  private token: TokenCache;

  private constructor() {
    this.token = new MyTokenCache();
  }

  public static getInstance(): IBasketApi {
    return this.instance;
  }

  public getToken(): TokenStore {
    return this.token.get();
  }

  public async getBasket(): Promise<Cart> {
    const apiRoot = this.createApiRootForAddProductInCart();
    const activeCart = (await apiRoot.me().activeCart().get().execute()).body;
    return activeCart;
  }

  public async setPromoCode(promocode: string) {
    const apiRoot = this.createApiRootForAddProductInCart();
    const activeCart = (await apiRoot.me().activeCart().get().execute()).body;

    return apiRoot
      .me()
      .carts()
      .withId({ ID: activeCart.id })
      .post({
        body: {
          version: activeCart.version,
          actions: [
            {
              action: 'addDiscountCode',
              code: `${promocode}`,
            },
          ],
        },
      })
      .execute();
  }

  public async deletePromoCode() {
    const apiRoot = this.createApiRootForAddProductInCart();
    const activeCart = (await apiRoot.me().activeCart().get().execute()).body;
    const promocodeId = activeCart.discountCodes[0].discountCode.id;

    return apiRoot
      .me()
      .carts()
      .withId({ ID: activeCart.id })
      .post({
        body: {
          version: activeCart.version,
          actions: [
            {
              action: 'removeDiscountCode',
              discountCode: {
                typeId: 'discount-code',
                id: `${promocodeId}`,
              },
            },
          ],
        },
      })
      .execute();
  }

  public async addProductInCart(id: string) {
    const apiRoot = this.createApiRootForAddProductInCart();
    const activeCart = (await apiRoot.me().activeCart().get().execute()).body;

    return apiRoot
      .me()
      .carts()
      .withId({ ID: activeCart.id })
      .post({
        body: {
          version: activeCart.version,
          actions: [
            {
              action: 'addLineItem',
              productId: id,
            },
          ],
        },
      })
      .execute();
  }

  public async changeQuantityProductInCart(quantity: number, id: string) {
    const apiRoot = this.createApiRootForAddProductInCart();
    const activeCart = (await apiRoot.me().activeCart().get().execute()).body;
    const lineItemId = activeCart.lineItems.filter((el) => el.productId === id)[0].id;

    return apiRoot
      .me()
      .carts()
      .withId({ ID: activeCart.id })
      .post({
        body: {
          version: activeCart.version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId: lineItemId,
              quantity: quantity,
            },
          ],
        },
      })
      .execute();
  }

  public async removeProductInCart(id: string) {
    const apiRoot = this.createApiRootForAddProductInCart();
    const activeCart = (await apiRoot.me().activeCart().get().execute()).body;
    const lineItemId = activeCart.lineItems.filter((el) => el.productId === id)[0].id;

    return apiRoot
      .me()
      .carts()
      .withId({ ID: activeCart.id })
      .post({
        body: {
          version: activeCart.version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: lineItemId,
            },
          ],
        },
      })
      .execute();
  }
  public async removeAllProductsInCart() {
    const apiRoot = this.createApiRootForAddProductInCart();
    const activeCart = (await apiRoot.me().activeCart().get().execute()).body;
    const lineItemsIdArr = activeCart.lineItems.map((el) => el.id);
    const actions: MyCartUpdateAction[] = [];
    lineItemsIdArr.forEach((el) => {
      actions.push({
        action: 'removeLineItem',
        lineItemId: el,
      });
    });
    return apiRoot
      .me()
      .carts()
      .withId({ ID: activeCart.id })
      .post({
        body: {
          version: activeCart.version,
          actions: actions,
        },
      })
      .execute();
  }

  public createAnonymousBasket() {
    const apiRoot: ByProjectKeyRequestBuilder = this.createApiRootForCreateAnonymousBasket();
    State.getInstance().setRecord(APP_STATE_KEYS.ANONYMOUS_BASKET_CREATED, JSON.stringify(true));

    return apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();
  }

  public createAuthorizationBasket() {
    const apiRoot: ByProjectKeyRequestBuilder = this.createApiRootForCreateAuthorizationBasket();
    return apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();
  }

  private createApiRootForAddProductInCart(): ByProjectKeyRequestBuilder {
    const tokenStore: TokenStore = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.TOKEN));
    const ctpClient: Client = new ClientBuilder()
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withExistingTokenFlow(`Bearer ${tokenStore.token}`, options.existingTokenMiddlewareOptions)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });
    return apiRoot;
  }

  private createApiRootForCreateAnonymousBasket(): ByProjectKeyRequestBuilder {
    this.token = new MyTokenCache();
    const anonymousAuthMiddlewareOptions = {
      host: options.host,
      projectKey: options.projectKey,
      credentials: {
        clientId: options.clientId,
        clientSecret: options.clientSecret,
      },
      tokenCache: this.token,
      scopes: options.scopes,
      fetch,
    };

    const ctpClient: Client = new ClientBuilder()
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });

    return apiRoot;
  }

  private createApiRootForCreateAuthorizationBasket(): ByProjectKeyRequestBuilder {
    const tokenStore: TokenStore = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.TOKEN));
    const ctpClient: Client = new ClientBuilder()
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withExistingTokenFlow(`Bearer ${tokenStore.token}`, options.existingTokenMiddlewareOptions)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });
    return apiRoot;
  }
}
