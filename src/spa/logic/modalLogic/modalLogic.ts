import { IModalLogic } from '@src/spa/logic/modalLogic/types';
import { IModal } from '@src/spa/view/modal/types';

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
}
