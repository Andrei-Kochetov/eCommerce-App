import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import { btnParams } from '@src/spa/view/button/types';

const CONTAINER_TAG = 'div';
const CONTAINER_CLASS_NAME = 'profile-page';

const TITLE_TAG = 'h2';
const TITLE_CLASS_NAME = 'profile-page__title';
const TITLE_CONTENT = 'Profile information';
const SUBTITLE_CONTENT = 'Addresses';
const titleParams: ElementCreatorParams = {
  tag: TITLE_TAG,
  classNames: [TITLE_CLASS_NAME],
  textContent: TITLE_CONTENT,
};
const subTitleParams: ElementCreatorParams = {
  tag: TITLE_TAG,
  classNames: [TITLE_CLASS_NAME],
  textContent: SUBTITLE_CONTENT,
};

const DIV_TAG = 'div';
const TOP_INFO_BLOCK_CLASS_NAME = 'profile-page__top-info-block';
const AUTORIZATION_INFO_BLOCK_CLASS_NAME = 'profile-page__authorization-info-block';
const ADDRESS_CONTAINER_CLASS_NAME = 'profile-page__address-container';
const topInfoBlockParams: ElementCreatorParams = {
  tag: DIV_TAG,
  classNames: [TOP_INFO_BLOCK_CLASS_NAME],
};
const authorizationInfoBlockParams: ElementCreatorParams = {
  tag: DIV_TAG,
  classNames: [AUTORIZATION_INFO_BLOCK_CLASS_NAME],
};
const addressContainerParams: ElementCreatorParams = {
  tag: DIV_TAG,
  classNames: [ADDRESS_CONTAINER_CLASS_NAME],
};

const SECTION_TAG = 'section';
const USER_INFO_SECTION_CONTAINER_CLASS_NAME = 'profile-page__user-info';
const MAIL_SECTION_CONTAINER_CLASS_NAME = 'profile-page__mail';
const PASSWORD_SECTION_CONTAINER_CLASS_NAME = 'profile-page__password';
const BOTTOM_INFO_BLOCK_CLASS_NAME = 'profile-page__bottom-info-block';
const userInfoContainerParams: ElementCreatorParams = {
  tag: SECTION_TAG,
  classNames: [USER_INFO_SECTION_CONTAINER_CLASS_NAME],
};
const mailContainerParams: ElementCreatorParams = {
  tag: SECTION_TAG,
  classNames: [MAIL_SECTION_CONTAINER_CLASS_NAME],
};
const passwordContainerParams: ElementCreatorParams = {
  tag: SECTION_TAG,
  classNames: [PASSWORD_SECTION_CONTAINER_CLASS_NAME],
};
const bottomInfoBlockParams: ElementCreatorParams = {
  tag: SECTION_TAG,
  classNames: [BOTTOM_INFO_BLOCK_CLASS_NAME],
};

const IMG_CONTAINER_TAG = 'div';
const USER_INFO_IMG_CONTAINER_CLASS_NAME = 'profile-page__user-info-img-container';
const MAIL_IMG_CONTAINER_CLASS_NAME = 'profile-page__mail-img-container';
const PASSWORD_IMG_CONTAINER_CLASS_NAME = 'profile-page__password-img-container';
const userInfoImgContainerParams: ElementCreatorParams = {
  tag: IMG_CONTAINER_TAG,
  classNames: [USER_INFO_IMG_CONTAINER_CLASS_NAME],
};
const mailImgContainerParams: ElementCreatorParams = {
  tag: IMG_CONTAINER_TAG,
  classNames: [MAIL_IMG_CONTAINER_CLASS_NAME],
};
const passwordImgContainerParams: ElementCreatorParams = {
  tag: IMG_CONTAINER_TAG,
  classNames: [PASSWORD_IMG_CONTAINER_CLASS_NAME],
};

const USER_INFO_IMG_CLASS_NAME = 'profile-page__user-info-img';
const MAIL_IMG_CLASS_NAME = 'profile-page__mail-img';
const PASSWORD_IMG_CLASS_NAME = 'profile-page__password-img';
const userInfoImgParams: ElementCreatorParams = {
  tag: DIV_TAG,
  classNames: [USER_INFO_IMG_CLASS_NAME],
};
const mailImgParams: ElementCreatorParams = {
  tag: DIV_TAG,
  classNames: [MAIL_IMG_CLASS_NAME],
};
const passwordImgParams: ElementCreatorParams = {
  tag: DIV_TAG,
  classNames: [PASSWORD_IMG_CLASS_NAME],
};

const USER_INFO_CONTENT_CONTAINER_CLASS_NAME = 'profile-page__user-info-content-container';
const MAIL_CONTENT_CONTAINER_CLASS_NAME = 'profile-page__mail-content-container';
const PASSWORD_CONTENT_CONTAINER_CLASS_NAME = 'profile-page__password-content-container';
const userInfoContentContainerParams: ElementCreatorParams = {
  tag: DIV_TAG,
  classNames: [USER_INFO_CONTENT_CONTAINER_CLASS_NAME],
};
const mailContentContainerParams: ElementCreatorParams = {
  tag: DIV_TAG,
  classNames: [MAIL_CONTENT_CONTAINER_CLASS_NAME],
};
const passwordContentContainerParams: ElementCreatorParams = {
  tag: DIV_TAG,
  classNames: [PASSWORD_CONTENT_CONTAINER_CLASS_NAME],
};

const PARAGRAPH_TAG = 'p';
const USER_INFO_TEXT_CLASS_NAME = 'profile-page__text';
const textParagraphParams: ElementCreatorParams = {
  tag: PARAGRAPH_TAG,
  classNames: [USER_INFO_TEXT_CLASS_NAME],
};

const EDIT_BTN_TEXT = 'Edit';
const EDIT_ADDRESSES_BTN_TEXT = 'Edit addresses';
const CHANGE_MAIL_BTN_TEXT = 'Change email';
const CHANGE_PASSWORD_BTN_TEXT = 'Change password';
const EDIT_BTN_CLASS_NAME = 'btn_edit';
const editBtnParams: btnParams = {
  textContent: EDIT_BTN_TEXT,
  classNames: [EDIT_BTN_CLASS_NAME],
};
const editAdressesBtnParams: btnParams = {
  textContent: EDIT_ADDRESSES_BTN_TEXT,
  classNames: [EDIT_BTN_CLASS_NAME],
};
const changeMailBtnParams: btnParams = {
  textContent: CHANGE_MAIL_BTN_TEXT,
  classNames: [EDIT_BTN_CLASS_NAME],
};
const changePasswordParams: btnParams = {
  textContent: CHANGE_PASSWORD_BTN_TEXT,
  classNames: [EDIT_BTN_CLASS_NAME],
};

const LINK_TAG = 'a';
const MAIL_LINK_CLASS_NAME = 'profile-page__mail-link';
const mailLinkParams: ElementCreatorParams = {
  tag: LINK_TAG,
  classNames: [MAIL_LINK_CLASS_NAME],
};

const SHIPPING_TEXT = 'Shipping';
const BILLING_TEXT = 'Billing';
const DEFAULT_SHIPPING_TEXT = 'Default shipping';
const DEFAULT_BILLING_TEXT = 'Default billing';
const ADDRESS_CLASS_NAME = 'profile-page__address';
const DEFAULT_ADDRESS_CLASS_NAME = 'profile-page__default-address';

export {
  CONTAINER_TAG,
  CONTAINER_CLASS_NAME,
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
};
