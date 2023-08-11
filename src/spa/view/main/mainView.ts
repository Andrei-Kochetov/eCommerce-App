import '@src/spa/view/main/main.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import IView from '@src/spa/view/types';
import ContainerView from '@src/spa/view/container/containerView';

// mainSection properties
const MAIN_TAG = 'main';
const MAIN_CLASS_NAME = 'main';
const MAIN_CONTAINER_CLASS_NAME = 'main__container';

export default class MainView extends View {
  private readonly container: IView;
  public constructor() {
    const params: ElementCreatorParams = {
      tag: MAIN_TAG,
      classNames: [MAIN_CLASS_NAME],
    };
    super(params);
    this.container = new ContainerView();
    this.container.getViewCreator().setClasses(MAIN_CONTAINER_CLASS_NAME);
    this.getViewCreator().addInnerElement(this.container.getViewCreator());
  }

  public addPage(component: IView): void {
    this.container.getViewCreator().clearInnerHTML();
    this.container.getViewCreator().addInnerElement(component.getView());
  }
}
