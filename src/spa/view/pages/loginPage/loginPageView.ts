import '@src/spa/view/pages/loginPage/loginPage.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';
import PageView from '@src/spa/view/pages/pageView';
import { PAGE_NAME_ATTRIBUTE, PageNames } from '@src/spa/view/pages/types';
import { ILoginPageView } from '@src/spa/view/pages/loginPage/types';
import { IInput, IInputViewParams } from '@src/spa/view/input/types';
import PasswordInputView from '@src/spa/view/input/passwordInput/passwordInputView';
import InputView from '@src/spa/view/input/inputView';
import FormView from '@src/spa/view/form/formView';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import ButtonView from '@src/spa/view/button/buttonView';
import { btnParams } from '@src/spa/view/button/types';
import * as constants from '@src/spa/view/pages/loginPage/constants';
import LoginValidator from '@src/spa/logic/validator/loginValidator/loginValidator';
import LoginClient from '@src/spa/model/LoginClientApi/LoginClient';

export default class LoginPageView extends PageView implements ILoginPageView {
  private readonly passwordField: IInput;
  private readonly emailField: IInput;
  private readonly enterBTN: IView;
  private readonly homeBTN: IView;
  private readonly toRegistrationBTN: IView;

  public constructor() {
    super(PageNames.LOGIN, constants.PAGE_CLASS);
    this.passwordField = new PasswordInputView();
    this.emailField = this.createEmailField();
    this.enterBTN = this.createEnterBTN();
    this.homeBTN = this.createHomeBTN();
    this.toRegistrationBTN = this.createToRegistrationBTN();
    this.configureView();
  }

  public getPasswordField(): IInput {
    return this.passwordField;
  }

  public getEmailField(): IInput {
    return this.emailField;
  }

  public getEnterBTN(): IView {
    return this.enterBTN;
  }

  public getHomeBTN(): IView {
    return this.homeBTN;
  }

  public getToRegistrationBTN(): IView {
    return this.toRegistrationBTN;
  }

  private configureView(): void {
    const form: IElementCreator = new FormView().getViewCreator();
    const params: ElementCreatorParams = {
      tag: constants.TITLE_TAG,
      classNames: constants.TITLE_CLASSES,
      textContent: constants.TITLE_TEXT,
    };
    const title: IElementCreator = new ElementCreator(params);

    form.setClasses(constants.LOGIN_FORM_CLASS);
    form.addInnerElement(this.emailField.getView(), this.passwordField.getView());
    this.getViewCreator().addInnerElement(
      title,
      form,
      this.enterBTN.getView(),
      this.toRegistrationBTN.getView(),
      this.homeBTN.getView()
    );
  }

  private createEmailField(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'email',
        type: 'email',
        name: 'email',
      },
      textLabel: 'Email',
    };
    return new InputView(params);
  }

  private createEnterBTN(): IView {
    const params: btnParams = {
      textContent: constants.ENTER_BTN_TEXT,
      classNames: constants.FORM_BTN_CLASSES,
    };
    const button: IView = new ButtonView(params);
    button.getView().addEventListener('click', () => {
      if (new LoginValidator(this).validate()) {
        new LoginClient()
          .authorization(
            (this.emailField.getInput().getElement() as HTMLInputElement).value,
            (this.passwordField.getInput().getElement() as HTMLInputElement).value
          )
          .then(() => this.passwordField.setTextError(' '))
          .catch(() => this.passwordField.setTextError('You made a mistake in your email or password'));
      }
    });
    return button;
  }

  private createHomeBTN(): IView {
    const params: btnParams = {
      textContent: constants.HOME_BTN_TEXT,
      classNames: constants.FORM_BTN_CLASSES,
    };
    const button: IView = new ButtonView(params);
    button.getViewCreator().setAttributes({ [PAGE_NAME_ATTRIBUTE]: PageNames.MAIN });
    return button;
  }

  private createToRegistrationBTN(): IView {
    const params: btnParams = {
      textContent: constants.TO_REGISTRATION_BTN_TEXT,
      classNames: constants.FORM_BTN_CLASSES,
    };
    const button: IView = new ButtonView(params);
    button.getViewCreator().setAttributes({ [PAGE_NAME_ATTRIBUTE]: PageNames.REGISTRATION });
    return button;
  }
}
