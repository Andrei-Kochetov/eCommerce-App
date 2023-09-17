import { IAddressModalItem } from '@src/spa/view/modal/addressesModal/addressModalItem/types';
import { IAddressesModal } from '@src/spa/view/modal/addressesModal/types';
import IAddressModalLogic, {
  EMPTY_ADDRESS,
  NEW_ADDRESSES_ID_FLAG,
  SUCCESS_ADD_ADDRESS_TEXT,
  SUCCESS_DELETION_TEXT,
} from '@src/spa/logic/modalLogic/addressModalLogic/types';
import ModalLogic from '@src/spa/logic/modalLogic/modalLogic';
import { ICheckbox } from '@src/spa/view/checkbox/types';
import { CustomAddress } from '@src/spa/logic/profile/profileDataManager/types';
import { IProfilePage } from '@src/spa/view/pages/profilePage/types';
import RegistrationValidator from '@src/spa/logic/validator/registrationValidator/registrationValidator';
import AddressModalItemView from '@src/spa/view/modal/addressesModal/addressModalItem/addressModalItemView';
import ProfileDataManager from '@src/spa/logic/profile/profileDataManager/profileDataManager';
import { UNKNOWN_REQUEST_ERROR } from '@src/spa/logic/modalLogic/types';
import PopUpView from '@src/spa/view/popUp/popUpView';

export default class AddressModalLogic extends ModalLogic<IAddressesModal> implements IAddressModalLogic {
  private readonly page: IProfilePage;

  private counter = 0;

  public constructor(modal: IAddressesModal, page: IProfilePage) {
    super(modal);
    this.page = page;
  }

  public createNewAddress(): void {
    const data: CustomAddress = this.getNewAddressInitialData();
    const address: IAddressModalItem = new AddressModalItemView(data, this);
    this.modal.addNewAddress(address);
  }

  public async removeAddress(address: IAddressModalItem): Promise<void> {
    const id: string = address.getID();
    try {
      await ProfileDataManager.getInstance().deleteAddress(id);
    } catch (err) {
      PopUpView.getRejectPopUp(UNKNOWN_REQUEST_ERROR).show();
      return;
    }
    PopUpView.getApprovePopUp(SUCCESS_DELETION_TEXT).show();
    this.modal.removeAddress(address);
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
    const initialState: CustomAddress[] = this.modal.getInitialState();
    const currentState: CustomAddress[] = this.modal.getAllAddressesInfo();

    if (initialState.length !== currentState.length) return true;
    for (let i = 0; i < initialState.length; i++) {
      if (!ModalLogic.ObjTopLevelCompare(currentState[i], initialState[i])) return true;
    }
    return false;
  }

  protected async beforeCloseActions(): Promise<boolean> {
    const currentState: CustomAddress[] = this.modal.getAllAddressesInfo();

    try {
      for (const address of currentState) {
        if (address.id.includes(NEW_ADDRESSES_ID_FLAG)) {
          const id: string = await ProfileDataManager.getInstance().addNewAddress(address);
          const addressItem: IAddressModalItem | null = this.modal.getSingleAddressModalItem(address.id);
          if (addressItem) {
            addressItem.setID(id);
          }
        } else {
          await ProfileDataManager.getInstance().updateAddress(address);
        }
      }
      PopUpView.getApprovePopUp(SUCCESS_ADD_ADDRESS_TEXT).show();
      this.page.changeAddresses(this.modal.getAllAddressesInfo());
      return true;
    } catch (err) {
      PopUpView.getRejectPopUp(UNKNOWN_REQUEST_ERROR).show();
      return true;
    }
  }

  private getNewAddressInitialData(): CustomAddress {
    this.counter++;
    return { id: `${NEW_ADDRESSES_ID_FLAG}${this.counter}`, ...EMPTY_ADDRESS };
  }
}
