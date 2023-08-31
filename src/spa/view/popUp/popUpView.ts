import '@src/spa/view/popUp/popUp.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { IPopUp, IPopUpView } from '@src/spa/view/popUp/types';
import * as constants from '@src/spa/view/popUp/constants';

export default class PopUpView extends View implements IPopUpView {
  public constructor(text: string, img: HTMLElement | null) {
    const params: ElementCreatorParams = {
      tag: constants.POP_UP_TAG,
      classNames: [constants.POP_UP_CLASS_NAME],
    };
    super(params);
    this.configureView(text, img);
  }

  public show(): void {
    document.body.append(this.getView());
    setTimeout((): void => {
      this.getViewCreator().setClasses(constants.POP_UP_HIDDEN_CLASS_NAME);
      setTimeout((): void => this.getView().remove(), constants.HIDE_ANIMATION_DURATION);
    }, constants.SHOWING_TIME);
  }

  public showWithoutAutoHiding(): void {
    document.body.append(this.getView());
  }

  public static getRejectPopUp(text: string): IPopUp {
    const img = constants.rejectImg.getElement().cloneNode(true);
    if (!(img instanceof HTMLElement)) throw new Error('Pop up img error');
    const popUp: IPopUp = new PopUpView(text, img);
    popUp.getViewCreator().setClasses(constants.POP_UP_REJECT_CLASS_NAME);
    return popUp;
  }

  public static getRejectPopUpWithoutImg(text: string): IPopUp {
    const popUp: IPopUp = new PopUpView(text, null);
    popUp.getViewCreator().setClasses(constants.POP_UP_REJECT_CLASS_NAME);
    return popUp;
  }

  public static getApprovePopUp(text: string): IPopUp {
    const img = constants.approveImg.getElement().cloneNode(true);
    if (!(img instanceof HTMLElement)) throw new Error('Pop up img error');
    return new PopUpView(text, img);
  }

  private configureView(text: string, img: HTMLElement | null): void {
    const span: IElementCreator = this.createSpan(text);
    const button: IElementCreator = this.createButton();
    if (!img) {
      this.getViewCreator().addInnerElement(span, button);
    } else {
      this.getViewCreator().addInnerElement(img, span, button);
    }
  }

  private createButton(): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.BUTTON_TAG,
      classNames: [constants.BUTTON_CLASS],
      attributes: { type: 'button' },
      textContent: 'x',
      listenersParams: [{ event: 'click', callback: (): void => this.getView().remove() }],
    };
    const button: IElementCreator = new ElementCreator(params);
    return button;
  }

  private createSpan(text: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.TEXT_TAG,
      classNames: [constants.TEXT_CLASS],
      textContent: text,
    };
    const span: IElementCreator = new ElementCreator(params);
    return span;
  }
}
