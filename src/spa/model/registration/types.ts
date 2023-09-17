import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';
import { ClientResponse } from '@commercetools/platform-sdk';

export interface IRegistrationInputValue {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  billingAddressDefault: boolean;
  billingCountry: string;
  billingCity: string;
  billingAddress: string;
  billingPost: string;
  shippingAddressDefault: boolean;
  shippingCountry: string;
  shippingCity: string;
  shippingAddress: string;
  shippingPost: string;
}

export interface IRegistration {
  getToken(): TokenStore;
  registrationTwoAddress(
    registrationInputValue: IRegistrationInputValue
  ): Promise<ClientResponse<CustomerSignInResult>>;
  registrationSingleAddress(
    registrationInputValue: IRegistrationInputValue
  ): Promise<ClientResponse<CustomerSignInResult>>;
}
