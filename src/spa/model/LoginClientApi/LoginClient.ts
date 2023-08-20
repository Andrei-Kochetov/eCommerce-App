import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import { options } from '@src/spa/model/LoginClientApi/constants';
import { ClientBuilder, PasswordAuthMiddlewareOptions, TokenCache } from '@commercetools/sdk-client-v2';
import MyTokenCache from '@src/spa/model/LoginClientApi/tokenCache';
import { ILoginClient } from '@src/spa/';

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
      projectKey: 'ecommerce-app2023',
      credentials: {
        clientId: '5CtkecLYr54FhhzXfgya3yRC',
        clientSecret: 'Y0wVAYt9uSgpgJFn4_lP9r_mmFlYMlK0',
        user: {
          username: `${email}`,
          password: `${password}`,
        },
      },
      tokenCache: this.token,
      scopes: [
        `manage_my_payments:ecommerce-app2023 manage_my_quotes:ecommerce-app2023 view_published_products:ecommerce-app2023 manage_my_profile:ecommerce-app2023 view_categories:ecommerce-app2023 manage_my_quote_requests:ecommerce-app2023 manage_my_business_units:ecommerce-app2023 manage_my_shopping_lists:ecommerce-app2023 create_anonymous_token:ecommerce-app2023 view_project_settings:ecommerce-app2023 manage_my_orders:ecommerce-app2023`,
      ],
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
