import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import IUserInfoModalLogic from '@src/spa/logic/modalLogic/userInfoModalLogic/types';
import { IUserInfoModal } from '@src/spa/view/modal/userInfoModal/types';
import { UserParams } from '@src/spa/logic/profile/profileDataManager/types';
import { IProfilePage } from '@src/spa/view/pages/profilePage/types';
import RegistrationValidator from '../../validator/registrationValidator/registrationValidator';

export default class UserInfoModalLogic extends ModalLogic<IUserInfoModal> implements IUserInfoModalLogic {
  private readonly page: IProfilePage;

  public constructor(modal: IUserInfoModal, page: IProfilePage) {
    super(modal);
    this.page = page;
  }

  protected validate(): boolean {
    const arrFunc: boolean[] = [
      RegistrationValidator.firstNameCheck(this.modal.getFirstNameInput()),
      RegistrationValidator.lastNameCheck(this.modal.getLastNameInput()),
      RegistrationValidator.dateBirthCheck(this.modal.getBirthDateInput()),
    ];
    return arrFunc.every((el: boolean) => el === true);
  }

  protected wasChanges(): boolean {
    const currentState: UserParams = this.modal.getAllValues();
    const initialState: UserParams = this.modal.getInitialState();

    return !ModalLogic.ObjTopLevelCompare(currentState, initialState);
  }

  protected beforeCloseActions(): Promise<boolean> {
    this.page.changeUserInfo(this.modal.getAllValues());
    return Promise.resolve(true);
  }
}
