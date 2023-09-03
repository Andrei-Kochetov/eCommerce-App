import '@src/spa/view/productModal/productModal.scss';
import { DIV_ELEMENT_TAG } from '@src/spa/view/swiper/constants';
import * as constants from '@src/spa/view/productModal/constants';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import { btnParams } from '@src/spa/view/button/types';
import ButtonView from '@src/spa/view/button/buttonView';
import { ISwiperView } from '@src/spa/view/swiper/types';
import SwiperView from '@src/spa/view/swiper/swiperView';
import { IProductModal } from '@src/spa/view/productModal/types';
import { LOCK_CLASS } from '@src/spa/view/modal/constants';

export default class ProductModalView extends View implements IProductModal {
  private readonly swiper: ISwiperView;

  public constructor(imgURLs: string[]) {
    const params: ElementCreatorParams = {
      tag: DIV_ELEMENT_TAG,
      classNames: [constants.PRODUCT_MODAL_CLASS],
    };
    super(params);
    this.swiper = new SwiperView(imgURLs);
    this.configureView();
  }

  public getSwiper(): ISwiperView {
    return this.swiper;
  }

  public showModal(): void {
    document.body.classList.add(LOCK_CLASS);
    document.body.append(this.getView());
  }

  private configureView(): void {
    const closeBTN: IElementCreator = this.createCloseBTN();
    const container: IElementCreator = SwiperView.createDivElement(constants.PRODUCT_MODAL_CONTAINER_CLASS);

    this.swiper.getSwiperLayout().setClasses(constants.PRODUCT_MODAL_SWIPER_CLASS);
    container.addInnerElement(closeBTN, this.swiper.getSwiperLayout());
    this.getViewCreator().addInnerElement(container);

    this.getViewCreator().setListeners({
      event: 'click',
      callback: (event: Event): void => {
        if (event.target === this.getView() || event.target === container.getElement()) this.hideModal();
      },
    });
  }

  private createCloseBTN(): IElementCreator {
    const params: btnParams = {
      textContent: 'X',
      classNames: [constants.PRODUCT_MODAL_BTN_CLASS],
    };
    const btn: IElementCreator = new ButtonView(params).getViewCreator();
    btn.setListeners({ event: 'click', callback: this.hideModal.bind(this) });
    return btn;
  }

  private hideModal(): void {
    document.body.classList.remove(LOCK_CLASS);
    this.getView().remove();
  }
}
