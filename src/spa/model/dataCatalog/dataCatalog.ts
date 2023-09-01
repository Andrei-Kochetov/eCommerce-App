import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { options } from '@src/spa/model/LoginClientApi/constants';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export default class DataCatalog {
  private static readonly instance = new DataCatalog();

  public static getInstance() {
    return this.instance;
  }

  public getCatalogs() {
    const queryArgs = {
      expand: ['parent'],
    };
    const apiRoot = this.createApiRoot();
    return apiRoot
      .categories()
      .get({
        queryArgs: queryArgs,
      })
      .execute();
  }

  public getProducts() {
    const queryArgs = {
      //filter: `categories.id:${id}`
    };
    const apiRoot = this.createApiRoot();
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: queryArgs,
      })
      .execute();
  }

  public async getCategory(categoryName: string) {
    const queryArgs = {
      where: `name(en-US="${categoryName}")`,
    };
    const apiRoot = this.createApiRoot();
    const response = await apiRoot
      .categories()
      .get({
        queryArgs: queryArgs,
      })
      .execute();
    return response.body.results[0];
  }
  public async getProductsFromCategory(categoryName: string) {
    const category = await this.getCategory(categoryName);
    const queryArgs = {
      where: `categories(id="${category.id}")`,
      filter: ['variants.attributes.test-id:"test"'],
    };
    const apiRoot = this.createApiRoot();
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: queryArgs,
      })
      .execute();
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
