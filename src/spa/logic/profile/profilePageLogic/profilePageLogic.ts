import { IUserInfoModal } from '@src/spa/view/modal/userInfoModal/types';
import UserInfoModalView from '@src/spa/view/modal/userInfoModal/userInfoModalView';
import { IProfilePage } from '@src/spa/view/pages/profilePage/types';
import { ProfileData, UserParams } from '@src/spa/logic/profile/profileDataManager/types';
import { IPasswordModal } from '@src/spa/view/modal/passwordModal/types';
import PasswordModalView from '@src/spa/view/modal/passwordModal/passwordModalView';
import EmailModalView from '@src/spa/view/modal/emailModal/emailModalView';
import { IEmailModal } from '@src/spa/view/modal/emailModal/types';
import { IAddressesModal } from '@src/spa/view/modal/addressesModal/types';
import AddressesModalView from '@src/spa/view/modal/addressesModal/addressesModalView';
import { IProfilePageLogic } from '@src/spa/logic/profile/profilePageLogic/types';

export default class ProfilePageLogic implements IProfilePageLogic {
  private readonly page: IProfilePage;

  public constructor(page: IProfilePage) {
    this.page = page;
  }

  public showUserInfoModal(): void {
    const data: ProfileData = this.page.getInitialState();
    const userData: UserParams = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateBirth: data.dateBirth,
    };
    const modal: IUserInfoModal = new UserInfoModalView(userData, this.page);

    modal.showModal();
  }

  public showPasswordModal(): void {
    const modal: IPasswordModal = new PasswordModalView();

    modal.showModal();
  }

  public showEmailModal(): void {
    const data: ProfileData = this.page.getInitialState();
    const modal: IEmailModal = new EmailModalView(data.email, this.page);

    modal.showModal();
  }

  public showAddressesModal(): void {
    const data: ProfileData = this.page.getInitialState();
    const modal: IAddressesModal = new AddressesModalView(data.addresses, this.page);

    modal.showModal();
  }
}
