import { IInputView } from '@src/spa/view/input/types';
import { ErrorMessages } from '@src/spa/logic/validator/types';

export default abstract class Validator {
  protected abstract validate(): boolean;

  protected abstract passwordCheck(input: IInputView): boolean;

  protected abstract emailCheck(input: IInputView): boolean;

  protected emailFieldCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      const regExp = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
      if (!regExp.test(input.value)) {
        inputView.setTextError(ErrorMessages.EMAIL);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  protected minMaxLengthCheck(inputView: IInputView, minLength: number, maxLength: number): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      if (+input.value.length < minLength) {
        inputView.setTextError(`Minimum length ${minLength} characters`);
        return false;
      } else if (+input.value.length > maxLength) {
        inputView.setTextError(`Maximum length ${maxLength} characters`);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  protected weakPasswordCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-#!$@%^&*_+~=:;?/])[-\w#!$@%^&*+~=:;?/]{8,}$/;
      if (!regExp.test(input.value)) {
        inputView.setTextError(ErrorMessages.WEAK_PASSWORD);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  protected emptyFieldCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      if (!input.value) {
        inputView.setTextError(ErrorMessages.EMPTY_FIELD);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  protected spaceStartEndFieldCheck(inputView: IInputView): boolean {
    const input = inputView.getInput().getElement();
    if (input instanceof HTMLInputElement) {
      if (input.value.startsWith(' ')) {
        inputView.setTextError(ErrorMessages.SPASE_START);
        return false;
      } else if (input.value.endsWith(' ')) {
        inputView.setTextError(ErrorMessages.SPACE_END);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
