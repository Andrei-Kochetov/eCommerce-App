import { Address, IProfileDataManager, ProfileData } from '@src/spa/logic/profile/profileDataManager/types';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import { TokenStore } from '@commercetools/sdk-client-v2';
import DataCustomer from '@src/spa/model/dataCustomer/dataCustomer';
import { SetPasswordObj, SetNameAndDateBirthObj, SetAddressObj } from '@src/spa/model/dataCustomer/types';
import State from '@src/spa/logic/state/state';

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
    console.log(dataCustomerResponse);
    const dataCustomer = dataCustomerResponse.body;
    const addresses: Address[] = [];
    dataCustomer.addresses.forEach((address) => {
      if (address.city && address.country && address.streetName && address.id && address.postalCode) {
        addresses.push({
          city: address.city,
          country: address.country,
          postcode: address.postalCode,
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

  public async setNewEmail(newEmail: string): Promise<void> {
    const dataCustomerResponse = await DataCustomer.getInstance().setNewEmail(this.token.token, newEmail);
    State.getInstance().setRecord(APP_STATE_KEYS.VERSION, `${dataCustomerResponse.body.version}`);
  }

  public async setNewNameAndDateBirth(newNameAndDateBirth: SetNameAndDateBirthObj): Promise<void> {
    const dataCustomerResponse = await DataCustomer.getInstance().setNewNameAndDateBirth(
      this.token.token,
      newNameAndDateBirth
    );
    State.getInstance().setRecord(APP_STATE_KEYS.VERSION, `${dataCustomerResponse.body.version}`);
  }

  public async setNewPassword(passwordObj: SetPasswordObj): Promise<void> {
    const dataCustomerResponse = await DataCustomer.getInstance().setNewPassword(this.token.token, passwordObj);
    State.getInstance().setRecord(APP_STATE_KEYS.VERSION, `${dataCustomerResponse.body.version}`);
  }

  public async setNewAddress(addressObj: SetAddressObj): Promise<void> {
    const dataCustomerResponse = await DataCustomer.getInstance().setNewAddress(this.token.token, addressObj);
    State.getInstance().setRecord(APP_STATE_KEYS.VERSION, `${dataCustomerResponse.body.version}`);
  }

  public async deleteAddress(addressId: string): Promise<void> {
    const dataCustomerResponse = await DataCustomer.getInstance().deleteAddress(this.token.token, addressId);
    State.getInstance().setRecord(APP_STATE_KEYS.VERSION, `${dataCustomerResponse.body.version}`);
  }

  private getToken(): TokenStore {
    const state: IState = State.getInstance();
    const token: string = state.getRecord(APP_STATE_KEYS.TOKEN);
    return JSON.parse(token);
  }
}
