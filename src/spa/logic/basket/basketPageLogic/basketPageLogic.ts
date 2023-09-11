import { IBasketPage } from '@src/spa/view/pages/basketPage/types';
import { IBasketPageLogic } from '@src/spa/logic/basket/basketPageLogic/types';
import { IBasketItem } from '@src/spa/view/pages/basketPage/basketItem/types';

export class BasketPageLogic implements IBasketPageLogic {
  private page: IBasketPage;

  public constructor(page: IBasketPage) {
    this.page = page;
  }

  public reduceProductAmountBTNHandler(input: HTMLInputElement): void {
    const value: number = +input.value;

    if (value === 1) return;

    // logic for reducing amount of concrete product in commerce tools basket
    // if this operation failed show error message and return, else go further

    input.value = `${value - 1}`;

    // logic for updating prices and total
  }

  public increaseProductAmountBTNHandler(input: HTMLInputElement): void {
    const value: number = +input.value;

    // logic for increasing amount of concrete product in commerce tools basket
    // if this operation failed show error message and return, else go further

    input.value = `${value + 1}`;

    // logic for updating prices and total
  }

  public removeProductFromBasket(basketItem: IBasketItem): void {
    // logic for removing product from basket in commerce tools
    // if this operation failed show error message and return, else go further

    const removingResult: boolean = this.page.removeProduct(basketItem);
    if (!removingResult) return;

    // logic for updating prices and total
  }

  public cleatBasket(): void {
    // logic to clear basket in commerce tools
    // if this operation failed show error message and return, else go further

    this.page.clearBasket();
  }

  // after understanding how to changing product amount, it deleting, it is necessary
  // to set logic for updating prices and total according to commerce tools response

  // and here will be placed logic for promo code handling
}
