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

export default class DataCatalog {
  private static readonly instance = new DataCatalog();

  public static getInstance() {
    return this.instance;
  }

  public getCatalogs() {
    const apiRoot = this.createApiRoot();
    return apiRoot.categories().get().execute();
  }
  public getProducts() {
    const apiRoot = this.createApiRoot();
    return apiRoot.productProjections().get().execute();
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
