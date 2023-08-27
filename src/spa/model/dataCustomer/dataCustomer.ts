import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { options } from '@src/spa/model/LoginClientApi/constants';
import { Client, ClientBuilder, ExistingTokenMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export default class DataCustomer {
  private static readonly instance = new DataCustomer();

  public static getInstance() {
    return this.instance;
  }

  public getDataCustomer(token: string) {
    const authorization = `Bearer ${token}`;
    const optionAuth: ExistingTokenMiddlewareOptions = {
      force: true,
    };
    const ctpClient: Client = new ClientBuilder()
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withExistingTokenFlow(authorization, optionAuth)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });

    return apiRoot.me().get().execute();
  }
}
