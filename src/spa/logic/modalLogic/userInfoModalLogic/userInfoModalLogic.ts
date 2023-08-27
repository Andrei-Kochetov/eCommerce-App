import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import IUserInfoModalLogic from '@src/spa/logic/modalLogic/userInfoModalLogic/types';
import { IUserInfoModal } from '@src/spa/view/modal/userInfoModal/types';
import { UserParams } from '@src/spa/logic/profile/profileDataManager/types';

export default class UserInfoModalLogic extends ModalLogic<IUserInfoModal> implements IUserInfoModalLogic {
  public constructor(modal: IUserInfoModal) {
    super(modal);
  }

  protected wasChanges(): boolean {
    const currentState: UserParams = this.modal.getAllValues();
    const initialState: UserParams = this.modal.getInitialState();

    return !ModalLogic.ObjTopLevelCompare(currentState, initialState);
  }

  protected beforeCloseActions(): void {
    console.log('before accept');
  }
}
