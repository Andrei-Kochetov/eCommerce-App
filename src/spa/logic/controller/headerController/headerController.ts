import { IRouter } from '@src/spa/logic/router/types';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';
import { IHeaderController } from '@src/spa/logic/controller/headerController/types';
import Controller from '@src/spa/logic/controller/controller';

export default class HeaderController extends Controller implements IHeaderController {
  public constructor(router: IRouter) {
    super(router);
  }

  public signOut(element: HTMLElement): void {
    this.state.setRecord(APP_STATE_KEYS.AUTHORIZED, 'false');
    this.state.setRecord(APP_STATE_KEYS.USER_LOGIN, '');
    this.goTo(element);
  }
}
