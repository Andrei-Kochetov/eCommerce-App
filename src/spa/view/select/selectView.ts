import '@src/spa/view/select/select.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import IView from '@src/spa/view/types';
import { country } from '@src/spa/view/select/country';

// input wrapper properties
const SELECT_WRAPPER_TAG = 'div';
const SELECT_WRAPPER_CLASS_NAME = 'select-wrapper';

const SELECT_TAG = 'select';
const SELECT_CLASS_NAME = 'select-country';

const OPTION_TAG = 'option';

// span error properties
const SPAN_ERROR_TAG = 'span';
const SPAN_ERROR_CLASS_NAME = 'span-error';

const PARAGRAPH_TAG = 'p';
const ADDRESS_PARAGRAPH_CLASS_NAME = 'label';

export default class SelectView extends View implements IView {
  private readonly spanError: IElementCreator;
  private readonly select: IElementCreator;
  public constructor(selectAttr: Record<string, string>) {
    const params: ElementCreatorParams = {
      tag: SELECT_WRAPPER_TAG,
      classNames: [SELECT_WRAPPER_CLASS_NAME],
    };
    super(params);
    this.select = this.createSelect(selectAttr);
    this.spanError = this.createSpanError();
    this.configureView();
  }
  public getSelect(): IElementCreator {
    return this.select;
  }

  public setTextError(textError: string): void {
    this.spanError.setTextContent(textError);
  }

  private configureView() {
    const countryEntries = Object.entries(country);
    countryEntries.forEach((el) => {
      this.select.addInnerElement(this.createOption(el[0], el[1]));
    });
    this.getViewCreator().addInnerElement(
      this.createParagraph('Country').getElement(),
      this.select.getElement(),
      this.spanError.getElement()
    );
  }
  private createSelect(selectAttr: Record<string, string>): IElementCreator {
    const params: ElementCreatorParams = {
      tag: SELECT_TAG,
      classNames: [SELECT_CLASS_NAME],
      attributes: selectAttr,
    };
    const select: IElementCreator = new ElementCreator(params);
    select.getElement().addEventListener('focus', () => {
      this.setTextError(' ');
    });
    return select;
  }
  private createOption(value: string, textContent: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: OPTION_TAG,
      attributes: {
        value: value,
      },
      textContent: textContent,
    };
    const option: IElementCreator = new ElementCreator(params);
    return option;
  }
  private createSpanError(): IElementCreator {
    const params: ElementCreatorParams = {
      tag: SPAN_ERROR_TAG,
      classNames: [SPAN_ERROR_CLASS_NAME],
    };
    const spanError: IElementCreator = new ElementCreator(params);
    return spanError;
  }
  private createParagraph(textContent: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: PARAGRAPH_TAG,
      classNames: [ADDRESS_PARAGRAPH_CLASS_NAME],
    };
    const paragraph: IElementCreator = new ElementCreator(params);
    paragraph.setTextContent(textContent);
    return paragraph;
  }
}
