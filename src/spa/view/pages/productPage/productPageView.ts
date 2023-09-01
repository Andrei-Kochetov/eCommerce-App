import '@src/spa/view/pages/productPage/productPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';

const PRODUCT_PAGE_CLASS = 'product';

export default class ProductPageView extends PageView {
  public constructor() {
    super(PageNames.PRODUCT, PRODUCT_PAGE_CLASS);
  }
}
