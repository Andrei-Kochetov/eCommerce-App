import { IProfileDataManager, ProfileData } from '@src/spa/logic/profile/profileDataManager/types';

export default class ProfileDataManager implements IProfileDataManager {
  // singleton

  private constructor() {
    // this.token = JSON.parse(State[TOKEN]);
  }

  public getProfileData(): ProfileData {
    //this method you have to implement
    throw new Error('Method not implemented.');
  }

  // and public methods for password, email, user-info, addresses updating
}
