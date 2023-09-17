import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';

export interface IBasketApi {
  getToken(): TokenStore;
  getBasket(): Promise<Cart>;
  addProductInCart(id: string): Promise<ClientResponse<Cart>>;
  removeProductInCart(id: string): Promise<ClientResponse<Cart>>;
  createAnonymousBasket(): Promise<ClientResponse<Cart>>;
  createAuthorizationBasket(): Promise<ClientResponse<Cart>>;
  removeAllProductsInCart(): Promise<ClientResponse<Cart>>;
  changeQuantityProductInCart(quantity: number, id: string): Promise<ClientResponse<Cart>>;
  setPromoCode(promocode: string): Promise<ClientResponse<Cart>>;
  deletePromoCode(): Promise<ClientResponse<Cart>>;
}
