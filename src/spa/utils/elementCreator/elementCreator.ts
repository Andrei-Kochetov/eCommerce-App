import { ElementCreatorParams, listenerParam, IElementCreator } from '@src/spa/utils/elementCreator/types';

export default class ElementCreator implements IElementCreator {
  private element: HTMLElement;

  public constructor(params: ElementCreatorParams) {
    this.element = document.createElement(params.tag);
    this.createElement(params);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public clearInnerHTML(): void {
    this.element.innerHTML = '';
  }

  public addInnerElement(...elements: (HTMLElement | IElementCreator)[]): void {
    elements.forEach((element: HTMLElement | IElementCreator): void => {
      if (element instanceof ElementCreator) {
        this.element.append(element.getElement());
      } else if (element instanceof HTMLElement) {
        this.element.append(element);
      }
    });
  }

  public setClasses(...classNames: string[]): void {
    classNames.forEach((className) => this.element.classList.add(className));
  }

  public removeClasses(...classNames: string[]): void {
    classNames.forEach((className) => this.element.classList.remove(className));
  }

  public setAttributes(attributes: Record<string, string> | undefined): void {
    if (!attributes) return;
    for (const key in attributes) {
      this.element.setAttribute(key, attributes[key]);
    }
  }

  public removeAttribute(attribute: string): void {
    this.element.removeAttribute(attribute);
  }

  public setTextContent(textContent: string | undefined): void {
    if (!textContent) return;
    this.element.textContent = textContent;
  }

  public getTextContent(): string | null {
    return this.element.textContent;
  }

  public setListeners(...listenersParams: listenerParam[]): void {
    listenersParams.forEach((param: listenerParam) => this.element.addEventListener(param.event, param.callback));
  }

  public removeListeners(...listenersParams: listenerParam[]): void {
    listenersParams.forEach((param: listenerParam) => this.element.removeEventListener(param.event, param.callback));
  }

  private createElement(params: ElementCreatorParams): void {
    if (params.classNames) this.setClasses(...params.classNames);
    if (params.listenersParams) this.setListeners(...params.listenersParams);
    this.setAttributes(params.attributes);
    this.setTextContent(params.textContent);
  }
}
