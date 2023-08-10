import '@src/spa/view/input/input.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { IInputView, IInputViewParams } from '@src/spa/view/input/types';

// input wrapper properties
const INPUT_WRAPPER_TAG = 'div';
const INPUT_WRAPPER_CLASS_NAME = 'input-wrapper';

// input properties
const INPUT_TAG = 'input';
const INPUT_CLASS_NAME = 'input';

// label properties
const LABEL_TAG = 'label';
const LABEL_CLASS_NAME = 'label';

// span error properties
const SPAN_ERROR_TAG = 'span';
const SPAN_ERROR_CLASS_NAME = 'span-error';

export default class InputView extends View implements IInputView {
  private readonly label: IElementCreator;
  private readonly input: IElementCreator;
  private readonly spanError: IElementCreator;
  public constructor(inputParams: IInputViewParams) {
    const params: ElementCreatorParams = {
      tag: INPUT_WRAPPER_TAG,
      classNames: [INPUT_WRAPPER_CLASS_NAME],
    };
    super(params);
    this.label = this.createLabel(inputParams.textLabel, inputParams.attributes.id);
    this.input = this.createInput(inputParams.attributes, inputParams.classes);
    this.spanError = this.createSpanError();
    this.configureView();
  }

  public getLabel(): IElementCreator {
    return this.label;
  }

  public getInput(): IElementCreator {
    return this.input;
  }

  public getSpanError(): IElementCreator {
    return this.spanError;
  }

  public setTextError(textError: string): void {
    this.spanError.setTextContent(textError);
  }

  private configureView(): void {
    this.getViewCreator().addInnerElement(
      this.label.getElement(),
      this.input.getElement(),
      this.spanError.getElement()
    );
  }

  private createInput(inputAttributes: Record<string, string>, classes?: string[]): IElementCreator {
    const params: ElementCreatorParams = {
      tag: INPUT_TAG,
      classNames: classes ? [INPUT_CLASS_NAME, ...classes] : [INPUT_CLASS_NAME],
      attributes: inputAttributes,
    };
    const input: IElementCreator = new ElementCreator(params);
    return input;
  }
  private createLabel(textLabel: string, forAttribute: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: LABEL_TAG,
      classNames: [LABEL_CLASS_NAME],
      textContent: textLabel,
      attributes: {
        for: forAttribute,
      },
    };
    const label: IElementCreator = new ElementCreator(params);
    return label;
  }
  private createSpanError(): IElementCreator {
    const params: ElementCreatorParams = {
      tag: SPAN_ERROR_TAG,
      classNames: [SPAN_ERROR_CLASS_NAME],
    };
    const spanError: IElementCreator = new ElementCreator(params);
    return spanError;
  }
}
