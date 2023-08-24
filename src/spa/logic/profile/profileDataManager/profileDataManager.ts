import { IProfileDataManager, ProfileData } from '@src/spa/logic/profile/profileDataManager/types';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import { TokenStore } from '@commercetools/sdk-client-v2';
import State from '@src/spa/logic/state/state';
import DataCustomer from '@src/spa/model/dataCustomer/dataCustomer';
import { Address } from '@src/spa/logic/profile/profileDataManager/types';

export default class ProfileDataManager implements IProfileDataManager {
  private readonly token: TokenStore;
  private static readonly instance = new ProfileDataManager();

  private constructor() {
    this.token = this.getToken();
  }

  public static getInstance() {
    return this.instance;
  }

  public async getProfileData(): Promise<ProfileData | undefined> {
    const dataCustomerResponse = await DataCustomer.getInstance().getDataCustomer(this.token.token);
    const dataCustomer = dataCustomerResponse.body;
    const addresses: Address[] = [];
    dataCustomer.addresses.forEach((address) => {
      if (address.city && address.country && address.streetName && address.id && address.postalCode) {
        addresses.push({
          city: address.city,
          country: address.country,
          postCode: address.postalCode,
          street: address.streetName,
          id: address.id,
          isShipping: address.id === dataCustomer.shippingAddressIds?.join() ? 'true' : 'false',
          isBilling: address.id === dataCustomer.billingAddressIds?.join() ? 'true' : 'false',
          isDefaultShipping: address.id === dataCustomer.defaultShippingAddressId ? 'true' : 'false',
          isDefaultBilling: address.id === dataCustomer.defaultBillingAddressId ? 'true' : 'false',
        });
      }
    });
    if (dataCustomer.firstName && dataCustomer.lastName && dataCustomer.dateOfBirth) {
      return {
        email: dataCustomer.email,
        firstName: dataCustomer.firstName,
        lastName: dataCustomer.lastName,
        dateBirth: dataCustomer.dateOfBirth,
        addresses: addresses,
      };
    }
  }

  private getToken(): TokenStore {
    const state: IState = State.getInstance();
    const token = state.getRecord(APP_STATE_KEYS.TOKEN);
    return JSON.parse(token);
  }

  // and public methods for password, email, user-info, addresses updating
}
