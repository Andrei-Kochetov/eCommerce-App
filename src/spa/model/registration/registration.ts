import { ClientBuilder, TokenCache } from '@commercetools/sdk-client-v2';
import { options } from '@src/spa/model/LoginClientApi/constants';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import MyTokenCache from '@src/spa/model/LoginClientApi/tokenCache';
import { IRegistrationInputValue } from '@src/spa/model/registration/types';

export default class Registration {
  private token: TokenCache;
  constructor() {
    this.token = new MyTokenCache();
  }

  public getToken() {
    return this.token.get();
  }

  public static registration(registrationInputValue: IRegistrationInputValue) {
    const ctpClient = new ClientBuilder()
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .build();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: options.projectKey });
    let defaultBillingAddress;
    let defaultShippingAddress;
    if (registrationInputValue.billingAddressDefault) defaultBillingAddress = 0;
    if (registrationInputValue.shippingAddressDefault) defaultShippingAddress = 1;
    return apiRoot
      .me()
      .signup()
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
        },
      })
      .execute();
  }
}
