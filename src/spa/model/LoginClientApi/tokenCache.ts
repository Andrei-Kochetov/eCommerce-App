import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  private myCache: TokenStore;
  constructor() {
    this.myCache = {
      token: '',
      expirationTime: 0,
    };
  }
  public set(newCache: TokenStore) {
    this.myCache = newCache;
  }
  public get() {
    return this.myCache;
  }
}
