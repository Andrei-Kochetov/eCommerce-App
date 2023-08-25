import '@src/spa/view/modal/addressesModal/addressesModal.scss';
import ModalView from '@src/spa/view/modal/modalView';
import { Address } from '@src/spa/logic/profile/profileDataManager/types';
import FormView from '@src/spa/view/form/formView';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import * as constants from '@src/spa/view/modal/addressesModal/constants';
import { btnParams } from '@src/spa/view/button/types';
import ButtonView from '@src/spa/view/button/buttonView';
import AddressModalItemView from './addressModalItem/addressModalItemView';

export default class AddressesModalView extends ModalView {
  private readonly form: IElementCreator;

  public constructor(addresses: Address[]) {
    super();
    this.form = new FormView().getViewCreator();
    this.configure(addresses);
  }

  private configure(addresses: Address[]): void {
    const addAddressBTN: IElementCreator = this.createAddAddressBTN();

    this.form.setClasses(constants.ADDRESSES_FORM_CLASS);
    addresses.forEach((address: Address): void => {
      this.form.addInnerElement(new AddressModalItemView(address).getView());
    });
    this.addForm(this.form);

    this.modalWrapper.addInnerElement(addAddressBTN);
  }

  private createAddAddressBTN(): IElementCreator {
    const params: btnParams = {
      textContent: constants.ADD_ADDRESS_BTN_TEXT,
      classNames: constants.ADD_ADDRESS_BTN_CLASSES,
    };
    return new ButtonView(params).getViewCreator();
  }
}
