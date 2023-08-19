import { IRouter } from '@src/spa/logic/router/types';
import { PageNames } from '@src/spa/view/pages/types';
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

  public goToBasket(): void {
    if (this.state.getRecord(APP_STATE_KEYS.AUTHORIZED) === 'true') {
      this.router.navigate(PageNames.BASKET);
    } else {
      this.router.navigate(PageNames.LOGIN);
    }
  }

  public goToProfile(): void {
    if (this.state.getRecord(APP_STATE_KEYS.AUTHORIZED) === 'true') {
      this.router.navigate(PageNames.PROFILE);
    } else {
      this.router.navigate(PageNames.LOGIN);
    }
  }
}
