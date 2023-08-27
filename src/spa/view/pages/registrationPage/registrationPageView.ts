import '@src/spa/view/pages/registrationPage/registration.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';
import PageView from '@src/spa/view/pages/pageView';
import { PAGE_NAME_ATTRIBUTE, PageNames } from '@src/spa/view/pages/types';
import { IRegistrationPageView } from '@src/spa/view/pages/registrationPage/types';
import { IInput, IInputViewParams } from '@src/spa/view/input/types';
import PasswordInputView from '@src/spa/view/input/passwordInput/passwordInputView';
import InputView from '@src/spa/view/input/inputView';
import FormView from '@src/spa/view/form/formView';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import ButtonView from '@src/spa/view/button/buttonView';
import { btnParams } from '@src/spa/view/button/types';
import * as constants from '@src/spa/view/pages/registrationPage/constants';
import SelectView from '@src/spa/view/select/selectView';
import { ISelect } from '@src/spa/view/select/types';
import IRegistrationController from '@src/spa/logic/controller/registrationController/types';
import { IRouter } from '@src/spa/logic/router/types';
import RegistrationController from '@src/spa/logic/controller/registrationController/registrationController';

export default class RegistrationPageView extends PageView implements IRegistrationPageView {
  private readonly passwordField: IInput;
  private readonly emailField: IInput;
  private readonly firstNameField: IInput;
  private readonly lastNameField: IInput;
  private readonly dateBirthField: IInput;
  private readonly singleAddress: IInput;
  private readonly billingAddressDefault: IInput;
  private readonly billingCountryField: ISelect;
  private readonly billingCityField: IInput;
  private readonly billingAddressField: IInput;
  private readonly billingPostCodeField: IInput;
  private readonly shippingAddressDefault: IInput;
  private readonly shippingCountryField: ISelect;
  private readonly shippingCityField: IInput;
  private readonly shippingAddressField: IInput;
  private readonly shippingPostCodeField: IInput;
  private readonly enterBTN: IView;
  private readonly homeBTN: IView;
  private readonly toLoginBTN: IView;
  private readonly controller: IRegistrationController;
  private shippingAddressDefaultFlag: boolean;
  private billingAddressDefaultFlag: boolean;
  private singleAddressFlag: boolean;
  private wrapperBillingAddress: IElementCreator;
  private titleShippingAddress: IElementCreator;
  public constructor(router: IRouter) {
    super(PageNames.REGISTRATION, constants.PAGE_CLASS);
    this.passwordField = new PasswordInputView();
    this.emailField = this.createEmailField();
    this.firstNameField = this.createFirstNameField();
    this.lastNameField = this.createLastNameField();
    this.dateBirthField = this.createDateBirthField();
    this.singleAddress = this.createSingleAddress();
    this.billingAddressDefault = this.createBillingAddressDefault();
    this.billingCountryField = this.createBillingСountryField();
    this.billingCityField = this.createBillingCityField();
    this.billingAddressField = this.createBillingAddressField();
    this.billingPostCodeField = this.createBillingPostCodeField();
    this.shippingAddressDefault = this.createShippindAddressDefault();
    this.shippingCountryField = this.createShippingСountryField();
    this.shippingCityField = this.createShippingCityField();
    this.shippingAddressField = this.createShippingAddressField();
    this.shippingPostCodeField = this.createShippingPostCodeField();
    this.enterBTN = this.createEnterBTN();
    this.homeBTN = this.createHomeBTN();
    this.toLoginBTN = this.createToLoginBTN();
    this.wrapperBillingAddress = this.configureBillingAddressView();
    this.titleShippingAddress = this.createParagraph('Shipping address');
    this.configureView();
    this.controller = new RegistrationController(router, this);
    this.shippingAddressDefaultFlag = false;
    this.billingAddressDefaultFlag = false;
    this.singleAddressFlag = false;
  }

  public getPasswordField(): IInput {
    return this.passwordField;
  }

  public getEmailField(): IInput {
    return this.emailField;
  }

  public getFirstNameField(): IInput {
    return this.firstNameField;
  }

  public getLastNameField(): IInput {
    return this.lastNameField;
  }

  public getDateBirthField(): IInput {
    return this.dateBirthField;
  }

  public getSingleAddress(): IInput {
    return this.singleAddress;
  }

  public getBillingAddressDefault(): IInput {
    return this.billingAddressDefault;
  }

  public getBillingCountryField(): ISelect {
    return this.billingCountryField;
  }

  public getBillingCityField(): IInput {
    return this.billingCityField;
  }

  public getBillingAddressField(): IInput {
    return this.billingAddressField;
  }

