import '@src/spa/view/modal/addressesModal/addressesModal.scss';
import ModalView from '@src/spa/view/modal/modalView';
import { Address } from '@src/spa/logic/profile/profileDataManager/types';
import FormView from '@src/spa/view/form/formView';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import * as constants from '@src/spa/view/modal/addressesModal/constants';
import { btnParams } from '@src/spa/view/button/types';
import ButtonView from '@src/spa/view/button/buttonView';
import AddressModalItemView from './addressModalItem/addressModalItemView';
import { IAddressModalItem } from '@src/spa/view/modal/addressesModal/addressModalItem/types';
import { IAddressesModal } from '@src/spa/view/modal/addressesModal/types';
import IAddressModalLogic from '@src/spa/logic/modalLogic/addressModalLogic/types';
import AddressModalLogic from '@src/spa/logic/modalLogic/addressModalLogic/addressModalLogic';

export default class AddressesModalView extends ModalView implements IAddressesModal {
  private readonly form: IElementCreator;
  private readonly addresses: Map<string, IAddressModalItem> = new Map();
  private readonly logic: IAddressModalLogic = new AddressModalLogic(this);

  public constructor(addresses: Address[]) {
    super();
    this.form = new FormView().getViewCreator();
    this.configure(addresses);
  }

  public getAllAddressesInfo(): Address[] {
    return Array.from(this.addresses.values()).map(
      (addressItemView: IAddressModalItem): Address => addressItemView.getAllValues()
    );
  }

  public getSingleAddressInfo(id: string): Address | null {
    const addressItemView: IAddressModalItem | undefined = this.addresses.get(id);

    if (addressItemView) {
      return addressItemView.getAllValues();
    }
    return null;
  }

  public getAllAddressModalItems(): IAddressModalItem[] {
    return Array.from(this.addresses.values());
  }

  public getSingleAddressModalItem(id: string): IAddressModalItem | null {
    const addressItemView: IAddressModalItem | undefined = this.addresses.get(id);

    if (addressItemView) {
      return addressItemView;
    }
    return null;
  }

  private configure(addresses: Address[]): void {
    const addAddressBTN: IElementCreator = this.createAddAddressBTN();

    this.form.setClasses(constants.ADDRESSES_FORM_CLASS);
    addresses.forEach((address: Address): void => {
      const addressItemView: IAddressModalItem = new AddressModalItemView(address, this.logic);
      this.form.addInnerElement(addressItemView.getView());
      this.addresses.set(address.id, addressItemView);
    });
    this.addForm(this.form);

    this.modalWrapper.addInnerElement(addAddressBTN);
    this.setListeners();
  }

  private createAddAddressBTN(): IElementCreator {
    const params: btnParams = {
      textContent: constants.ADD_ADDRESS_BTN_TEXT,
      classNames: constants.ADD_ADDRESS_BTN_CLASSES,
    };
    const button: IElementCreator = new ButtonView(params).getViewCreator();
    return button;
  }

  private setListeners(): void {
    this.acceptBTN.setListeners({ event: 'click', callback: (): void => this.logic.acceptHandler() });
    this.cancelBTN.setListeners({ event: 'click', callback: (): void => this.logic.exitHandler() });
    this.closeBTN.setListeners({ event: 'click', callback: (): void => this.logic.exitHandler() });
  }
}
