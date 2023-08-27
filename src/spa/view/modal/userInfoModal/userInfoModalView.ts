import ModalView from '@src/spa/view/modal/modalView';
import { UserParams } from '@src/spa/logic/profile/profileDataManager/types';
import { IInput, IInputViewParams } from '@src/spa/view/input/types';
import InputView from '@src/spa/view/input/inputView';
import FormView from '@src/spa/view/form/formView';
import IView from '@src/spa/view/types';
import { IUserInfoModal } from '@src/spa/view/modal/userInfoModal/types';
import UserInfoModalLogic from '@src/spa/logic/modalLogic/userInfoModalLogic/userInfoModalLogic';
import IUserInfoModalLogic from '@src/spa/logic/modalLogic/userInfoModalLogic/types';

export default class UserInfoModalView extends ModalView implements IUserInfoModal {
  private readonly firstNameInput: IInput;
  private readonly lastNameInput: IInput;
  private readonly birthDateInput: IInput;
  private readonly logic: IUserInfoModalLogic = new UserInfoModalLogic(this);
  private readonly initialState: UserParams;

  public constructor(params: UserParams) {
    super();
    this.initialState = params;
    this.firstNameInput = this.createFirstNameInput(params.firstName);
    this.lastNameInput = this.createLastNameInput(params.lastName);
    this.birthDateInput = this.createBirthDateInput(params.dateBirth);
    this.configure();
  }

  public getInitialState(): UserParams {
    return this.initialState;
  }

  public getFirstNameInput(): IInput {
    return this.firstNameInput;
  }

  public getLastNameInput(): IInput {
    return this.lastNameInput;
  }

  public getBirthDateInput(): IInput {
    return this.birthDateInput;
  }

  public getAllValues(): UserParams {
    return {
      firstName: this.firstNameInput.getValue(),
      lastName: this.lastNameInput.getValue(),
      dateBirth: this.birthDateInput.getValue(),
    };
  }

  private configure(): void {
    const form: IView = new FormView();

    form
      .getViewCreator()
      .addInnerElement(this.firstNameInput.getView(), this.lastNameInput.getView(), this.birthDateInput.getView());
    this.addForm(form.getViewCreator());
    this.setListeners();
  }

  private createFirstNameInput(firstName: string): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'first-name',
        type: 'text',
        name: 'first-name',
        value: firstName,
      },
      textLabel: 'First name',
    };
    return new InputView(params);
  }

  private createLastNameInput(lastName: string): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'last-name',
        type: 'text',
        name: 'last-name',
        value: lastName,
      },
      textLabel: 'Last name',
    };
    return new InputView(params);
  }

  private createBirthDateInput(date: string): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'date-birth',
        type: 'date',
        name: 'date-birth',
        value: date,
      },
      textLabel: 'Date of birth',
    };

    return new InputView(params);
  }

  private setListeners(): void {
    this.acceptBTN.setListeners({ event: 'click', callback: (): void => this.logic.acceptHandler() });
    this.cancelBTN.setListeners({ event: 'click', callback: (): void => this.logic.exitHandler() });
    this.closeBTN.setListeners({ event: 'click', callback: (): void => this.logic.exitHandler() });
  }
}
