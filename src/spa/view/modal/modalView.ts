import '@src/spa/view/modal/modal.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { btnParams } from '@src/spa/view/button/types';
import ButtonView from '@src/spa/view/button/buttonView';
import { IModal } from '@src/spa/view/modal/types';
import * as constants from '@src/spa/view/modal/constants';

export default class ModalView extends View implements IModal {
  private readonly modalWrapper: IElementCreator;
  private readonly underlay: IElementCreator;

  protected readonly acceptBTN: IElementCreator;
  protected readonly cancelBTN: IElementCreator;
  protected readonly closeBTN: IElementCreator;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: constants.MODAL_TAG,
      classNames: [constants.MODAL_CLASS],
    };
    super(params);
    this.modalWrapper = this.createModalWrapper();
    this.acceptBTN = this.createAcceptBTN();
    this.cancelBTN = this.createCancelBTN();
    this.closeBTN = this.createCloseBTN();
    this.underlay = this.createUnderlay();
    this.configureView();
  }

  public showModal(): void {
    document.body.append(this.underlay.getElement());
    document.body.append(this.getView());
    document.body.classList.add(constants.LOCK_CLASS);
  }

  protected addForm(form: IElementCreator): void {
    this.modalWrapper.getElement().prepend(form.getElement());
  }

  protected hideModal(): void {
    this.underlay.setClasses(constants.UNDERLAY_HIDDEN_CLASS);
    this.getViewCreator().setClasses(constants.MODAL_HIDDEN_CLASS);

    setTimeout((): void => {
      this.getView().remove();
      this.underlay.getElement().remove();
      document.body.classList.remove(constants.LOCK_CLASS);
    }, constants.MODAL_REMOVE_DELAY);
  }

  private configureView(): void {
    const upperBarParams: ElementCreatorParams = {
      tag: constants.UPPER_BAR_TAG,
      classNames: [constants.UPPER_BAR_CLASS],
    };
    const upperBar: IElementCreator = new ElementCreator(upperBarParams);
    const btnWrapperParams: ElementCreatorParams = {
      tag: constants.BOTTOM_BAR_TAG,
      classNames: [constants.BOTTOM_BAR_CLASS],
    };
    const btnWrapper: IElementCreator = new ElementCreator(btnWrapperParams);

    upperBar.addInnerElement(this.closeBTN);
    btnWrapper.addInnerElement(this.cancelBTN, this.acceptBTN);
    this.getViewCreator().addInnerElement(upperBar, this.modalWrapper, btnWrapper);
  }

  private createUnderlay(): IElementCreator {
    const underlayParams: ElementCreatorParams = {
      tag: constants.UNDERLAY_TAG,
      classNames: [constants.UNDERLAY_CLASS],
    };
    return new ElementCreator(underlayParams);
  }

  private createModalWrapper(): IElementCreator {
    const wrapperParams: ElementCreatorParams = {
      tag: constants.MODAL_WRAPPER_TAG,
      classNames: [constants.MODAL_WRAPPER_CLASS],
    };
    return new ElementCreator(wrapperParams);
  }

  private createCloseBTN(): IElementCreator {
    const params: btnParams = {
      textContent: constants.CLOSE_BTN_TEXT,
      classNames: [constants.MODAL_BTN_CLASS, constants.CLOSE_BTN_CLASS],
    };
    const btn: IElementCreator = new ButtonView(params).getViewCreator();
    btn.setListeners({ event: 'click', callback: this.hideModal.bind(this) });
    return btn;
  }

  private createCancelBTN(): IElementCreator {
    const params: btnParams = {
      textContent: constants.CANCEL_BTN_TEXT,
      classNames: [constants.MODAL_BTN_CLASS, constants.CANCEL_BTN_CLASS],
    };
    const btn: IElementCreator = new ButtonView(params).getViewCreator();
    btn.setListeners({ event: 'click', callback: this.hideModal.bind(this) });
    return btn;
  }

  private createAcceptBTN(): IElementCreator {
    const params: btnParams = {
      textContent: constants.ACCEPT_BTN_TEXT,
      classNames: [constants.MODAL_BTN_CLASS, constants.ACCEPT_BTN_CLASS],
    };
    return new ButtonView(params).getViewCreator();
  }
}
