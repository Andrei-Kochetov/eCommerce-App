import '@src/spa/view/pages/basketPage/basketPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';

const BASKET_PAGE_CLASS = 'basket';

export default class BasketPageView extends PageView {
  public constructor() {
    super(PageNames.CATALOG, BASKET_PAGE_CLASS);
    this.getViewCreator().setTextContent('BASKET-PAGE');
  }
}
