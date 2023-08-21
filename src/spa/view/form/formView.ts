import '@src/spa/view/form/form.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';

// form properties
const FORM_TAG = 'form';
const FORM_CLASS_NAME = 'form';

export default class FormView extends View {
  public constructor() {
    const params: ElementCreatorParams = {
      tag: FORM_TAG,
      classNames: [FORM_CLASS_NAME],
    };
    super(params);
  }
}
