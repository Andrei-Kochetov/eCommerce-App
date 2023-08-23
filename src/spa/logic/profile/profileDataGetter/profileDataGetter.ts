import { IProfileDataGetter, ProfileData } from '@src/spa/logic/profile/profileDataGetter/types';

export default class ProfileDataGetter implements IProfileDataGetter {
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
