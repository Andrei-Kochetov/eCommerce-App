export type SetPasswordObj = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

export type SetNameAndDateBirthObj = {
  firstName: string;
  lastName: string;
  dateBirth: string;
};

export type SetAddressObj = {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  addressId: string;
};

export interface AddAddressObj {
  city: string;
  country: string;
  postcode: string;
  street: string;
}
