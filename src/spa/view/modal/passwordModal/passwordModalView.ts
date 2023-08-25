import '@src/spa/view/modal/passwordModal/passwordModal.scss';
import ModalView from '@src/spa/view/modal/modalView';
import { IInput } from '@src/spa/view/input/types';
import FormView from '@src/spa/view/form/formView';
import IView from '@src/spa/view/types';
import PasswordInputView from '@src/spa/view/input/passwordInput/passwordInputView';

const NEW_PASSWORD_LABEL_TEXT = 'New password';
const REPEAT_NEW_PASSWORD_LABEL_TEXT = 'Repeat new password';
const OLD_PASSWORD_LABEL_TEXT = 'Old password';

export default class PasswordModalView extends ModalView {
  private readonly newPasswordInput: IInput;
  private readonly repeatNewPasswordInput: IInput;
  private readonly oldPasswordInput: IInput;

  public constructor() {
    super();
    this.newPasswordInput = new PasswordInputView();
    this.repeatNewPasswordInput = new PasswordInputView();
    this.oldPasswordInput = new PasswordInputView();
    this.configure();
  }

  private configure(): void {
    const form: IView = new FormView();

    this.newPasswordInput.changeLabelText(NEW_PASSWORD_LABEL_TEXT);
    this.repeatNewPasswordInput.changeLabelText(REPEAT_NEW_PASSWORD_LABEL_TEXT);
    this.oldPasswordInput.changeLabelText(OLD_PASSWORD_LABEL_TEXT);
    form
      .getViewCreator()
      .addInnerElement(
        this.newPasswordInput.getView(),
        this.repeatNewPasswordInput.getView(),
        this.oldPasswordInput.getView()
      );
    this.addForm(form.getViewCreator());
  }
}
