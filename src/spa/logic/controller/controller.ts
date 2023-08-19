import { IRouter } from '@src/spa/logic/router/types';
import { ELEMENT_PAGE_NAME_ATTRIBUTE } from '@src/spa/view/pages/types';
import { IState } from '@src/spa/logic/state/types';
import State from '@src/spa/logic/state/state';
import { IController } from '@src/spa/logic/controller/types';

export default class Controller implements IController {
  protected readonly router: IRouter;
  protected readonly state: IState;

  public constructor(router: IRouter) {
    this.router = router;
    this.state = State.getInstance();
  }

  public goTo(element: HTMLElement): void {
    const url: string | undefined = element.dataset[ELEMENT_PAGE_NAME_ATTRIBUTE];
    if (url) {
      this.router.navigate(url);
    }
  }
}
