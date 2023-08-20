import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import { options } from '@src/spa/model/LoginClientApi/constants';
import { ClientBuilder, PasswordAuthMiddlewareOptions, TokenCache } from '@commercetools/sdk-client-v2';
import MyTokenCache from '@src/spa/model/LoginClientApi/tokenCache';
import { ILoginClient } from '@src/spa/model/LoginClientApi/types';
import { CustomerSignInResult, ClientResponse } from '@commercetools/platform-sdk';

export default class LoginClient implements ILoginClient {
  private token: TokenCache;
  constructor() {
    this.token = new MyTokenCache();
  }

  public getToken() {
    return this.token.get();
  }
  public authorization = (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
    const passwordMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: options.host,
      projectKey: options.projectKey,
      credentials: {
        clientId: options.clientId,
        clientSecret: options.clientSecret,
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
