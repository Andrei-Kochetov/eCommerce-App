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
import { IRouter } from '@src/spa/logic/router/types';
import { ILoginController } from '@src/spa/logic/controller/loginController/types';
import LoginController from '@src/spa/logic/controller/loginController/loginController';
import LoginValidator from '@src/spa/logic/validator/loginValidator/loginValidator';

export default class LoginPageView extends PageView implements ILoginPageView {
  private readonly passwordField: IInput;
  private readonly emailField: IInput;
  private readonly enterBTN: IView;
  private readonly homeBTN: IView;
  private readonly toRegistrationBTN: IView;
  private readonly controller: ILoginController;

  public constructor(router: IRouter) {
    super(PageNames.LOGIN, constants.PAGE_CLASS);
    this.passwordField = new PasswordInputView();
    this.emailField = this.createEmailField();
    this.enterBTN = this.createEnterBTN();
    this.homeBTN = this.createHomeBTN();
    this.toRegistrationBTN = this.createToRegistrationBTN();
    this.configureView();
    this.controller = new LoginController(router, this);
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
    const emailInput = this.emailField.getInput().getElement();
    const passwordInput = this.passwordField.getInput().getElement();
    if (emailInput instanceof HTMLInputElement && passwordInput instanceof HTMLInputElement)
      emailInput.addEventListener('input', () => new LoginValidator(this).emailCheck(this.emailField));
    passwordInput.addEventListener('input', () => new LoginValidator(this).passwordCheck(this.passwordField));
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
        type: 'text',
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
    button.getViewCreator().setAttributes({ [PAGE_NAME_ATTRIBUTE]: PageNames.MAIN });
    button.getViewCreator().setListeners({
      event: 'click',
      callback: (): void => this.controller.login(button.getView()),
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
    button.getViewCreator().setListeners({
      event: 'click',
      callback: (): void => this.controller.goTo(button.getView()),
    });
    return button;
  }

  private createToRegistrationBTN(): IView {
    const params: btnParams = {
      textContent: constants.TO_REGISTRATION_BTN_TEXT,
      classNames: constants.FORM_BTN_CLASSES,
    };
    const button: IView = new ButtonView(params);
    button.getViewCreator().setAttributes({ [PAGE_NAME_ATTRIBUTE]: PageNames.REGISTRATION });
    button.getViewCreator().setListeners({
      event: 'click',
      callback: (): void => this.controller.goTo(button.getView()),
    });
    return button;
  }
}
