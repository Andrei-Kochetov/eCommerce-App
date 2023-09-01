import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import * as constants from '@src/spa/view/swiper/constants';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { swiperImgCallback } from '@src/spa/view/swiper/types';

// Import Swiper and modules
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import Swiper and modules styles
import '@node_modules/swiper/swiper.scss';
import '@node_modules/swiper/modules/scrollbar.scss';
import '@node_modules/swiper/modules/navigation.scss';
import '@node_modules/swiper/modules/pagination.scss';

export default class SwiperView {
  private readonly layout: HTMLElement;
  private readonly btnPrev: HTMLElement;
  private readonly btnNext: HTMLElement;
  private readonly pagination: HTMLElement;
  private readonly scroll: HTMLElement;
  private readonly swiperOBJ: Swiper;

  public constructor(imgURLs: string[], imgCallback?: swiperImgCallback) {
    this.btnPrev = this.createDivElement(constants.SWIPER_PREV_BTN_CLASS).getElement();
    this.btnNext = this.createDivElement(constants.SWIPER_NEXT_BTN_CLASS).getElement();
    this.pagination = this.createDivElement(constants.SWIPER_PAGINATION_CLASS).getElement();
    this.scroll = this.createDivElement(constants.SWIPER_SCROLLBAR_CLASS).getElement();
    this.layout = this.createSwiperHTML(imgURLs, imgCallback);
    this.swiperOBJ = this.createSwiperOBJ();
  }

  public getSwiper(): HTMLElement {
    return this.swiperOBJ.el;
  }

  private createSwiperHTML(imgURLs: string[], imgCallback?: swiperImgCallback): HTMLElement {
    const swiper: IElementCreator = this.createDivElement(constants.SWIPER_CLASS);
    const wrapper: IElementCreator = this.createDivElement(constants.SWIPER_WRAPPER_CLASS);

    imgURLs.forEach((url: string): void => {
      const slide: IElementCreator = this.createDivElement(constants.SWIPER_SLIDE_CLASS);
      const img: IElementCreator = this.createImg(url, imgCallback);

      slide.addInnerElement(img);
      wrapper.addInnerElement(slide);
    });
    swiper.addInnerElement(wrapper, this.pagination, this.btnPrev, this.btnNext, this.scroll);

    return swiper.getElement();
  }

  private createImg(url: string, imgCallback?: swiperImgCallback): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.IMG_TAG,
      classNames: [constants.IMG_CLASS],
      attributes: {
        src: url,
        alt: constants.IMG_CLASS,
      },
    };
    const img: IElementCreator = new ElementCreator(params);
    if (imgCallback) {
      img.setListeners({ event: 'click', callback: (): void => imgCallback() });
    }
    return img;
  }

  private createDivElement(className: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.DIV_ELEMENT_TAG,
      classNames: [className],
    };
    return new ElementCreator(params);
  }

  private createSwiperOBJ(): Swiper {
    const swiper = new Swiper(this.layout, {
      // configure Swiper to use modules
      modules: [Navigation, Pagination, Scrollbar],

      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // pagination
      pagination: {
        el: this.pagination,
      },

      // Navigation arrows
      navigation: {
        nextEl: this.btnNext,
        prevEl: this.btnPrev,
      },

      //scrollbar
      scrollbar: {
        el: this.scroll,
      },
    });
    return swiper;
  }
}
