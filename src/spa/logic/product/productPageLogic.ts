import { IProductPage } from '@src/spa/view/pages/productPage/types';
import ProductModalView from '@src/spa/view/productModal/productModalView';
import { IProductModal } from '@src/spa/view/productModal/types';
import { IProductPageLogic } from '@src/spa/logic/product/types';

export default class ProductPageLogic implements IProductPageLogic {
  private readonly page: IProductPage;

  public constructor(page: IProductPage) {
    this.page = page;
  }

  public imgOnClickHandler(): void {
    const urls: string[] = this.page.getData().imgURLs;
    const modal: IProductModal = new ProductModalView(urls);
    const currentIMG: number = this.page.getSwiper().getSwiper().activeIndex;

    modal.getSwiper().getSwiper().slideTo(currentIMG);
    modal.showModal();
  }
}
