import { IBasketPage } from '@src/spa/view/pages/basketPage/types';
import { IBasketPageLogic } from '@src/spa/logic/basket/basketPageLogic/types';

export class BasketPageLogic implements IBasketPageLogic {
  private page: IBasketPage;

  public constructor(page: IBasketPage) {
    this.page = page;
  }

  public reduceProductAmountBTNHandler(): void {
    console.log(1);
  }
}
