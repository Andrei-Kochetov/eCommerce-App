import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';

export interface IBasketApi {
  getToken(): TokenStore;
  getBasket(): Promise<Cart>;
  addProductInCart(id: string): Promise<ClientResponse<Cart>>;
  removeProductInCart(id: string): Promise<ClientResponse<Cart>>;
  createAnonymousBasket(): Promise<ClientResponse<Cart>>;
  createAuthorizationBasket(): Promise<ClientResponse<Cart>>;
}
