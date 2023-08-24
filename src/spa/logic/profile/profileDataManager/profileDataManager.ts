import { IProfileDataManager, ProfileData } from '@src/spa/logic/profile/profileDataManager/types';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import { TokenStore } from '@commercetools/sdk-client-v2';
import State from '@src/spa/logic/state/state';
import DataCustomer from '@src/spa/model/dataCustomer/dataCustomer';

export default class ProfileDataManager /* implements IProfileDataManager */ {
  private readonly token: TokenStore;
  // singleton

  public constructor() {
    this.token = this.getToken();
  }

  public async getProfileData() /* :  ProfileData  */ {
    const dataCustomerResponse = await DataCustomer.getInstance().getDataCustomer(this.token.token);
    const dataCustomer = dataCustomerResponse.body;
    console.log(dataCustomer);
    const addresses = dataCustomer.addresses.map((address) => {
      return {
        city: address.city,
        country: address.country,
        postcode: address.postalCode,
        street: address.streetName,
        id: address.id,
        isShipping: address.id === dataCustomer.shippingAddressIds?.join(),
        isBilling: address.id === dataCustomer.billingAddressIds?.join(),
        isDefaultShipping: address.id === dataCustomer.defaultShippingAddressId,
        isDefaultBilling: address.id === dataCustomer.defaultBillingAddressId,
      };
    });
    return {
      email: dataCustomer.email,
      firstName: dataCustomer.firstName,
      lastName: dataCustomer.lastName,
      dateBirth: dataCustomer.dateOfBirth,
      addresses: addresses,
    };

    //this method you have to implement
    //throw new Error('Method not implemented.');
  }

  private getToken(): TokenStore {
    const state: IState = State.getInstance();
    const token = state.getRecord(APP_STATE_KEYS.TOKEN);
    return JSON.parse(token);
  }

  // and public methods for password, email, user-info, addresses updating
}
