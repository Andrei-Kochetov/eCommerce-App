import { IModalLogic } from '@src/spa/logic/modalLogic/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import ButtonView from '@src/spa/view/button/buttonView';
import { btnParams } from '@src/spa/view/button/types';
import { IModal } from '@src/spa/view/modal/types';
import PopUpView from '@src/spa/view/popUp/popUpView';
import { IPopUpView } from '@src/spa/view/popUp/types';

const ARE_YOU_SURE_MESSAGE = `You want to exit without saving changes?`;
const YES_BTN_CLASS = 'btn_yes';

export default abstract class ModalLogic<T extends IModal> implements IModalLogic {
  protected wereChanges: boolean;

  protected readonly modal: T;

  public constructor(modal: T) {
    this.wereChanges = false;
    this.modal = modal;
  }

  protected abstract beforeCloseActions(): void;

  public acceptHandler(): void {
    if (this.wereChanges) {
      this.beforeCloseActions();
    }
    this.modal.hideModal();
  }

  public exitHandler(): void {
    if (this.wereChanges) {
      const popUp: IPopUpView = PopUpView.getRejectPopUpWithoutImg(ARE_YOU_SURE_MESSAGE);
      popUp.getView().prepend(this.createYesBTN(popUp).getElement());
      popUp.showWithoutAutoHiding();
      return;
    } else {
      this.modal.hideModal();
    }
  }

  private createYesBTN(popUp: IPopUpView): IElementCreator {
    const params: btnParams = {
      textContent: 'Yes',
      classNames: [YES_BTN_CLASS],
    };
    const button: IElementCreator = new ButtonView(params).getViewCreator();
    button.setListeners({
      event: 'click',
      callback: (): void => {
        this.modal.hideModal();
        popUp.getView().remove();
      },
    });
    return button;
  }
}
