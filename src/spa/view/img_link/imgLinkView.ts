import '@src/spa/view/img_link/imgLink.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { IImgLinkParams } from '@src/spa/view/img_link/types';

const IMG_TAG = 'img';
const LINK_TAG = 'a';
const LINK_CLASS_NAME = 'footer-link';

export default class ImgLinkView extends View /* implements IInputView */ {
  private readonly img: IElementCreator;
  public constructor(imgLinkParams: IImgLinkParams) {
    const params: ElementCreatorParams = {
      tag: LINK_TAG,
      classNames: [LINK_CLASS_NAME],
      attributes: imgLinkParams.linkAttributes,
    };
    super(params);
    this.img = this.createLinkImg(imgLinkParams.imgAttributes, imgLinkParams.imgClasses);
    this.configureView();
  }

  private configureView(): void {
    this.getViewCreator().addInnerElement(this.img.getElement());
  }
  private createLinkImg(imgAttributes: Record<string, string>, classes: string[]): IElementCreator {
    const params: ElementCreatorParams = {
      tag: IMG_TAG,
      classNames: classes,
      attributes: imgAttributes,
    };
    const img: IElementCreator = new ElementCreator(params);
    return img;
  }
}
