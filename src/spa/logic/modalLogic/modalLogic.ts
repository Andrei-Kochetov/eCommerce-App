import { IModalLogic } from '@src/spa/logic/modalLogic/types';
import { IModal } from '@src/spa/view/modal/types';
import PopUpView from '@src/spa/view/popUp/popUpView';
import { IPopUpView } from '@src/spa/view/popUp/types';

const ARE_YOU_SURE_MESSAGE = `Addresses data have been changed.
  Are you sure you want to exit without saving those changes?
  To EXIT press CANCEL or X at the top once more`;

export default abstract class ModalLogic<T extends IModal> implements IModalLogic {
  private areYouSure: boolean;

  protected wereChanges: boolean;

  protected readonly modal: T;

  public constructor(modal: T) {
    this.areYouSure = false;
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
    if (this.wereChanges && !this.areYouSure) {
      this.areYouSure = true;
      const popUp: IPopUpView = PopUpView.getRejectPopUpWithoutImg(ARE_YOU_SURE_MESSAGE);
      popUp.showWithoutAutoHiding();
      return;
    } else {
      this.modal.hideModal();
    }
  }
}