  public getBillingPostCodeField(): IInput {
    return this.billingPostCodeField;
  }

  public getShippingAddressDefault(): IInput {
    return this.shippingAddressDefault;
  }

  public getShippingCountryField(): ISelect {
    return this.shippingCountryField;
  }

  public getShippingCityField(): IInput {
    return this.shippingCityField;
  }

  public getShippingAddressField(): IInput {
    return this.shippingAddressField;
  }

  public getShippingPostCodeField(): IInput {
    return this.shippingPostCodeField;
  }

  public getEnterBTN(): IView {
    return this.enterBTN;
  }

  public getHomeBTN(): IView {
    return this.homeBTN;
  }

  public getToLoginBTN(): IView {
    return this.toLoginBTN;
  }

  public getSingleAddressFlag(): boolean {
    return this.singleAddressFlag;
  }

  private configureBillingAddressView(): IElementCreator {
    const wrapper = this.createWrapper(constants.ADDRESS_WRAPPER_CLASS_NAME);
    const titleBillingAddress = this.createParagraph('Billing address');
    wrapper.addInnerElement(
      titleBillingAddress.getElement(),
      this.billingAddressDefault.getView(),
      this.billingCountryField.getView(),
      this.billingCityField.getView(),
      this.billingAddressField.getView(),
      this.billingPostCodeField.getView()
    );
    return wrapper;
  }

  private configureShippingAddressView(): IElementCreator {
    const wrapper = this.createWrapper(constants.ADDRESS_WRAPPER_CLASS_NAME);
    wrapper.addInnerElement(
      this.titleShippingAddress.getElement(),
      this.shippingAddressDefault.getView(),
      this.shippingCountryField.getView(),
      this.shippingCityField.getView(),
      this.shippingAddressField.getView(),
      this.shippingPostCodeField.getView()
    );
    return wrapper;
  }

  private configureView(): void {
    const form: IElementCreator = new FormView().getViewCreator();
    const params: ElementCreatorParams = {
      tag: constants.TITLE_TAG,
      classNames: constants.TITLE_CLASSES,
      textContent: constants.TITLE_TEXT,
    };
    const title: IElementCreator = new ElementCreator(params);

    const wrapperShippingAddress = this.configureShippingAddressView();

    form.setClasses(constants.LOGIN_FORM_CLASS);
    form.addInnerElement(
      this.emailField.getView(),
      this.passwordField.getView(),
      this.firstNameField.getView(),
      this.lastNameField.getView(),
      this.dateBirthField.getView(),
      this.singleAddress.getView(),
      wrapperShippingAddress.getElement(),
      this.wrapperBillingAddress.getElement()
    );
    this.getViewCreator().addInnerElement(
      title,
      form,
      this.enterBTN.getView(),
      this.toLoginBTN.getView(),
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

  private createFirstNameField(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'first-name',
        type: 'text',
        name: 'first-name',
      },
      textLabel: 'First name',
    };
    return new InputView(params);
  }

