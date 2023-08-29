import { SetNameAndDateBirthObj } from '@src/spa/model/dataCustomer/types';
import { SetPasswordObj, AddAddressObj } from '@src/spa/model/dataCustomer/types';

export interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  city: string;
  country: string;
  postcode: string;
  street: string;
  isShipping: 'true' | 'false';
  isBilling: 'true' | 'false';
  isDefaultShipping: 'true' | 'false';
  isDefaultBilling: 'true' | 'false';
}

export type UserParams = Pick<ProfileData, 'firstName' | 'lastName' | 'dateBirth'>;

export interface IProfileDataManager {
  getProfileData(): Promise<ProfileData | undefined>;
  setNewEmail(newEmail: string): Promise<void>;
  setNewNameAndDateBirth(newNameAndDateBirth: SetNameAndDateBirthObj): Promise<void>;
  setNewPassword(passwordObj: SetPasswordObj): Promise<void>;
  setNewAddress(addressObj: Address): Promise<void>;
  addNewAddress(addressObj: AddAddressObj): Promise<void>;
  deleteAddress(addressId: string): Promise<void>;
}
