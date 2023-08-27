import { Address, IProfileDataManager, ProfileData } from '@src/spa/logic/profile/profileDataManager/types';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import { TokenStore } from '@commercetools/sdk-client-v2';
import State from '@src/spa/logic/state/state';
import DataCustomer from '@src/spa/model/dataCustomer/dataCustomer';

export default class ProfileDataManager implements IProfileDataManager {
  private static readonly instance: IProfileDataManager = new ProfileDataManager();

  private readonly token: TokenStore;

  private constructor() {
    this.token = this.getToken();
  }

  public static getInstance(): IProfileDataManager {
    return this.instance;
  }

  public getProfileData(): number {
    return 1;
  }

  private getToken(): TokenStore {
    const state: IState = State.getInstance();
    const token: string = state.getRecord(APP_STATE_KEYS.TOKEN);
    return JSON.parse(token);
  }
}
