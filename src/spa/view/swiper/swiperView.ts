import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import * as constants from '@src/spa/view/swiper/constants';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { ISwiperView, swiperImgCallback } from '@src/spa/view/swiper/types';

// Import Swiper and modules
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import '@node_modules/swiper/swiper.scss';
import '@node_modules/swiper/modules/navigation.scss';
import '@node_modules/swiper/modules/pagination.scss';

export default class SwiperView implements ISwiperView {
  private readonly layout: IElementCreator;
  private readonly btnPrev: IElementCreator;
  private readonly btnNext: IElementCreator;
  private readonly pagination: IElementCreator;
  private readonly wrapper: IElementCreator;
  private readonly swiperOBJ: Swiper;

  public constructor(imgURLs: string[], imgCallback?: swiperImgCallback) {
    this.btnPrev = SwiperView.createDivElement(constants.SWIPER_PREV_BTN_CLASS);
    this.btnNext = SwiperView.createDivElement(constants.SWIPER_NEXT_BTN_CLASS);
    this.pagination = SwiperView.createDivElement(constants.SWIPER_PAGINATION_CLASS);
    this.wrapper = SwiperView.createDivElement(constants.SWIPER_WRAPPER_CLASS);
    this.layout = this.createSwiperHTML(imgURLs, imgCallback);
    this.swiperOBJ = this.createSwiperOBJ();
  }

  public static createDivElement(className: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.DIV_ELEMENT_TAG,
      classNames: [className],
    };
    return new ElementCreator(params);
  }

  public getSwiper(): Swiper {
    return this.swiperOBJ;
  }

  public getSwiperLayout(): IElementCreator {
    return this.layout;
  }

  public getBTNPrev(): IElementCreator {
    return this.btnPrev;
  }

  public getBTNNext(): IElementCreator {
    return this.btnNext;
  }

  public getPagination(): IElementCreator {
    return this.pagination;
  }

  public getWrapper(): IElementCreator {
    return this.wrapper;
  }

  public hideNavigation(): void {
    this.swiperOBJ.pagination.destroy();
    this.swiperOBJ.navigation.destroy();
  }

  private createSwiperHTML(imgURLs: string[], imgCallback?: swiperImgCallback): IElementCreator {
    const swiper: IElementCreator = SwiperView.createDivElement(constants.SWIPER_CLASS);

    imgURLs.forEach((url: string): void => {
      const slide: IElementCreator = SwiperView.createDivElement(constants.SWIPER_SLIDE_CLASS);
      const img: IElementCreator = this.createImg(url, imgCallback);

      slide.addInnerElement(img);
      this.wrapper.addInnerElement(slide);
    });
    swiper.addInnerElement(this.wrapper, this.pagination, this.btnPrev, this.btnNext);

    return swiper;
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

  private createSwiperOBJ(): Swiper {
    const swiper = new Swiper(this.layout.getElement(), {
      // configure Swiper to use modules
      modules: [Navigation, Pagination],

      // Optional parameters
      direction: 'horizontal',
      loop: true,
      speed: 500,

      // pagination
      pagination: {
        el: this.pagination.getElement(),
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: this.btnNext.getElement(),
        prevEl: this.btnPrev.getElement(),
      },
    });
    return swiper;
  }
}
