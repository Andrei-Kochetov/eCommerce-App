import '@src/spa/view/pages/basketPage/basketPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';
import { CustomBasketData } from '@src/spa/view/pages/basketPage/types';
import * as constants from '@src/spa/view/pages/basketPage/constants';

export default class BasketPageView extends PageView {
  private readonly data: CustomBasketData;

  public constructor(data: CustomBasketData) {
    super(PageNames.CATALOG, constants.BASKET_PAGE_CLASS);
    this.data = data;
  }
}