  private createLastNameField(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'last-name',
        type: 'text',
        name: 'email',
      },
      textLabel: 'Last name',
    };
    return new InputView(params);
  }

  private createDateBirthField(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'date-birth',
        type: 'date',
        name: 'date-birth',
        value: '2010-08-01',
      },
      textLabel: 'Date of birth',
    };
    return new InputView(params);
  }

  private createBillingСountryField(): ISelect {
    const selectAttributes = {
      name: 'billind-country',
    };
    return new SelectView(selectAttributes);
  }
  private createBillingCityField(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'billing-сity',
        type: 'text',
        name: 'billing-сity',
      },
      textLabel: 'Сity',
    };
    return new InputView(params);
  }
  private createBillingAddressField(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'billing-address',
        type: 'text',
        name: 'billing-address',
      },
      textLabel: 'Street',
    };
    return new InputView(params);
  }
  private createBillingPostCodeField(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'billing-postcode',
        type: 'text',
        name: 'billing-postcode',
      },
      textLabel: 'Postal code',
    };
    return new InputView(params);
  }

  private createBillingAddressDefault(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'billing-address-default',
        type: 'checkbox',
        name: 'billing-address-default',
      },
      textLabel: 'Set to default address',
    };
    const checkbox = new InputView(params);
    checkbox.getViewCreator().setClasses('input-checkbox');
    checkbox.getView().addEventListener('click', (event: MouseEvent): void => {
      if (!(event.target instanceof HTMLInputElement)) return;
      if (event.target.id === 'billing-address-default') {
        this.billingAddressDefaultFlag = !this.billingAddressDefaultFlag;
      }
    });
    return checkbox;
  }

  private createShippingСountryField(): ISelect {
    const selectAttributes = {
      name: 'shipping-country',
    };
    return new SelectView(selectAttributes);
  }

  private createShippingCityField(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'shipping-сity',
        type: 'text',
        name: 'shipping-сity',
      },
      textLabel: 'Сity',
    };
    return new InputView(params);
  }
  private createShippingAddressField(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'shipping-address',
        type: 'text',
        name: 'shipping-address',
      },
      textLabel: 'Street',
    };
    return new InputView(params);
  }
  private createShippingPostCodeField(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'shipping-postcode',
        type: 'text',
        name: 'shipping-postcode',
      },
      textLabel: 'Postal code',
    };
    return new InputView(params);
  }

  private createShippindAddressDefault(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'shipping-address-default',
        type: 'checkbox',
        name: 'shipping-address-default',
      },
      textLabel: 'Set to default address',
    };
    const checkbox = new InputView(params);
    checkbox.getViewCreator().setClasses('input-checkbox');
    checkbox.getView().addEventListener('click', (event: MouseEvent): void => {
      if (!(event.target instanceof HTMLInputElement)) return;
      if (event.target.id === 'shipping-address-default') {
        this.shippingAddressDefaultFlag = !this.shippingAddressDefaultFlag;
      }
    });
    return checkbox;
  }

  private createSingleAddress(): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'single-address',
        type: 'checkbox',
        name: 'single-address',
      },
      textLabel: 'Set a single address',
    };
    const checkbox = new InputView(params);
    checkbox.getViewCreator().setClasses('input-checkbox');
    checkbox.getView().addEventListener('click', (event: MouseEvent): void => {
      if (!(event.target instanceof HTMLInputElement)) return;
      if (!(event.target.id === 'single-address' && event.target.checked)) {
        this.wrapperBillingAddress.getElement().classList.remove('_hidden');
        this.titleShippingAddress.setTextContent('Shipping address');
        this.singleAddressFlag = false;
        return;
      }
      this.wrapperBillingAddress.getElement().classList.add('_hidden');
      this.titleShippingAddress.setTextContent('Address');
      this.singleAddressFlag = true;
    });
    return checkbox;
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
      callback: (): void => this.controller.register(button.getView(), this.getValues()),
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

  private createToLoginBTN(): IView {
    const params: btnParams = {
      textContent: constants.TO_LOGIN_BTN_TEXT,
      classNames: constants.FORM_BTN_CLASSES,
    };
    const button: IView = new ButtonView(params);
    button.getViewCreator().setAttributes({ [PAGE_NAME_ATTRIBUTE]: PageNames.LOGIN });
    button.getViewCreator().setListeners({
      event: 'click',
      callback: (): void => this.controller.goTo(button.getView()),
    });
    return button;
  }

  private createWrapper(...classes: string[]): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.WRAPPER_TAG,
      classNames: classes,
    };
    const wrapper: IElementCreator = new ElementCreator(params);
    return wrapper;
  }

  private createParagraph(textContent: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.PARAGRAPH_TAG,
      classNames: [constants.ADDRESS_PARAGRAPH_CLASS_NAME],
    };
    const paragraph: IElementCreator = new ElementCreator(params);
    paragraph.setTextContent(textContent);
    return paragraph;
  }

  private getValues() {
    const registrationInputValue = {
      password: (this.passwordField.getInput().getElement() as HTMLInputElement).value,
      email: (this.emailField.getInput().getElement() as HTMLInputElement).value,
      firstName: (this.firstNameField.getInput().getElement() as HTMLInputElement).value,
      lastName: (this.lastNameField.getInput().getElement() as HTMLInputElement).value,
      dateBirth: (this.dateBirthField.getInput().getElement() as HTMLInputElement).value,
      billingAddressDefault: this.billingAddressDefaultFlag,
      billingCountry: (this.billingCountryField.getSelect().getElement() as HTMLInputElement).value,
      billingCity: (this.billingCityField.getInput().getElement() as HTMLInputElement).value,
      billingAddress: (this.billingAddressField.getInput().getElement() as HTMLInputElement).value,
      billingPost: (this.billingPostCodeField.getInput().getElement() as HTMLInputElement).value,
      shippingAddressDefault: this.shippingAddressDefaultFlag,
      shippingCountry: (this.shippingCountryField.getSelect().getElement() as HTMLInputElement).value,
      shippingCity: (this.shippingCityField.getInput().getElement() as HTMLInputElement).value,
      shippingAddress: (this.shippingAddressField.getInput().getElement() as HTMLInputElement).value,
      shippingPost: (this.shippingPostCodeField.getInput().getElement() as HTMLInputElement).value,
    };
    return registrationInputValue;
  }
}
