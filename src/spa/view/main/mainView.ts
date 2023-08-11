import '@src/spa/view/main/main.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import IView from '../types';
import ContainerView from '../container/containerView';

// mainSection properties
const MAIN_TAG = 'main';
const MAIN_CLASS_NAME = 'main';
const MAIN_CONTAINER_CLASS_NAME = 'container_main';

export default class MainView extends View {
  protected readonly container: IView;
  public constructor() {
    const params: ElementCreatorParams = {
      tag: MAIN_TAG,
      classNames: [MAIN_CLASS_NAME],
    };
    super(params);
    this.container = new ContainerView();
  }

  public addPage(component: IView): void {
    const mainContainer = this.container.getViewCreator();
    mainContainer.setClasses(MAIN_CONTAINER_CLASS_NAME);
    mainContainer.addInnerElement(component.getView());
    this.getViewCreator().clearInnerHTML();
    this.getViewCreator().addInnerElement(mainContainer);
  }
}
