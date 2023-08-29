import {
  Address,
  DEFAULT_ADDRESS,
  DEFAULT_PROFILE_DATA,
  IProfileDataManager,
  ProfileData,
} from '@src/spa/logic/profile/profileDataManager/types';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import { TokenStore } from '@commercetools/sdk-client-v2';
import DataCustomer from '@src/spa/model/dataCustomer/dataCustomer';
import { SetPasswordObj, SetNameAndDateBirthObj } from '@src/spa/model/dataCustomer/types';
import State from '@src/spa/logic/state/state';
import { AddAddressObj } from '@src/spa/model/dataCustomer/types';
import LoginClient from '@src/spa/model/LoginClientApi/LoginClient';

export default class ProfileDataManager implements IProfileDataManager {
  private token: TokenStore;
  private static readonly instance = new ProfileDataManager();

  private constructor() {
    this.token = this.getToken();
  }

  public static getInstance() {
    return this.instance;
  }

  public async getProfileData(): Promise<ProfileData> {
    const dataCustomerResponse = await DataCustomer.getInstance().getDataCustomer(this.token.token);
    const dataCustomer = dataCustomerResponse.body;
    const addresses: Address[] = [];
    dataCustomer.addresses.forEach((address) => {
      if (address.id) {
        addresses.push({
          city: address.city ? address.city : DEFAULT_ADDRESS.city,
          country: address.country,
          postcode: address.postalCode ? address.postalCode : DEFAULT_ADDRESS.city,
          street: address.streetName ? address.streetName : DEFAULT_ADDRESS.street,
          id: address.id,
          isShipping: address.id === dataCustomer.shippingAddressIds?.join() ? 'true' : 'false',
          isBilling: address.id === dataCustomer.billingAddressIds?.join() ? 'true' : 'false',
          isDefaultShipping: address.id === dataCustomer.defaultShippingAddressId ? 'true' : 'false',
          isDefaultBilling: address.id === dataCustomer.defaultBillingAddressId ? 'true' : 'false',
        });
      }
    });
    return {
      email: dataCustomer.email,
      firstName: dataCustomer.firstName ? dataCustomer.firstName : DEFAULT_PROFILE_DATA.firstName,
      lastName: dataCustomer.lastName ? dataCustomer.lastName : DEFAULT_PROFILE_DATA.lastName,
      dateBirth: dataCustomer.dateOfBirth ? dataCustomer.dateOfBirth : DEFAULT_PROFILE_DATA.dateBirth,
      addresses: addresses,
    };
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
    const email = dataCustomerResponse.body.email;
    await LoginClient.getInstance().authorization(email, passwordObj.newPassword);
    State.getInstance().setRecord(APP_STATE_KEYS.TOKEN, `${JSON.stringify(LoginClient.getInstance().getToken())}`);
    this.token = this.getToken();
    State.getInstance().setRecord(APP_STATE_KEYS.VERSION, `${dataCustomerResponse.body.version}`);
  }

  public async updateAddress(addressObj: Address): Promise<void> {
    const dataCustomerResponse = await DataCustomer.getInstance().setNewAddress(this.token.token, addressObj);
    State.getInstance().setRecord(APP_STATE_KEYS.VERSION, `${dataCustomerResponse.body.version}`);
  }

  public async addNewAddress(addressObj: AddAddressObj): Promise<void> {
    const dataCustomerResponse = await DataCustomer.getInstance().addNewAddress(this.token.token, addressObj);
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
