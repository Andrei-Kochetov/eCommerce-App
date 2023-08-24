import { IProfileDataManager, ProfileData } from '@src/spa/logic/profile/profileDataManager/types';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import State from '@src/spa/logic/state/state';
import { TokenCache } from '@commercetools/sdk-client-v2';

export default class ProfileDataManager implements IProfileDataManager {
  private static readonly instance: IProfileDataManager = new ProfileDataManager();

  private readonly token: TokenCache;

  private constructor() {
    this.token = this.getToken();
  }

  public static getInstance(): IProfileDataManager {
    return this.instance;
  }

  public getProfileData(): ProfileData {
    //this method you have to implement
    throw new Error('Method not implemented.');
  }

  // and public methods for password, email, user-info, addresses updating

  private getToken(): TokenCache {
    const state: IState = State.getInstance();
    const token = state.getRecord(APP_STATE_KEYS.TOKEN);
    return JSON.parse(token);
  }
}
