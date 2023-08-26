import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import IEmailModalLogic from '@src/spa/logic/modalLogic/emailModalLogic/types';
import { IEmailModal } from '@src/spa/view/modal/emailModal/types';

export default class EmailModalLogic extends ModalLogic<IEmailModal> implements IEmailModalLogic {
  public constructor(modal: IEmailModal) {
    super(modal);
  }

  public emailOnChangeLogic(): void {
    this.wereChanges = true;
  }

  protected beforeCloseActions(): void {
    console.log('before accept');
  }
}
