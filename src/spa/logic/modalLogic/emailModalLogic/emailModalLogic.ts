import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import IEmailModalLogic from '@src/spa/logic/modalLogic/emailModalLogic/types';
import { IEmailModal } from '@src/spa/view/modal/emailModal/types';
import { IProfilePage } from '@src/spa/view/pages/profilePage/types';
import RegistrationValidator from '@src/spa/logic/validator/registrationValidator/registrationValidator';

export default class EmailModalLogic extends ModalLogic<IEmailModal> implements IEmailModalLogic {
  private readonly page: IProfilePage;

  public constructor(modal: IEmailModal, page: IProfilePage) {
    super(modal);
    this.page = page;
  }

  protected validate(): boolean {
    return RegistrationValidator.emailCheck(this.modal.getEmailInput());
  }

  protected wasChanges(): boolean {
    return this.modal.getInitialState() !== this.modal.getEmailInput().getValue();
  }

  protected beforeCloseActions(): void {
    this.page.changeMail(this.modal.getEmailInput().getValue());
  }
}
