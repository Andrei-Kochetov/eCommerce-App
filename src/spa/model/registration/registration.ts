import { Client, ClientBuilder, TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import { options } from '@src/spa/model/registration/constants';
import { ClientResponse, CustomerSignInResult, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import MyTokenCache from '@src/spa/model/LoginClientApi/tokenCache';
import { IRegistration, IRegistrationInputValue } from '@src/spa/model/registration/types';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export default class Registration implements IRegistration {
  private static readonly instance: IRegistration = new Registration();

  private token: TokenCache;

  private constructor() {
    this.token = new MyTokenCache();
  }

  public static getInstance(): IRegistration {
    return this.instance;
  }

  public getToken(): TokenStore {
    return this.token.get();
  }

  public registration(registrationInputValue: IRegistrationInputValue): Promise<ClientResponse<CustomerSignInResult>> {
    const ctpClient: Client = this.getCtpClient();
    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });
    let defaultBillingAddress;
    let defaultShippingAddress;
    if (registrationInputValue.billingAddressDefault) defaultBillingAddress = 0;
    if (registrationInputValue.shippingAddressDefault) defaultShippingAddress = 1;
    return apiRoot
      .customers()
      .post({
        body: {
          email: registrationInputValue.email,
          password: registrationInputValue.password,
          firstName: registrationInputValue.firstName,
          lastName: registrationInputValue.lastName,
          dateOfBirth: registrationInputValue.dateBirth,
          addresses: [
            {
              country: registrationInputValue.billingCountry,
              city: registrationInputValue.billingCity,
              postalCode: registrationInputValue.billingPost,
              streetName: registrationInputValue.billingAddress,
            },
            {
              country: registrationInputValue.shippingCountry,
              city: registrationInputValue.shippingCity,
              postalCode: registrationInputValue.shippingPost,
              streetName: registrationInputValue.shippingAddress,
            },
          ],
          defaultBillingAddress: defaultBillingAddress,
          defaultShippingAddress: defaultShippingAddress,
          billingAddresses: [0],
          shippingAddresses: [1],
        },
      })
      .execute();
  }

  private getCtpClient(): Client {
    return new ClientBuilder()
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .build();
  }
}
