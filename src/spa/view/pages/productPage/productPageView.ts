import '@src/spa/view/pages/productPage/productPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';
import { CustomProductData } from '@src/spa/logic/catalog/catalogDataManager/types';
import SwiperView from '@src/spa/view/swiper/swiperView';

const PRODUCT_PAGE_CLASS = 'product';

export default class ProductPageView extends PageView {
  private readonly data: CustomProductData;

  public constructor(data: CustomProductData) {
    super(PageNames.PRODUCT, PRODUCT_PAGE_CLASS);
    this.data = data;
    this.configureView(data);
  }

  private configureView(data: CustomProductData): void {
    const swiper: HTMLElement = new SwiperView(data.imgURLs).getSwiper();
    swiper.classList.add('product__swiper_small');
    this.getViewCreator().addInnerElement(swiper);
  }
}
