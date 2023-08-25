import '@src/spa/view/popUp/popUp.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { IPopUp, IPopUpView } from '@src/spa/view/popUp/types';
import IMG_REJECT_SRC from '@src/assets/reject-mark.png';
import IMG_APPROVE_SRC from '@src/assets/approve-mark.png';

const POP_UP_TAG = 'div';
const POP_UP_CLASS_NAME = 'pop-up';
const POP_UP_HIDDEN_CLASS_NAME = 'pop-up_hidden';
const POP_UP_REJECT_CLASS_NAME = 'pop-up_reject';

const IMG_TAG = 'img';
const IMG_APPROVE_CLASS_NAME = 'pop-up__img';

const TEXT_TAG = 'span';
const TEXT_CLASS = 'pop-up__text';

const BUTTON_TAG = 'button';
const BUTTON_CLASS = 'pop-up__button';

const SHOWING_TIME = 3000; //ms
const HIDE_ANIMATION_DURATION = 490; //ms

export default class PopUpView extends View implements IPopUpView {
  public constructor(text: string, imgSrc: string) {
    const params: ElementCreatorParams = {
      tag: POP_UP_TAG,
      classNames: [POP_UP_CLASS_NAME],
    };
    super(params);
    this.configureView(text, imgSrc);
  }

  public show(): void {
    document.body.append(this.getView());
    setTimeout((): void => {
      this.getViewCreator().setClasses(POP_UP_HIDDEN_CLASS_NAME);
      setTimeout((): void => this.getView().remove(), HIDE_ANIMATION_DURATION);
    }, SHOWING_TIME);
  }

  public static getRejectPopUp(text: string): IPopUp {
    const popUp: IPopUp = new PopUpView(text, IMG_REJECT_SRC);
    popUp.getViewCreator().setClasses(POP_UP_REJECT_CLASS_NAME);
    return popUp;
  }

  public static getApprovePopUp(text: string): IPopUp {
    return new PopUpView(text, IMG_APPROVE_SRC);
  }

  private configureView(text: string, imgSrc: string): void {
    const img: IElementCreator = this.createImg(imgSrc);
    const span: IElementCreator = this.createSpan(text);
    const button: IElementCreator = this.createButton();
    this.getViewCreator().addInnerElement(img, span, button);
  }

  private createImg(imgSrc: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: IMG_TAG,
      classNames: [IMG_APPROVE_CLASS_NAME],
      attributes: {
        alt: IMG_APPROVE_CLASS_NAME,
        src: imgSrc,
      },
    };
    const img: IElementCreator = new ElementCreator(params);
    return img;
  }

  private createButton(): IElementCreator {
    const params: ElementCreatorParams = {
      tag: BUTTON_TAG,
      classNames: [BUTTON_CLASS],
      attributes: { type: 'button' },
      textContent: 'x',
      listenersParams: [{ event: 'click', callback: (): void => this.getView().remove() }],
    };
    const button: IElementCreator = new ElementCreator(params);
    return button;
  }

  private createSpan(text: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: TEXT_TAG,
      classNames: [TEXT_CLASS],
      textContent: text,
    };
    const span: IElementCreator = new ElementCreator(params);
    return span;
  }
}
