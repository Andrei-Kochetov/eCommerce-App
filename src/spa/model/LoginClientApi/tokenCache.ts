import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  myCache: TokenStore;
  constructor() {
    this.myCache = {
      token: '',
      expirationTime: 0,
    };
  }
  set(newCache: TokenStore) {
    this.myCache = newCache;
  }
  get() {
    return this.myCache;
  }
}
