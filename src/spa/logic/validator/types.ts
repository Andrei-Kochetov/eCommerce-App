export const MAX_AGE = 120; //years
export const MIN_AGE = 13; //years

export enum ErrorMessages {
  EMPTY_FIELD = 'This field must not be empty',
  WEAK_PASSWORD = 'Up/Lowercase latin letters, numbers, special char',
  EMAIL = 'Invalid email',
  ONLY_TEXT = 'Latin and cyrillic letters, spaces and dashes',
  ADDRESS = 'Letters, numbers, special char - . , /',
  MIN_DATE_BIRTH = `Minimum age ${MIN_AGE} years`,
  MAX_DATE_BIRTH = `Maximum age ${MAX_AGE} years`,
  POST_CODE = 'Only numbers, capital Latin letters and spaces',
  COUNTRY = 'No country selected',
  AUTHORIZATION = 'You made a mistake in your email or password',
  SPASE_START = 'The field must not start with a space',
  SPACE_END = 'The field must not end with a space',
  REGISTRATION = 'User with such an email is already exist',
  REMOVE_PRODUCT_BASKET = 'Failed to remove item from cart',
  ADD_PRODUCT_BASKET = 'Failed to add item from cart',
}
