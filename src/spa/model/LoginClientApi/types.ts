import { TokenStore } from '@commercetools/sdk-client-v2';
import { CustomerSignInResult, ClientResponse } from '@commercetools/platform-sdk';

export interface ILoginClient {
  getToken(): TokenStore;
  authorization(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>>;
}
