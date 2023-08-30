import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { options } from '@src/spa/model/LoginClientApi/constants';
import {
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  TokenStore,
  TokenCache,
} from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import MyTokenCache from '@src/spa/model/LoginClientApi/tokenCache';

export default class DataCatalog {
  private static readonly instance = new DataCatalog();

  public static getInstance() {
    return this.instance;
  }

  public getDataCatalog(token: string) {
    const apiRoot = this.createApiRoot();
    return apiRoot.products().get().execute(); //.categories().get().execute()
  }

  private createApiRoot() {
    const ctpClient: Client = new ClientBuilder()
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });
    return apiRoot;
  }
}
