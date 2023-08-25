import '@src/spa/view/modal/emailModal/emailModal.scss';
import ModalView from '@src/spa/view/modal/modalView';
import { IInput, IInputViewParams } from '@src/spa/view/input/types';
import InputView from '@src/spa/view/input/inputView';
import FormView from '@src/spa/view/form/formView';
import IView from '@src/spa/view/types';

export default class EmailModalView extends ModalView {
  private readonly emailInput: IInput;

  public constructor(email: string) {
    super();
    this.emailInput = this.createFirstNameInput(email);
    this.configure();
  }

  private configure(): void {
    const form: IView = new FormView();

    form.getViewCreator().addInnerElement(this.emailInput.getView());
    this.addForm(form.getViewCreator());
  }

  private createFirstNameInput(email: string): IInput {
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
