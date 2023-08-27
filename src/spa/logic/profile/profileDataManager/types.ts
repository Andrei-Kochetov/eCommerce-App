export interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  addresses: Address[];
}

export interface Address {
  city: string;
  country: string;
  postcode: string;
  street: string;
  id: string;
  isShipping: 'true' | 'false';
  isBilling: 'true' | 'false';
  isDefaultShipping: 'true' | 'false';
  isDefaultBilling: 'true' | 'false';
}

export interface IProfileDataManager {
  getProfileData(): Promise<ProfileData | undefined>;
  // and other methods we discuss
}
