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
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: 'ecommerce-app-pet-project',
      credentials: {
        clientId: 'cgsy-3PSsDNG9EY9DseWh-Y4',
        clientSecret: 'm8b5g3qGio7yOzPR6MDdZPLXiDtokwBt',
      },
      scopes: [
        'manage_my_shopping_lists:ecommerce-app-pet-project view_published_products:ecommerce-app-pet-project manage_my_orders:ecommerce-app-pet-project create_anonymous_token:ecommerce-app-pet-project manage_my_profile:ecommerce-app-pet-project view_categories:ecommerce-app-pet-project manage_my_payments:ecommerce-app-pet-project manage_customers:ecommerce-app-pet-project manage_my_quote_requests:ecommerce-app-pet-project manage_my_quotes:ecommerce-app-pet-project view_project_settings:ecommerce-app-pet-project manage_my_business_units:ecommerce-app-pet-project',
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
