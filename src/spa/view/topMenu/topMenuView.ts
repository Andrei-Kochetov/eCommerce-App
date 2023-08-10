import '@src/spa/view/topMenu/topMenu.scss';
import { ITopMenuView } from '@src/spa/view/topMenu/types';
import ContainerView from '@src/spa/view/container/containerView';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import ButtonView from '@src/spa/view/button/buttonView';
import { btnParams } from '@src/spa/view/button/types';

const DEFAULT_USER_NAME = '?';

// topMenu properties
const CONTAINER_CLASS_NAME = 'top-menu';
const USER_BAR_TAG = 'div';
const USER_BAR_CLASS_NAME = 'top-menu__user-bar';
const NOT_ACTIV_CLASS_NAME = 'not-active';

// nav properties
const NAV_TAG = 'nav';
const NAV_CLASS_NAME = 'nav';

// nav BTN properties
const NAV_BTN_CLASS = 'btn_nav';
const CONTACT_US_BTN_TEXT = 'Contact us';
const PICKUP_POINTS_BTN_TEXT = 'Pickup points';
const DELIVERY_BTN_TEXT = 'Delivery';
const PAYMENT_BTN_TEXT = 'Payment';

// BTN properties
const AUTHORIZATION_BTN_CLASS = 'btn_authorization';
const SING_IN_BTN_TEXT = 'Sing in';
const SING_OUT_BTN_TEXT = 'Sing out';
const JOIN_TEXT = 'Join';

export default class TopMenuView extends ContainerView implements ITopMenuView {
  private readonly userBar: IElementCreator;

  constructor() {
    super();
    this.userBar = this.createUserBar();
    this.changeСaption();

    this.configureView();
  }

  private configureView(): void {
    const navParams: ElementCreatorParams = {
      tag: NAV_TAG,
      classNames: [NAV_CLASS_NAME],
    };
    const nav = new ElementCreator(navParams);
    nav.addInnerElement(
      this.createContactUsBTN(),
      this.createPickupPointBTN(),
      this.createDeliverytBTN(),
      this.createPaymentBTN()
    );

    const singInBTN = this.createSingInBTN();
    const singOutBTN = this.createSingOutBTN();
    const joinBTN = this.createJoinBTN();
    singOutBTN.setClasses(NOT_ACTIV_CLASS_NAME);

    this.getViewCreator().setClasses(CONTAINER_CLASS_NAME);
    this.getViewCreator().addInnerElement(nav, singInBTN, singOutBTN, joinBTN, this.userBar);
  }

  private createContactUsBTN(): IElementCreator {
    const params: btnParams = {
      textContent: CONTACT_US_BTN_TEXT,
      classNames: [NAV_BTN_CLASS],
    };

    return new ButtonView(params).getViewCreator();
  }

  private createPickupPointBTN(): IElementCreator {
    const params: btnParams = {
      textContent: PICKUP_POINTS_BTN_TEXT,
      classNames: [NAV_BTN_CLASS],
    };

    return new ButtonView(params).getViewCreator();
  }

  private createDeliverytBTN(): IElementCreator {
    const params: btnParams = {
      textContent: DELIVERY_BTN_TEXT,
      classNames: [NAV_BTN_CLASS],
    };

    return new ButtonView(params).getViewCreator();
  }

  private createPaymentBTN(): IElementCreator {
    const params: btnParams = {
      textContent: PAYMENT_BTN_TEXT,
      classNames: [NAV_BTN_CLASS],
    };

    return new ButtonView(params).getViewCreator();
  }

  private createSingInBTN(): IElementCreator {
    const params: btnParams = {
      textContent: SING_IN_BTN_TEXT,
      classNames: [AUTHORIZATION_BTN_CLASS],
    };

    return new ButtonView(params).getViewCreator();
  }

  private createSingOutBTN(): IElementCreator {
    const params: btnParams = {
      textContent: SING_OUT_BTN_TEXT,
      classNames: [AUTHORIZATION_BTN_CLASS],
    };

    return new ButtonView(params).getViewCreator();
  }

  private createJoinBTN(): IElementCreator {
    const params: btnParams = {
      textContent: JOIN_TEXT,
      classNames: [AUTHORIZATION_BTN_CLASS],
    };

    return new ButtonView(params).getViewCreator();
  }

  private createUserBar(): IElementCreator {
    const userBarParams: ElementCreatorParams = {
      tag: USER_BAR_TAG,
      classNames: [USER_BAR_CLASS_NAME],
    };

    return new ElementCreator(userBarParams);
  }

  public changeСaption(userName = DEFAULT_USER_NAME) {
    this.userBar.setTextContent(userName[0]);
  }
}
