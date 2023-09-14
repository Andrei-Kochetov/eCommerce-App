import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import { options } from '@src/spa/model/LoginClientApi/constants';
import { Client, ClientBuilder, TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import MyTokenCache from '@src/spa/model/LoginClientApi/tokenCache';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import State from '@src/spa/logic/state/state';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';

export default class AnonymousBasket {
  private static readonly instance /* : ILoginClient */ = new AnonymousBasket();
  private token: TokenCache;

  private constructor() {
    this.token = new MyTokenCache();
  }

  public static getInstance() /* : ILoginClient */ {
    return this.instance;
  }

  public getToken(): TokenStore {
    return this.token.get();
  }

  public async getBasket() {
    const apiRoot = this.createApiRootForAddProductInCart();
    const activeCart = (await apiRoot.me().activeCart().get().execute()).body;
    console.log(activeCart, 'active cart');
    return activeCart;
  }

  public async addProductInCart(id: string) /* : Promise<ClientResponse<CustomerSignInResult>> */ {
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
              //quantity,
            },
          ],
        },
      })
      .execute();
  }

  public async removeProductInCart(id: string) /* : Promise<ClientResponse<CustomerSignInResult>> */ {
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
              //quantity,
            },
          ],
        },
      })
      .execute();
  }

  public createAnonymousBasket() /* : Promise<ClientResponse<CustomerSignInResult>> */ {
    const apiRoot: ByProjectKeyRequestBuilder = this.createApiRootForCreateAnonymousBasket();
    State.getInstance().setRecord(APP_STATE_KEYS.ANONYMOUS_BASKET_CREATED, JSON.stringify(true));
    console.log(JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.ANONYMOUS_BASKET_CREATED)));

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

  public createAuthorizationBasket() /* : Promise<ClientResponse<CustomerSignInResult>> */ {
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

  private createApiRootForAddProductInCart() {
    const tokenStore: TokenStore = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.TOKEN));
    const ctpClient: Client = new ClientBuilder()
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withExistingTokenFlow(`Bearer ${tokenStore.token}`, options.existingTokenMiddlewareOptions)
      //.withPasswordFlow(passwordMiddlewareOptions)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });
    return apiRoot;
  }

  private createApiRootForCreateAnonymousBasket() {
    this.token = new MyTokenCache();
    const anonymousAuthMiddlewareOptions = {
      host: options.host,
      projectKey: options.projectKey,
      credentials: {
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        //anonymousId?: string,
      },
      tokenCache: this.token,
      scopes: options.scopes,
      fetch,
      //oauthUri?:string,
    };

    const ctpClient: Client = new ClientBuilder()
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
      //.withPasswordFlow(passwordMiddlewareOptions)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });

    return apiRoot;
  }

  private createApiRootForCreateAuthorizationBasket() {
    const tokenStore: TokenStore = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.TOKEN));
    console.log(tokenStore.token, 'token create auth basket');
    const ctpClient: Client = new ClientBuilder()
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withExistingTokenFlow(`Bearer ${tokenStore.token}`, options.existingTokenMiddlewareOptions)
      //.withPasswordFlow(passwordMiddlewareOptions)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });
    return apiRoot;
  }
}
