import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import IUserInfoModalLogic from '@src/spa/logic/modalLogic/userInfoModalLogic/types';
import { IUserInfoModal } from '@src/spa/view/modal/userInfoModal/types';

export default class UserInfoModalLogic extends ModalLogic<IUserInfoModal> implements IUserInfoModalLogic {
  public constructor(modal: IUserInfoModal) {
    super(modal);
  }

  public OnChangeLogic(): void {
    this.wereChanges = true;
  }

  protected beforeCloseActions(): void {
    console.log('before accept');
  }
}
