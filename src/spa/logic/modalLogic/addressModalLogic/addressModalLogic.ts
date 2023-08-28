import { IAddressModalItem } from '@src/spa/view/modal/addressesModal/addressModalItem/types';
import { IAddressesModal } from '@src/spa/view/modal/addressesModal/types';
import IAddressModalLogic from '@src/spa/logic/modalLogic/addressModalLogic/types';
import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import { ICheckbox } from '@src/spa/view/checkbox/types';
import { Address } from '@src/spa/logic/profile/profileDataManager/types';
import { IProfilePage } from '@src/spa/view/pages/profilePage/types';
import RegistrationValidator from '@src/spa/logic/validator/registrationValidator/registrationValidator';

export default class AddressModalLogic extends ModalLogic<IAddressesModal> implements IAddressModalLogic {
  private readonly page: IProfilePage;

  public constructor(modal: IAddressesModal, page: IProfilePage) {
    super(modal);
    this.page = page;
  }

  public defaultShippingLogic(address: IAddressModalItem): void {
    const checkbox: ICheckbox = address.getIsDefaultShippingInput();

    if (checkbox.getValue() === 'true') {
      this.modal
        .getAllAddressModalItems()
        .filter((item: IAddressModalItem): boolean => item.getID() !== address.getID())
        .forEach((item: IAddressModalItem): void => item.getIsDefaultShippingInput().check(false));
      checkbox.check(true);
    } else {
      checkbox.check(false);
    }
  }

  public defaultBillingLogic(address: IAddressModalItem): void {
    const checkbox: ICheckbox = address.getIsDefaultBillingInput();

    if (checkbox.getValue() === 'true') {
      this.modal
        .getAllAddressModalItems()
        .filter((item: IAddressModalItem): boolean => item.getID() !== address.getID())
        .forEach((item: IAddressModalItem): void => item.getIsDefaultBillingInput().check(false));
      checkbox.check(true);
    } else {
      checkbox.check(false);
    }
  }

  protected validate(): boolean {
    const addresses: IAddressModalItem[] = this.modal.getAllAddressModalItems();
    return addresses
      .map((address: IAddressModalItem): boolean => {
        const arrFunc: boolean[] = [
          RegistrationValidator.billingCountryCheck(address.getCountryInput()),
          RegistrationValidator.billingCityCheck(address.getCityInput()),
          RegistrationValidator.billingAddressCheck(address.getStreetInput()),
          RegistrationValidator.billingPostCodeCheck(address.getPostCodeInput()),
        ];
        return arrFunc.every((el: boolean) => el === true);
      })
      .every((el: boolean) => el === true);
  }

  protected wasChanges(): boolean {
    const initialState: Address[] = this.modal.getInitialState();
    const currentState: Address[] = this.modal.getAllAddressesInfo();

    if (initialState.length !== currentState.length) return true;
    for (let i = 0; i < initialState.length; i++) {
      if (!ModalLogic.ObjTopLevelCompare(currentState[i], initialState[i])) return true;
    }
    return false;
  }

  protected beforeCloseActions(): void {
    this.page.changeAddresses(this.modal.getAllAddressesInfo());
  }
}
