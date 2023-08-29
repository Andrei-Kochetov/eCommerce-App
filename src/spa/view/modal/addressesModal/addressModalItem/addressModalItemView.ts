import '@src/spa/view/modal/addressesModal/addressModalItem/addressModalItem.scss';
import { CustomAddress } from '@src/spa/logic/profile/profileDataManager/types';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import * as constants from '@src/spa/view/modal/addressesModal/addressModalItem/constants';
import { btnParams } from '@src/spa/view/button/types';
import ButtonView from '@src/spa/view/button/buttonView';
import View from '@src/spa/view/view';
import { IInput, IInputViewParams } from '@src/spa/view/input/types';
import InputView from '@src/spa/view/input/inputView';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import CheckboxView from '@src/spa/view/checkbox/checkboxView';
import { ICheckbox } from '@src/spa/view/checkbox/types';
import { IAddressModalItem } from '@src/spa/view/modal/addressesModal/addressModalItem/types';
import IAddressModalLogic from '@src/spa/logic/modalLogic/addressModalLogic/types';
import { ISelect } from '@src/spa/view/select/types';
import SelectView from '@src/spa/view/select/selectView';

export default class AddressModalItemView extends View implements IAddressModalItem {
  private readonly deleteAddressBTN: IElementCreator;

  //text inputs
  private readonly countryInput: ISelect;
  private readonly cityInput: IInput;
  private readonly streetInput: IInput;
  private readonly postCodeInput: IInput;

  //checkboxes
  private readonly isShippingInput: ICheckbox;
  private readonly isBillingInput: ICheckbox;
  private readonly isDefaultShippingInput: ICheckbox;
  private readonly isDefaultBillingInput: ICheckbox;

  private readonly ID: string;

  private readonly logic: IAddressModalLogic;

  public constructor(address: CustomAddress, logic: IAddressModalLogic) {
    const params: ElementCreatorParams = {
      tag: constants.ADDRESS_ITEM_TAG,
      classNames: [constants.ADDRESS_ITEM_CLASS],
      attributes: { [constants.ADDRESS_ITEM_ID_ATTRIBUTE]: address.id },
    };
    super(params);
    this.logic = logic;
    this.ID = address.id;
    this.deleteAddressBTN = this.createDeleteAddressBTN();
    this.countryInput = this.createCountryInput(address.country);
    this.cityInput = this.createCityInput(address.city);
    this.streetInput = this.createStreetInput(address.street);
    this.postCodeInput = this.createPostCodeInput(address.postcode);
    this.isShippingInput = new CheckboxView(constants.IS_SHIPPING_CHECKBOX_TEXT, address.isShipping);
    this.isDefaultShippingInput = new CheckboxView(
      constants.IS_DEFAULT_SHIPPING_CHECKBOX_TEXT,
      address.isDefaultShipping
    );
    this.isBillingInput = new CheckboxView(constants.IS_BILLING_CHECKBOX_TEXT, address.isBilling);
    this.isDefaultBillingInput = new CheckboxView(constants.IS_DEFAULT_BILLING_CHECKBOX_TEXT, address.isDefaultBilling);
    this.configure();
  }

  public getID(): string {
    return this.ID;
  }

  public getCountryInput(): ISelect {
    return this.countryInput;
  }

  public getCityInput(): IInput {
    return this.cityInput;
  }

  public getStreetInput(): IInput {
    return this.streetInput;
  }

  public getPostCodeInput(): IInput {
    return this.postCodeInput;
  }

  public getIsShippingInput(): ICheckbox {
    return this.isShippingInput;
  }

  public getIsBillingInput(): ICheckbox {
    return this.isBillingInput;
  }

  public getIsDefaultShippingInput(): ICheckbox {
    return this.isDefaultShippingInput;
  }

  public getIsDefaultBillingInput(): ICheckbox {
    return this.isDefaultBillingInput;
  }

