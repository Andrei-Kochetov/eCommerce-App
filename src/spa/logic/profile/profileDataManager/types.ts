import { SetNameAndDateBirthObj } from '@src/spa/model/dataCustomer/types';
import { SetPasswordObj, AddAddressObj } from '@src/spa/model/dataCustomer/types';

export interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  addresses: CustomAddress[];
}

export interface CustomAddress {
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
  getProfileData(): Promise<ProfileData>;
  setNewEmail(newEmail: string): Promise<void>;
  setNewNameAndDateBirth(newNameAndDateBirth: SetNameAndDateBirthObj): Promise<void>;
  setNewPassword(passwordObj: SetPasswordObj): Promise<void>;
  updateAddress(addressObj: CustomAddress): Promise<void>;
  addNewAddress(addressObj: AddAddressObj): Promise<void>;
  deleteAddress(addressId: string): Promise<void>;
}

const date: Date = new Date(Date.now());
export const DEFAULT_PROFILE_DATA: ProfileData = {
  email: 'Not found',
  firstName: 'Not found',
  lastName: 'Not found',
  dateBirth: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
  addresses: [],
};

export const DEFAULT_ADDRESS: Omit<CustomAddress, 'id'> = {
  city: 'Not found',
  country: 'BY',
  postcode: '000000',
  street: 'Not found',
  isShipping: 'false',
  isBilling: 'false',
  isDefaultShipping: 'false',
  isDefaultBilling: 'false',
};
