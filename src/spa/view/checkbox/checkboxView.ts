import '@src/spa/view/checkbox/checkbox.scss';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import { ICheckbox } from '@src/spa/view/checkbox/types';

const CHECKBOX_CONTAINER_TAG = 'div';
const CHECKBOX_CONTAINER_CLASS = 'checkbox-container';

const CHECKBOX_CLASS = 'checkbox';
const SPAN_CLASS = 'checkbox-name';

export default class CheckboxView extends View implements ICheckbox {
  private readonly checkbox: IElementCreator;
  private readonly span: IElementCreator;

  public constructor(checkboxName: string, isChecked: 'true' | 'false') {
    const params: ElementCreatorParams = {
      tag: CHECKBOX_CONTAINER_TAG,
      classNames: [CHECKBOX_CONTAINER_CLASS],
    };
    super(params);
    this.checkbox = this.createCheckbox(checkboxName, isChecked);
    this.span = this.createSpan(checkboxName);
    this.configureView();
  }

  public getCheckbox(): IElementCreator {
    return this.checkbox;
  }

  public getSpan(): IElementCreator {
    return this.span;
  }

  public getValue(): 'true' | 'false' {
    const checkbox: HTMLElement = this.checkbox.getElement();
    if (checkbox instanceof HTMLInputElement) {
      return `${checkbox.checked}`;
    } else {
      throw new Error('Input is not HTMLInputElement!');
    }
  }

  public check(toBeChecked: boolean): void {
    if (toBeChecked) {
      this.checkbox.setAttributes({ checked: '' });
    } else {
      this.checkbox.removeAttribute('checked');
    }
  }

  private configureView(): void {
    this.getViewCreator().addInnerElement(this.checkbox, this.span);
  }

  private createSpan(checkboxName: string): IElementCreator {
    const spanParams: ElementCreatorParams = {
      tag: 'span',
      classNames: [SPAN_CLASS],
      textContent: checkboxName,
    };
    return new ElementCreator(spanParams);
  }

  private createCheckbox(checkboxName: string, isChecked: 'true' | 'false'): IElementCreator {
    const checkboxParams: ElementCreatorParams = {
      tag: 'input',
      classNames: [CHECKBOX_CLASS],
      attributes: {
        type: 'checkbox',
        name: checkboxName,
      },
    };
    const checkbox: IElementCreator = new ElementCreator(checkboxParams);
    if (isChecked === 'true') {
      checkbox.setAttributes({ checked: '' });
    }
    return checkbox;
  }
}
