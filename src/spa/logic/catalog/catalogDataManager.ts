//import {} from '@src/spa/logic/catalog/types';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import { TokenStore } from '@commercetools/sdk-client-v2';
import DataCustomer from '@src/spa/model/dataCustomer/dataCustomer';
import { SetPasswordObj, SetNameAndDateBirthObj } from '@src/spa/model/dataCustomer/types';
import State from '@src/spa/logic/state/state';
import DataCatalog from '@src/spa/model/dataCatalog/dataCatalog';

export default class CatalogDataManager /* implements IProfileDataManager */ {
  private static readonly instance = new CatalogDataManager();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    return this.instance;
  }

  public async getCatalogData() {
    const dataCatalogResponse = await DataCatalog.getInstance().getDataCatalog(this.getToken().token);
    console.log(dataCatalogResponse.body);
  }

  private getToken(): TokenStore {
    const state: IState = State.getInstance();
    const token: string = state.getRecord(APP_STATE_KEYS.TOKEN);
    return JSON.parse(token);
  }
}
