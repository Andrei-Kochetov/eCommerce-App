import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import IUserInfoModalLogic, { SUCCESS_TEXT } from '@src/spa/logic/modalLogic/userInfoModalLogic/types';
import { IUserInfoModal } from '@src/spa/view/modal/userInfoModal/types';
import { UserParams } from '@src/spa/logic/profile/profileDataManager/types';
import { IProfilePage } from '@src/spa/view/pages/profilePage/types';
import RegistrationValidator from '@src/spa/logic/validator/registrationValidator/registrationValidator';
import ProfileDataManager from '@src/spa/logic/profile/profileDataManager/profileDataManager';
import PopUpView from '@src/spa/view/popUp/popUpView';
import { UNKNOWN_REQUEST_ERROR } from '@src/spa/logic/modalLogic/types';

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

  protected async beforeCloseActions(): Promise<boolean> {
    const userInfo: UserParams = this.modal.getAllValues();
    try {
      await ProfileDataManager.getInstance().setNewNameAndDateBirth(userInfo);
    } catch (err) {
      PopUpView.getRejectPopUp(UNKNOWN_REQUEST_ERROR).show();
      return true;
    }
    PopUpView.getApprovePopUp(SUCCESS_TEXT).show();
    this.page.changeUserInfo(this.modal.getAllValues());
    return true;
  }
}
