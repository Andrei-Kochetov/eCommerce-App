import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import IPasswordModalLogic from '@src/spa/logic/modalLogic/passwordModalLogic/types';
import { IInput } from '@src/spa/view/input/types';
import { ChangePasswordValues, IPasswordModal } from '@src/spa/view/modal/passwordModal/types';
import RegistrationValidator from '../../validator/registrationValidator/registrationValidator';

const NOT_SAME_VALUE_ERROR = 'Fields has not the same values';

export default class PasswordModalLogic extends ModalLogic<IPasswordModal> implements IPasswordModalLogic {
  private isSameValueError = false;

  public constructor(modal: IPasswordModal) {
    super(modal);
  }

  protected wasChanges(): boolean {
    const fieldsValues: ChangePasswordValues = this.modal.getAllValues();
    let result = false;

    Object.values(fieldsValues).forEach((value: string): void => {
      if (value) result = true;
    });

    return result;
  }

  protected validate(): boolean {
    const newPassword: IInput = this.modal.getNewPasswordInput();
    const repeatNewPassword: IInput = this.modal.getRepeatNewPasswordInput();
    const oldPassword: IInput = this.modal.getOldPasswordInput();

    const arrFunc: boolean[] = [
      RegistrationValidator.passwordCheck(newPassword),
      RegistrationValidator.passwordCheck(repeatNewPassword),
      RegistrationValidator.passwordCheck(oldPassword),
      this.sameValuesCheck(newPassword, repeatNewPassword),
    ];

    return arrFunc.every((el: boolean) => el === true);
  }

  protected beforeCloseActions(): Promise<boolean> {
    return Promise.resolve(true);
  }

  private sameValuesCheck(input_1: IInput, input_2: IInput): boolean {
    if (input_1.getValue() !== input_2.getValue()) {
      this.isSameValueError = true;
      input_1.setTextError(NOT_SAME_VALUE_ERROR);
      input_2.setTextError(NOT_SAME_VALUE_ERROR);
      input_1.getInput().setListeners({ event: 'focus', callback: (): void => this.inputErrorsHide(input_1, input_2) });
      input_2.getInput().setListeners({ event: 'focus', callback: (): void => this.inputErrorsHide(input_1, input_2) });
      return false;
    }

    return true;
  }

  private inputErrorsHide(input_1: IInput, input_2: IInput): void {
    this.isSameValueError = false;
    input_1.setTextError(' ');
    input_2.setTextError(' ');
  }
}
