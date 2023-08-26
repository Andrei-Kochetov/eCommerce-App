import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import IPasswordModalLogic from '@src/spa/logic/modalLogic/passwordModalLogic/types';
import { IPasswordModal } from '@src/spa/view/modal/passwordModal/types';

export default class PasswordModalLogic extends ModalLogic<IPasswordModal> implements IPasswordModalLogic {
  public constructor(modal: IPasswordModal) {
    super(modal);
  }

  public OnChangeLogic(): void {
    this.wereChanges = true;
  }

  protected beforeCloseActions(): void {
    console.log('before accept');
  }
}
