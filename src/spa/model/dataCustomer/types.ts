export type SetPasswordObj = {
  currentPassword: string;
  newPassword: string;
};

export type SetNameAndDateBirthObj = {
  newFirstName: string;
  newLastName: string;
  newDateBirth: string;
};

export type SetAddressObj = {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  addressId: string;
};
