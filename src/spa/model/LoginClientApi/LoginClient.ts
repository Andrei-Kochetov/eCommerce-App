import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import { options } from '@src/spa/model/LoginClientApi/constants';
import { ClientBuilder, PasswordAuthMiddlewareOptions, TokenCache } from '@commercetools/sdk-client-v2';
import MyTokenCache from '@src/spa/model/LoginClientApi/tokenCache';
import { ILoginClient } from '@src/spa/model/LoginClientApi/types';

export default class LoginClient implements ILoginClient {
  private token: TokenCache;
  constructor() {
    this.token = new MyTokenCache();
  }

  public getToken() {
    return this.token.get();
  }
  public authorization = (email: string, password: string) => {
    const passwordMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: options.projectKey,
      credentials: {
        clientId: '5CtkecLYr54FhhzXfgya3yRC',
        clientSecret: 'Y0wVAYt9uSgpgJFn4_lP9r_mmFlYMlK0',
        user: {
          username: `${email}`,
          password: `${password}`,
        },
      },
      tokenCache: this.token,
      scopes: options.scopes,
      fetch,
    };
    const ctpClient = new ClientBuilder()
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withPasswordFlow(passwordMiddlewareOptions)
      .build();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-app2023' });
    return apiRoot
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
  };
}
