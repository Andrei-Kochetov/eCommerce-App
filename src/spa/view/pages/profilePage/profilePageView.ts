import '@src/spa/view/pages/profilePage/profilePage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';
import { ProfileData, UserParams, Address } from '@src/spa/logic/profile/profileDataManager/types';
import { IProfilePage } from '@src/spa/view/pages/profilePage/types';

const PROFILE_PAGE_CLASS = 'profile';

export default class ProfilePageView extends PageView implements IProfilePage {
  public constructor(params: ProfileData) {
    super(PageNames.CATALOG, PROFILE_PAGE_CLASS);
  }

  // here on the base of params you have to implement page view
  // getter methods

  // must be methods:
  public updateUserParams(params: UserParams): void {
    // here you on the base of argument of this method must update your User
    // info section on this page
  }

  public updateEmail(email: string): void {
    // here you on the base of argument of this method must update email
  }

  public updateAddresses(addresses: Address[]): void {
    // here you on the base of argument of this method must update addresses or what
    // may be will be better re-render addresses section from scratch
  }
}

// for test purposes I have placed a test obj at the end of routes file on path
// '@src/spa/logic/router/routes'
