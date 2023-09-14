import { IRouter } from '@src/spa/logic/router/types';
import { IHeaderController } from '@src/spa/logic/controller/headerController/types';
import Controller from '@src/spa/logic/controller/controller';
import State from '@src/spa/logic/state/state';
export default class HeaderController extends Controller implements IHeaderController {
  public constructor(router: IRouter) {
    super(router);
  }

  public signOut(element: HTMLElement): void {
    State.getInstance().resetState();
    this.goTo(element);
  }
}
