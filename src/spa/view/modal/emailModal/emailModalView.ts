import ModalView from '@src/spa/view/modal/modalView';
import { IInput, IInputViewParams } from '@src/spa/view/input/types';
import InputView from '@src/spa/view/input/inputView';
import FormView from '@src/spa/view/form/formView';
import IView from '@src/spa/view/types';
import { IEmailModal } from '@src/spa/view/modal/emailModal/types';
import IEmailModalLogic from '@src/spa/logic/modalLogic/emailModalLogic/types';
import EmailModalLogic from '@src/spa/logic/modalLogic/emailModalLogic/emailModalLogic';
import { IProfilePage } from '@src/spa/view/pages/profilePage/types';

export default class EmailModalView extends ModalView implements IEmailModal {
  private readonly emailInput: IInput;
  private readonly logic: IEmailModalLogic;
  private readonly initialState: string;

  public constructor(email: string, page: IProfilePage) {
    super();
    this.logic = new EmailModalLogic(this, page);
    this.initialState = email;
    this.emailInput = this.createEmailInput(email);
    this.configure();
  }

  public getInitialState(): string {
    return this.initialState;
  }

  public getEmailInput(): IInput {
    return this.emailInput;
  }

  private configure(): void {
    const form: IView = new FormView();

    form.getViewCreator().addInnerElement(this.emailInput.getView());
    this.addForm(form.getViewCreator());
    this.setListeners();
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

  private setListeners(): void {
    this.acceptBTN.setListeners({ event: 'click', callback: (): void => this.logic.acceptHandler() });
    this.cancelBTN.setListeners({ event: 'click', callback: (): void => this.logic.exitHandler() });
    this.closeBTN.setListeners({ event: 'click', callback: (): void => this.logic.exitHandler() });
  }
}
