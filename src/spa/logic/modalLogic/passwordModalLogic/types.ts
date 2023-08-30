export default interface IPasswordModalLogic {
  acceptHandler(): void;
  exitHandler(): void;
}

export const PASSWORD_MISMATCH = 'The given current password does not match.';
export const SUCCESS_TEXT = 'Your password has been changed successfully!';
