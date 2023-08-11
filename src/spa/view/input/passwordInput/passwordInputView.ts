import '@src/spa/view/input/passwordInput/passwordInput.scss';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import InputView from '@src/spa/view/input/inputView';
import { IInputViewParams } from '@src/spa/view/input/types';
import * as constants from '@src/spa/view/input/passwordInput/constants';

export default class PasswordInputView extends InputView {
  private readonly passwordRevealer: IElementCreator;

  public constructor() {
    const params: IInputViewParams = {
      attributes: {
        id: constants.PASSWORD_ID,
        ...constants.PASSWORD_ATTRIBUTES,
      },
      textLabel: constants.LABEL_TEXT,
      classes: constants.PASSWORD_CLASSES,
    };
    super(params);
    this.passwordRevealer = this.getPasswordRevealer();
    this.configureInput();
  }

  private configureInput(): void {
    const wrapperParams: ElementCreatorParams = {
      tag: constants.PASSWORD_WRAPPER_TAG,
      classNames: constants.PASSWORD_WRAPPER_CLASSES,
    };
    const wrapper: IElementCreator = new ElementCreator(wrapperParams);
    this.getInput().setClasses(constants.INPUT_CLASS);

    wrapper.addInnerElement(this.getInput(), this.passwordRevealer);
    this.getViewCreator().addInnerElement(wrapper);
  }

  private getPasswordRevealer(): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.REVEALER_TAG,
      classNames: constants.REVEALER_CLASSES,
      listenersParams: [
        {
          event: 'click',
          callback: this.revealerHandler.bind(this),
        },
      ],
    };

    return new ElementCreator(params);
  }

  private revealerHandler(): void {
    const input: HTMLElement = this.getInput().getElement();
    const revealer: HTMLElement = this.passwordRevealer.getElement();
    if (!(input instanceof HTMLInputElement)) return;

    if (revealer.classList.contains(constants.REVELER_CLOSED_CLASS)) {
      input.type = 'text';
      revealer.classList.remove(constants.REVELER_CLOSED_CLASS);
      revealer.classList.add(constants.REVELER_OPENED_CLASS);
    } else {
      input.type = 'password';
      revealer.classList.remove(constants.REVELER_OPENED_CLASS);
      revealer.classList.add(constants.REVELER_CLOSED_CLASS);
    }
  }
}
