import { Address } from '@src/spa/logic/profile/profileDataManager/types';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import '@src/spa/view/addressView/address.scss';
import { IAddressView } from '@src/spa/view/addressView/types';
import View from '@src/spa/view/view';

export default class AddressView extends View implements IAddressView {
  public constructor(params: Address) {
    const wrapperParams: ElementCreatorParams = {
      tag: 'div',
      classNames: ['some-classes'],
    };
    super(wrapperParams);
  }

  // on the base of params: Address you have to create address component

  public updateAddress(address: Address): void {
    // update this view on the base of argument
  }
}
