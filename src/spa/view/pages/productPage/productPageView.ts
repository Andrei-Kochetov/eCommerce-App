import '@src/spa/view/pages/productPage/productPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';
import { CustomProductData } from '@src/spa/logic/catalog/catalogDataManager/types';
import SwiperView from '@src/spa/view/swiper/swiperView';
import { ISwiperView } from '@src/spa/view/swiper/types';

const PRODUCT_PAGE_CLASS = 'product';

export default class ProductPageView extends PageView {
  private readonly data: CustomProductData;
  private readonly swiper: ISwiperView;

  public constructor(data: CustomProductData) {
    super(PageNames.PRODUCT, PRODUCT_PAGE_CLASS);
    this.data = data;
    this.swiper = new SwiperView(data.imgURLs);
    this.configureView(data);
  }

  private configureView(data: CustomProductData): void {
    const swiperHTML: HTMLElement = this.swiper.getSwiper().el;
    swiperHTML.classList.add('product__swiper_small');
    if (data.imgURLs.length < 2) this.swiper.hideNavigation();
    this.getViewCreator().addInnerElement(swiperHTML);
  }
}
