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
  getProfileData(): ProfileData;
  // and other methods we discuss
}
