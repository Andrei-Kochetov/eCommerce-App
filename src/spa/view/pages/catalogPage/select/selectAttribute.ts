import '@src/spa/view/select/select.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { ISelectView } from '@src/spa/view/select/types';
import { ISelectAttributesParams } from '@src/spa/view/pages/catalogPage/select/types';

// select properties
const SELECT_TAG = 'select';

// option properties
const OPTION_TAG = 'option';

export default class SelectAttributeView extends View /* implements ISelectView  */ {
  public constructor(paramsSelect: ISelectAttributesParams) {
    const params: ElementCreatorParams = {
      tag: SELECT_TAG,
      classNames: paramsSelect.classNames,
      attributes: paramsSelect.attributes,
    };
    super(params);
    this.configureView(paramsSelect.optionNames);
  }

  private configureView(optionNames: string[]) {
    optionNames.forEach((el) => {
      this.getView().append(this.createOption(el).getElement());
    });
  }
  private createOption(optionName: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: OPTION_TAG,
      attributes: {
        value: optionName,
      },
      textContent: optionName,
    };
    const option: IElementCreator = new ElementCreator(params);
    return option;
  }
}
