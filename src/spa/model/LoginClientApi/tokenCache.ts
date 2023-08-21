import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  private myCache: TokenStore;

  public constructor() {
    this.myCache = {
      token: '',
      expirationTime: 0,
    };
  }

  public set(newCache: TokenStore): void {
    this.myCache = newCache;
  }

  public get(): TokenStore {
    return this.myCache;
  }
}
