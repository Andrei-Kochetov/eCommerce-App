import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import '@src/spa/view/pages/profilePage/profilePage.scss';
import View from '@src/spa/view/view';
import { Address, ProfileData, UserParams } from '@src/spa/logic/profile/profileDataManager/types';
import ButtonView from '@src/spa/view/button/buttonView';
import { btnParams } from '@src/spa/view/button/types';
import * as constants from '@src/spa/view/pages/profilePage/constants';
import { IProfilePage } from '@src/spa/view/pages/profilePage/types';
import { IProfilePageLogic } from '@src/spa/logic/profilePageLogic/types';
import ProfilePageLogic from '@src/spa/logic/profilePageLogic/profilePageLogic';

export default class ProfilePageView extends View implements IProfilePage {
  private readonly firstName: IElementCreator;
  private readonly lastName: IElementCreator;
  private readonly dateBirth: IElementCreator;
  private readonly userInfoEditBTN: IElementCreator;
  private readonly passwordEditBTN: IElementCreator;
  private readonly mail: IElementCreator;
  private readonly mailEditBTN: IElementCreator;
  private readonly bottomInfoBlock: IElementCreator;
  private readonly adressesEditBTN: IElementCreator;
  private readonly initialState: ProfileData;
  private readonly logic: IProfilePageLogic = new ProfilePageLogic(this);

  public constructor(data: ProfileData) {
    const params: ElementCreatorParams = {
      tag: constants.CONTAINER_TAG,
      classNames: [constants.CONTAINER_CLASS_NAME],
    };
    super(params);

    this.initialState = data;
    this.firstName = this.createInfoTextParagraph();
    this.lastName = this.createInfoTextParagraph();
    this.dateBirth = this.createInfoTextParagraph();
    this.userInfoEditBTN = this.createInfoEditBTN(constants.editBtnParams);
    this.passwordEditBTN = this.createPasswordEditBTN(constants.changePasswordParams);
    this.mail = this.createMailLink();
    this.mailEditBTN = this.createMailEditBTN(constants.changeMailBtnParams);
    this.adressesEditBTN = this.createAdressesEditBTN(constants.editAdressesBtnParams);
    this.bottomInfoBlock = new ElementCreator(constants.bottomInfoBlockParams);

    this.changeFirstName(data.firstName);
    this.changeLastName(data.lastName);
    this.changeDateBirth(data.dateBirth);
    this.changeMail(data.email);
    this.changeAddresses(data.addresses);

    this.configureView();
  }

  private configureView(): void {
    const title = new ElementCreator(constants.titleParams);
    const topInfoBlock = new ElementCreator(constants.topInfoBlockParams);
    const authorizationInfoBlock = new ElementCreator(constants.authorizationInfoBlockParams);
    const subTitle = new ElementCreator(constants.subTitleParams);

    authorizationInfoBlock.addInnerElement(this.createMailSection(), this.createPasswordSection());
    topInfoBlock.addInnerElement(this.createInfoSection(), authorizationInfoBlock);

    this.getViewCreator().addInnerElement(title, topInfoBlock, subTitle, this.bottomInfoBlock, this.adressesEditBTN);
    this.setListeners();
  }

  public getInitialState(): ProfileData {
    return this.initialState;
  }

  public changeUserInfo(params: UserParams): void {
    this.changeFirstName(params.firstName);
    this.changeLastName(params.lastName);
    this.changeDateBirth(params.dateBirth);
  }

  public changeFirstName(firstName: string): void {
    this.firstName.setTextContent(`First name: ${firstName}`);
    this.initialState.firstName = firstName;
  }

  public changeLastName(lastName: string): void {
    this.lastName.setTextContent(`Last name: ${lastName}`);
    this.initialState.lastName = lastName;
  }

  public changeDateBirth(dateBirth: string): void {
    this.dateBirth.setTextContent(`Date birth: ${dateBirth}`);
    this.initialState.dateBirth = dateBirth;
  }

  public changeAddresses(addresses: Address[]): void {
    const map = new Map();
    this.bottomInfoBlock.clearInnerHTML;

    addresses.forEach((address) => {
      map.set(address.id, this.createAddressField(address));
    });
    for (const addresField of map.values()) {
      this.bottomInfoBlock.addInnerElement(addresField);
    }
    this.initialState.addresses = addresses;
  }

  public changeMail(email: string): void {
    this.mail.setTextContent(`${email}`);
    this.mail.setAttributes({ href: `mailto:${email}` });
    this.initialState.email = email;
  }

  public getInfoEditBTN(): IElementCreator {
    return this.userInfoEditBTN;
  }

  public getPasswordEditBTN(): IElementCreator {
    return this.passwordEditBTN;
  }

  public getMailEditBTN(): IElementCreator {
    return this.mailEditBTN;
  }

  public getAdressesEditBTN(): IElementCreator {
    return this.adressesEditBTN;
  }

