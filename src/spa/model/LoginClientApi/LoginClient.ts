import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import { options } from '@src/spa/model/LoginClientApi/constants';
import {
  Client,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  TokenCache,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import MyTokenCache from '@src/spa/model/LoginClientApi/tokenCache';
import { ILoginClient } from '@src/spa/model/LoginClientApi/types';
import { CustomerSignInResult, ClientResponse } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export default class LoginClient {
  private static readonly instance: ILoginClient = new LoginClient();
  private token: TokenCache;

  private constructor() {
    this.token = new MyTokenCache();
  }

  public static getInstance(): ILoginClient {
    return this.instance;
  }

  public getToken(): TokenStore {
    return this.token.get();
  }

  public authorization(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
    this.token = new MyTokenCache();
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

    const ctpClient: Client = new ClientBuilder()
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withPasswordFlow(passwordMiddlewareOptions)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });

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
  }
}
