import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import IEmailModalLogic from '@src/spa/logic/modalLogic/emailModalLogic/types';
import { IEmailModal } from '@src/spa/view/modal/emailModal/types';

export default class EmailModalLogic extends ModalLogic<IEmailModal> implements IEmailModalLogic {
  public constructor(modal: IEmailModal) {
    super(modal);
  }

  protected wasChanges(): boolean {
    return this.modal.getInitialState() !== this.modal.getEmailInput().getValue();
  }

  protected beforeCloseActions(): void {
    console.log('before accept');
  }
}
