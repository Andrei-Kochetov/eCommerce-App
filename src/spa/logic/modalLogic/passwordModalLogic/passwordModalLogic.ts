import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import IPasswordModalLogic from '@src/spa/logic/modalLogic/passwordModalLogic/types';
import { ChangePasswordValues, IPasswordModal } from '@src/spa/view/modal/passwordModal/types';

export default class PasswordModalLogic extends ModalLogic<IPasswordModal> implements IPasswordModalLogic {
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

  protected beforeCloseActions(): void {
    console.log('before accept');
  }
}
