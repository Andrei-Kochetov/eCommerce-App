import ModalView from '@src/spa/view/modal/modalView';
import { IInput, IInputViewParams } from '@src/spa/view/input/types';
import InputView from '@src/spa/view/input/inputView';
import FormView from '@src/spa/view/form/formView';
import IView from '@src/spa/view/types';
import { IEmailModal } from '@src/spa/view/modal/emailModal/types';

export default class EmailModalView extends ModalView implements IEmailModal {
  private readonly emailInput: IInput;

  public constructor(email: string) {
    super();
    this.emailInput = this.createEmailInput(email);
    this.configure();
  }

  public getEmailInput(): IInput {
    return this.emailInput;
  }

  private configure(): void {
    const form: IView = new FormView();

    form.getViewCreator().addInnerElement(this.emailInput.getView());
    this.addForm(form.getViewCreator());
  }

  private createEmailInput(email: string): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'email',
        type: 'text',
        name: 'email',
        value: email,
      },
      textLabel: 'Email',
    };
    return new InputView(params);
  }
}
