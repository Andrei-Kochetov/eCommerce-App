import InputView from '@src/spa/view/input/inputView';
import { IInputViewParams } from '@src/spa/view/input/types';

const LABEL_TEXT = 'Password';
const PASSWORD_ID = 'password';
const PASSWORD_ATTRIBUTES = {
  type: 'password',
  name: 'password',
};
const PASSWORD_CLASSES = ['password'];

export default class PasswordInputView extends InputView {
  public constructor() {
    const params: IInputViewParams = {
      attributes: {
        id: PASSWORD_ID,
        ...PASSWORD_ATTRIBUTES,
      },
      textLabel: LABEL_TEXT,
      classes: PASSWORD_CLASSES,
    };
    super(params);
  }
}
