import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import '@src/spa/view/pages/profilePage/profilePage.scss';
import View from '@src/spa/view/view';
import { Address, ProfileData } from '@src/spa/logic/profile/profileDataManager/types';
import ButtonView from '@src/spa/view/button/buttonView';
import { btnParams } from '@src/spa/view/button/types';
import {
  CONTAINER_CLASS_NAME,
  CONTAINER_TAG,
  titleParams,
  topInfoBlockParams,
  bottomInfoBlockParams,
  authorizationInfoBlockParams,
  userInfoContainerParams,
  userInfoImgContainerParams,
  userInfoImgParams,
  userInfoContentContainerParams,
  textParagraphParams,
  editBtnParams,
  editAdressesBtnParams,
  changeMailBtnParams,
  changePasswordParams,
  passwordContainerParams,
  passwordImgContainerParams,
  passwordImgParams,
  passwordContentContainerParams,
  mailContainerParams,
  mailImgContainerParams,
  mailImgParams,
  mailContentContainerParams,
  mailLinkParams,
  subTitleParams,
  addressContainerParams,
  SHIPPING_TEXT,
  BILLING_TEXT,
  DEFAULT_SHIPPING_TEXT,
  DEFAULT_BILLING_TEXT,
  ADDRESS_CLASS_NAME,
  DEFAULT_ADDRESS_CLASS_NAME,
} from '@src/spa/view/pages/profilePage/constants';

export default class ProfilePageView extends View {
  private readonly firstName: IElementCreator;
  private readonly lastName: IElementCreator;
  private readonly dateBirth: IElementCreator;
  private readonly userInfoEditBTN: IElementCreator;
  private readonly passwordEditBTN: IElementCreator;
  private readonly mail: IElementCreator;
  private readonly mailEditBTN: IElementCreator;
  private readonly bottomInfoBlock: IElementCreator;
  private readonly adressesEditBTN: IElementCreator;

  constructor(data: ProfileData) {
    const params: ElementCreatorParams = {
      tag: CONTAINER_TAG,
      classNames: [CONTAINER_CLASS_NAME],
    };
    super(params);

    this.firstName = this.createInfoTextParagraph();
    this.lastName = this.createInfoTextParagraph();
    this.dateBirth = this.createInfoTextParagraph();
    this.userInfoEditBTN = this.createInfoEditBTN(editBtnParams);
    this.passwordEditBTN = this.createPasswordEditBTN(changePasswordParams);
    this.mail = this.createMailLink();
    this.mailEditBTN = this.createMailEditBTN(changeMailBtnParams);
    this.adressesEditBTN = this.createAdressesEditBTN(editAdressesBtnParams);
    this.bottomInfoBlock = new ElementCreator(bottomInfoBlockParams);

    this.changeFirstName(data.firstName);
    this.changeLastName(data.lastName);
    this.changeDateBirth(data.dateBirth);
    this.changeMail(data.email);
    this.changeAddresses(data.addresses);

    this.configureView();
  }

  private configureView(): void {
    const title = new ElementCreator(titleParams);
    const topInfoBlock = new ElementCreator(topInfoBlockParams);
    const authorizationInfoBlock = new ElementCreator(authorizationInfoBlockParams);
    const subTitle = new ElementCreator(subTitleParams);

    authorizationInfoBlock.addInnerElement(this.createMailSection(), this.createPasswordSection());
    topInfoBlock.addInnerElement(this.createInfoSection(), authorizationInfoBlock);

    this.getViewCreator().addInnerElement(title, topInfoBlock, subTitle, this.bottomInfoBlock, this.adressesEditBTN);
  }

  public changeFirstName(firstName: string): void {
    this.firstName.setTextContent(`First name: ${firstName}`);
  }

  public changeLastName(lastName: string): void {
    this.lastName.setTextContent(`Last name: ${lastName}`);
  }

  public changeDateBirth(dateBirth: string): void {
    this.dateBirth.setTextContent(`Date birth: ${dateBirth}`);
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
  }

  public changeMail(email: string): void {
    this.mail.setTextContent(`${email}`);
    this.mail.setAttributes({ href: `mailto:${email}` });
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
    const container = new ElementCreator(userInfoContainerParams);
    const imgContainer = new ElementCreator(userInfoImgContainerParams);
    const img = new ElementCreator(userInfoImgParams);
    const contentContainer = new ElementCreator(userInfoContentContainerParams);

    imgContainer.addInnerElement(img);
    contentContainer.addInnerElement(this.firstName, this.lastName, this.dateBirth, this.userInfoEditBTN);
    container.addInnerElement(imgContainer, contentContainer);

    return container;
  }

  private createInfoTextParagraph(): IElementCreator {
    return new ElementCreator(textParagraphParams);
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
    const container = new ElementCreator(passwordContainerParams);
    const imgContainer = new ElementCreator(passwordImgContainerParams);
    const img = new ElementCreator(passwordImgParams);
    const contentContainer = new ElementCreator(passwordContentContainerParams);

    imgContainer.addInnerElement(img);
    container.addInnerElement(imgContainer, this.passwordEditBTN);

    contentContainer.addInnerElement(this.passwordEditBTN);
    container.addInnerElement(imgContainer, contentContainer);

    return container;
  }

  private createMailSection(): IElementCreator {
    const container = new ElementCreator(mailContainerParams);
    const imgContainer = new ElementCreator(mailImgContainerParams);
    const img = new ElementCreator(mailImgParams);
    const contentContainer = new ElementCreator(mailContentContainerParams);
    imgContainer.addInnerElement(img);
    contentContainer.addInnerElement(this.mail, this.mailEditBTN);
    container.addInnerElement(imgContainer, contentContainer);

    return container;
  }

  private createMailLink(): IElementCreator {
    return new ElementCreator(mailLinkParams);
  }

  private createAddressField(address: Address): IElementCreator {
    const container = new ElementCreator(addressContainerParams);
    const country = this.createInfoTextParagraph();
    const city = this.createInfoTextParagraph();
    const street = this.createInfoTextParagraph();
    const postalCode = this.createInfoTextParagraph();

    if (address.isDefaultShipping === 'true') {
      const defaultShipping = this.createInfoTextParagraph();
      defaultShipping.setTextContent(DEFAULT_SHIPPING_TEXT);
      defaultShipping.setClasses(DEFAULT_ADDRESS_CLASS_NAME);
      container.addInnerElement(defaultShipping);
    }
    if (address.isDefaultBilling === 'true') {
      const defaultBilling = this.createInfoTextParagraph();
      defaultBilling.setTextContent(DEFAULT_BILLING_TEXT);
      defaultBilling.setClasses(DEFAULT_ADDRESS_CLASS_NAME);
      container.addInnerElement(defaultBilling);
    }
    if (address.isShipping === 'true') {
      const shipping = this.createInfoTextParagraph();
      shipping.setTextContent(SHIPPING_TEXT);
      shipping.setClasses(ADDRESS_CLASS_NAME);
      container.addInnerElement(shipping);
    }
    if (address.isBilling === 'true') {
      const billing = this.createInfoTextParagraph();
      billing.setTextContent(BILLING_TEXT);
      billing.setClasses(ADDRESS_CLASS_NAME);
      container.addInnerElement(billing);
    }

    country.setTextContent(`Country: ${address.country}`);
    city.setTextContent(`City: ${address.city}`);
    street.setTextContent(`Street: ${address.street}`);
    postalCode.setTextContent(`Postal code: ${address.postcode}`);
    container.addInnerElement(country, city, street, postalCode);

    return container;
  }
}
