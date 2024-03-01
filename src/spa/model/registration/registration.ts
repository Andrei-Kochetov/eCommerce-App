import { Client, ClientBuilder, TokenCache, TokenStore, AuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { options } from '@src/spa/model/registration/constants';
import {
  ClientResponse,
  CustomerSignInResult,
  createApiBuilderFromCtpClient,
  CustomerDraft,
} from '@commercetools/platform-sdk';
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

  public registrationTwoAddress(
    registrationInputValue: IRegistrationInputValue
  ): Promise<ClientResponse<CustomerSignInResult>> {
    const ctpClient: Client = this.getCtpClient();
    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });
    return apiRoot
      .customers()
      .post({
        body: this.postBodyData(registrationInputValue),
      })
      .execute();
  }

  public registrationSingleAddress(
    registrationInputValue: IRegistrationInputValue
  ): Promise<ClientResponse<CustomerSignInResult>> {
    const ctpClient: Client = this.getCtpClient();
    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });
    let defaultBillingAddress;
    let defaultShippingAddress;
    if (registrationInputValue.shippingAddressDefault) {
      defaultBillingAddress = 0;
      defaultShippingAddress = 0;
    }
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
              country: registrationInputValue.shippingCountry,
              city: registrationInputValue.shippingCity,
              postalCode: registrationInputValue.shippingPost,
              streetName: registrationInputValue.shippingAddress,
            },
          ],
          defaultBillingAddress: defaultBillingAddress,
          defaultShippingAddress: defaultShippingAddress,
          billingAddresses: [0],
          shippingAddresses: [0],
        },
      })
      .execute();
  }

  private postBodyData(registrationInputValue: IRegistrationInputValue): CustomerDraft {
    let defaultBillingAddress;
    let defaultShippingAddress;
    if (registrationInputValue.billingAddressDefault) defaultBillingAddress = 1;
    if (registrationInputValue.shippingAddressDefault) defaultShippingAddress = 0;
    return {
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
      billingAddresses: [1],
      shippingAddresses: [0],
    };
  }

  private getCtpClient(): Client {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: 'https://auth.us-central1.gcp.commercetools.com',
      projectKey: 'ecommerce-app03',
      credentials: {
        clientId: 'x7aJqjJw9KyEUnffrUjcHQbU',
        clientSecret: 'YoCAtgNHI7cQfOCSHzTKj1tTnOcjD8w1',
      },
      scopes: [
        'view_categories:ecommerce-app03 manage_my_profile:ecommerce-app03 manage_my_orders:ecommerce-app03 manage_my_payments:ecommerce-app03 manage_my_business_units:ecommerce-app03 create_anonymous_token:ecommerce-app03 manage_my_quotes:ecommerce-app03 manage_my_shopping_lists:ecommerce-app03 manage_states:ecommerce-app03 manage_orders:ecommerce-app03 manage_customers:ecommerce-app03 manage_my_quote_requests:ecommerce-app03 manage_products:ecommerce-app03 view_published_products:ecommerce-app03',
      ],
      fetch,
      tokenCache: this.token,
    };
    return new ClientBuilder()
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .build();
  }
}
