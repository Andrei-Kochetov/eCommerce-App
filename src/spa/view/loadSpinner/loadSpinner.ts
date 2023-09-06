import spinnerSRC from '@src/assets/spinner.gif';
import '@src/spa/view/loadSpinner/loadSpinner.scss';
import '@src/spa/view/modal/modal.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { ILoadSpinner } from '@src/spa/view/loadSpinner/types';

const SPINNER_CONTAINER_TAG = 'div';
const SPINNER_CONTAINER_CLASS = 'spinner-container';

const SPINNER_CLASS = 'spinner';
const LOCK_CLASS = '_lock';

export default class LoadSpinnerView extends View implements ILoadSpinner {
  public constructor() {
    const params: ElementCreatorParams = {
      tag: SPINNER_CONTAINER_TAG,
      classNames: [SPINNER_CONTAINER_CLASS],
    };
    super(params);
    this.getViewCreator().addInnerElement(this.createSpinnerIMG());
  }

  public show(): void {
    document.body.classList.add(LOCK_CLASS);
    document.body.append(this.getView());
  }

  public hide(): void {
    this.getView().remove();
    document.body.classList.remove(LOCK_CLASS);
  }

  private createSpinnerIMG(): IElementCreator {
    const params: ElementCreatorParams = {
      tag: 'img',
      classNames: [SPINNER_CLASS],
      attributes: {
        src: spinnerSRC,
        alt: SPINNER_CLASS,
      },
    };

    return new ElementCreator(params);
  }
}