  public getAllValues(): CustomAddress {
    return {
      id: this.ID,
      city: this.cityInput.getValue(),
      country: this.countryInput.getValue(),
      postcode: this.postCodeInput.getValue(),
      street: this.streetInput.getValue(),
      isShipping: this.isShippingInput.getValue(),
      isBilling: this.isBillingInput.getValue(),
      isDefaultShipping: this.isDefaultShippingInput.getValue(),
      isDefaultBilling: this.isDefaultBillingInput.getValue(),
    };
  }

  private configure(): void {
    const checkboxWrapperParams: ElementCreatorParams = {
      tag: constants.CHECKBOX_WRAPPER_TAG,
      classNames: [constants.CHECKBOX_WRAPPER_CLASS],
    };
    const inputsWrapperParams: ElementCreatorParams = {
      tag: constants.INPUTS_WRAPPER_TAG,
      classNames: [constants.INPUTS_WRAPPER_CLASS],
    };
    const wrapperParams: ElementCreatorParams = {
      tag: constants.WRAPPER_TAG,
      classNames: [constants.WRAPPER_CLASS],
    };
    const checkboxWrapper: IElementCreator = new ElementCreator(checkboxWrapperParams);
    const inputsWrapper: IElementCreator = new ElementCreator(inputsWrapperParams);
    const wrapper: IElementCreator = new ElementCreator(wrapperParams);

    checkboxWrapper.addInnerElement(
      this.isShippingInput.getView(),
      this.isBillingInput.getView(),
      this.isDefaultShippingInput.getView(),
      this.isDefaultBillingInput.getView()
    );
    inputsWrapper.addInnerElement(
      this.countryInput.getView(),
      this.cityInput.getView(),
      this.streetInput.getView(),
      this.postCodeInput.getView()
    );
    wrapper.addInnerElement(checkboxWrapper, inputsWrapper);
    this.getViewCreator().addInnerElement(wrapper, this.deleteAddressBTN);

    this.addListeners();
  }

  private createCityInput(city: string): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'city',
        type: 'text',
        name: 'city',
        value: city,
      },
      textLabel: 'City',
    };
    const input: IInput = new InputView(params);

    input.getViewCreator().removeAttribute('id');
    return input;
  }

  private createCountryInput(country: string): ISelect {
    const params: Record<string, string> = {
      name: 'country',
    };
    const select: ISelect = new SelectView(params);
    const element: HTMLElement = select.getSelect().getElement();
    if (element instanceof HTMLSelectElement) {
      const options: HTMLOptionsCollection = element.options;
      const searchOption: HTMLOptionElement | undefined = Array.from(options).find(
        (option: HTMLOptionElement): boolean => option.value === country
      );
      if (searchOption) searchOption.selected = true;
    }

    return select;
  }

  private createStreetInput(street: string): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'street',
        type: 'text',
        name: 'street',
        value: street,
      },
      textLabel: 'Street',
    };
    const input: IInput = new InputView(params);

    input.getViewCreator().removeAttribute('id');
    return input;
  }

  private createPostCodeInput(postCode: string): IInput {
    const params: IInputViewParams = {
      attributes: {
        id: 'postCode',
        type: 'text',
        name: 'postCode',
        value: postCode,
      },
      textLabel: 'Postal code',
    };
    const input: IInput = new InputView(params);

    input.getViewCreator().removeAttribute('id');
    return input;
  }

  private createDeleteAddressBTN(): IElementCreator {
    const params: btnParams = {
      textContent: constants.DELETE_ADDRESS_BTN_TEXT,
      classNames: constants.DELETE_ADDRESS_BTN_CLASSES,
    };
    return new ButtonView(params).getViewCreator();
  }

  private addListeners(): void {
    this.isDefaultShippingInput
      .getCheckbox()
      .setListeners({ event: 'change', callback: (): void => this.logic.defaultShippingLogic(this) });
    this.isDefaultBillingInput
      .getCheckbox()
      .setListeners({ event: 'change', callback: (): void => this.logic.defaultBillingLogic(this) });
  }
}
