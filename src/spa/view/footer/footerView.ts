import '@src/spa/view/footer/types';
import '@src/spa/view/footer/footer.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import IView from '@src/spa/view/types';
import ContainerView from '@src/spa/view/container/containerView';
//import { IFooterView } from '@src/spa/view/footer/types';

// footer properties
const FOOTER_TAG = 'footer';
const FOOTER_CLASS_NAME = 'footer';
const FOOTER_CONTAINER_CLASS_NAME = 'footer__container';

export default class FooterView extends View /* implements IFooterView */ {
  private container!: IView;
  public constructor() {
    const params: ElementCreatorParams = {
      tag: FOOTER_TAG,
      classNames: [FOOTER_CLASS_NAME],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    this.container = new ContainerView();
    this.container.getViewCreator().setClasses(FOOTER_CONTAINER_CLASS_NAME);

    this.getViewCreator().addInnerElement(this.container.getViewCreator());
  }
}
