export default interface IEmailModalLogic {
  acceptHandler(): void;
  exitHandler(): void;
}

export const SUCH_EMAIL_EXIST = 'There is already an existing customer with the provided email.';
export const SUCCESS_TEXT = 'Your email has been changed successfully!';
