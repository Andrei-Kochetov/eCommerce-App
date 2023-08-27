import ModalView from '@src/spa/view/modal/modalView';
import { IInput } from '@src/spa/view/input/types';
import FormView from '@src/spa/view/form/formView';
import IView from '@src/spa/view/types';
import PasswordInputView from '@src/spa/view/input/passwordInput/passwordInputView';
import { ChangePasswordValues, IPasswordModal } from '@src/spa/view/modal/passwordModal/types';
import PasswordModalLogic from '@src/spa/logic/modalLogic/passwordModalLogic/passwordModalLogic';
import IPasswordModalLogic from '@src/spa/logic/modalLogic/passwordModalLogic/types';

const NEW_PASSWORD_LABEL_TEXT = 'New password';
const REPEAT_NEW_PASSWORD_LABEL_TEXT = 'Repeat new password';
const OLD_PASSWORD_LABEL_TEXT = 'Old password';

const NEW_PASSWORD_ID = 'password-new';
const REPEAT_NEW_PASSWORD_ID = 'password-new-repeat';
const OLD_PASSWORD_ID = 'password-old';

export default class PasswordModalView extends ModalView implements IPasswordModal {
  private readonly newPasswordInput: IInput;
  private readonly repeatNewPasswordInput: IInput;
  private readonly oldPasswordInput: IInput;
  private readonly logic: IPasswordModalLogic = new PasswordModalLogic(this);

  public constructor() {
    super();
    this.newPasswordInput = new PasswordInputView();
    this.repeatNewPasswordInput = new PasswordInputView();
    this.oldPasswordInput = new PasswordInputView();
    this.configure();
  }

  public getNewPasswordInput(): IInput {
    return this.newPasswordInput;
  }

  public getRepeatNewPasswordInput(): IInput {
    return this.repeatNewPasswordInput;
  }

  public getOldPasswordInput(): IInput {
    return this.oldPasswordInput;
  }

  public getAllValues(): ChangePasswordValues {
    return {
      newPassword: this.newPasswordInput.getValue(),
      repeatNewPassword: this.repeatNewPasswordInput.getValue(),
      oldPassword: this.oldPasswordInput.getValue(),
    };
  }

  private configure(): void {
    const form: IView = new FormView();

    this.newPasswordInput.changeLabelText(NEW_PASSWORD_LABEL_TEXT);
    this.repeatNewPasswordInput.changeLabelText(REPEAT_NEW_PASSWORD_LABEL_TEXT);
    this.oldPasswordInput.changeLabelText(OLD_PASSWORD_LABEL_TEXT);

    this.newPasswordInput.changeID(NEW_PASSWORD_ID);
    this.repeatNewPasswordInput.changeID(REPEAT_NEW_PASSWORD_ID);
    this.oldPasswordInput.changeID(OLD_PASSWORD_ID);

    form
      .getViewCreator()
      .addInnerElement(
        this.newPasswordInput.getView(),
        this.repeatNewPasswordInput.getView(),
        this.oldPasswordInput.getView()
      );
    this.addForm(form.getViewCreator());
    this.setListeners();
  }

  private setListeners(): void {
    this.acceptBTN.setListeners({ event: 'click', callback: (): void => this.logic.acceptHandler() });
    this.cancelBTN.setListeners({ event: 'click', callback: (): void => this.logic.exitHandler() });
    this.closeBTN.setListeners({ event: 'click', callback: (): void => this.logic.exitHandler() });
  }
}
