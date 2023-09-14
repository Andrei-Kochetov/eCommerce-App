import { TokenStore } from '@commercetools/sdk-client-v2';
import { CustomerSignInResult, ClientResponse, Customer } from '@commercetools/platform-sdk';

export interface ILoginClient {
  getToken(): TokenStore;
  authorization(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>>;
  getTokenAfterAnonymousAuthorization(email: string, password: string): Promise<ClientResponse<Customer>>;
  authorizationAnonumous(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>>;
}