  private createInfoSection(): IElementCreator {
    const container = new ElementCreator(constants.userInfoContainerParams);
    const imgContainer = new ElementCreator(constants.userInfoImgContainerParams);
    const img = new ElementCreator(constants.userInfoImgParams);
    const contentContainer = new ElementCreator(constants.userInfoContentContainerParams);

    imgContainer.addInnerElement(img);
    contentContainer.addInnerElement(this.firstName, this.lastName, this.dateBirth, this.userInfoEditBTN);
    container.addInnerElement(imgContainer, contentContainer);

    return container;
  }

  private createInfoTextParagraph(): IElementCreator {
    return new ElementCreator(constants.textParagraphParams);
  }

  private createInfoEditBTN(btnParams: btnParams): IElementCreator {
    const button: IElementCreator = new ButtonView(btnParams).getViewCreator();
    return button;
  }

  private createPasswordEditBTN(btnParams: btnParams): IElementCreator {
    const button: IElementCreator = new ButtonView(btnParams).getViewCreator();
    return button;
  }

  private createMailEditBTN(btnParams: btnParams): IElementCreator {
    const button: IElementCreator = new ButtonView(btnParams).getViewCreator();
    return button;
  }

  private createAdressesEditBTN(btnParams: btnParams): IElementCreator {
    const button: IElementCreator = new ButtonView(btnParams).getViewCreator();
    return button;
  }

  private createPasswordSection(): IElementCreator {
    const container = new ElementCreator(constants.passwordContainerParams);
    const imgContainer = new ElementCreator(constants.passwordImgContainerParams);
    const img = new ElementCreator(constants.passwordImgParams);
    const contentContainer = new ElementCreator(constants.passwordContentContainerParams);

    imgContainer.addInnerElement(img);
    container.addInnerElement(imgContainer, this.passwordEditBTN);

    contentContainer.addInnerElement(this.passwordEditBTN);
    container.addInnerElement(imgContainer, contentContainer);

    return container;
  }

  private createMailSection(): IElementCreator {
    const container = new ElementCreator(constants.mailContainerParams);
    const imgContainer = new ElementCreator(constants.mailImgContainerParams);
    const img = new ElementCreator(constants.mailImgParams);
    const contentContainer = new ElementCreator(constants.mailContentContainerParams);
    imgContainer.addInnerElement(img);
    contentContainer.addInnerElement(this.mail, this.mailEditBTN);
    container.addInnerElement(imgContainer, contentContainer);

    return container;
  }

  private createMailLink(): IElementCreator {
    return new ElementCreator(constants.mailLinkParams);
  }

  private createAddressField(address: Address): IElementCreator {
    const container = new ElementCreator(constants.addressContainerParams);
    const country = this.createInfoTextParagraph();
    const city = this.createInfoTextParagraph();
    const street = this.createInfoTextParagraph();
    const postalCode = this.createInfoTextParagraph();

    if (address.isDefaultShipping === 'true') {
      const defaultShipping = this.createInfoTextParagraph();
      defaultShipping.setTextContent(constants.DEFAULT_SHIPPING_TEXT);
      defaultShipping.setClasses(constants.DEFAULT_ADDRESS_CLASS_NAME);
      container.addInnerElement(defaultShipping);
    }
    if (address.isDefaultBilling === 'true') {
      const defaultBilling = this.createInfoTextParagraph();
      defaultBilling.setTextContent(constants.DEFAULT_BILLING_TEXT);
      defaultBilling.setClasses(constants.DEFAULT_ADDRESS_CLASS_NAME);
      container.addInnerElement(defaultBilling);
    }
    if (address.isShipping === 'true') {
      const shipping = this.createInfoTextParagraph();
      shipping.setTextContent(constants.SHIPPING_TEXT);
      shipping.setClasses(constants.ADDRESS_CLASS_NAME);
      container.addInnerElement(shipping);
    }
    if (address.isBilling === 'true') {
      const billing = this.createInfoTextParagraph();
      billing.setTextContent(constants.BILLING_TEXT);
      billing.setClasses(constants.ADDRESS_CLASS_NAME);
      container.addInnerElement(billing);
    }

    country.setTextContent(`Country: ${address.country}`);
    city.setTextContent(`City: ${address.city}`);
    street.setTextContent(`Street: ${address.street}`);
    postalCode.setTextContent(`Postal code: ${address.postcode}`);
    container.addInnerElement(country, city, street, postalCode);

    return container;
  }

  private setListeners(): void {
    this.userInfoEditBTN.setListeners({ event: 'click', callback: (): void => this.logic.showUserInfoModal() });
    this.passwordEditBTN.setListeners({ event: 'click', callback: (): void => this.logic.showPasswordModal() });
    this.mailEditBTN.setListeners({ event: 'click', callback: (): void => this.logic.showEmailModal() });
    this.adressesEditBTN.setListeners({ event: 'click', callback: (): void => this.logic.showAddressesModal() });
  }
}
