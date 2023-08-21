export enum ErrorMessages {
  EMPTY_FIELD = 'This field is empty',
  WEAK_PASSWORD = 'Up/Lowcase latin letters, numbers, special char',
  EMAIL = 'Invalid email',
  ONLY_TEXT = 'Latin and cyrillic letters, spase and dash',
  ADDRESS = 'Letters, numbers, special char - . , /',
  MIN_DATE_BIRTH = 'Minimum age 13 years',
  POST_CODE = 'Only numbers, capital Latin letters and space',
  COUNTRY = 'No country selected',
  AUTHORIZATION = 'You made a mistake in your email or password',
  SPASE_START = 'The field must not start with a space',
  SPACE_END = 'The field must not end with a space',
  REGISTRATION = 'User with such an email is already exist',
}
