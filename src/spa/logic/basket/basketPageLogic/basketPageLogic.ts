import { IBasketPage } from '@src/spa/view/pages/basketPage/types';
import { IBasketPageLogic } from '@src/spa/logic/basket/basketPageLogic/types';
import { IBasketItem } from '@src/spa/view/pages/basketPage/basketItem/types';
import BasketManager from '@src/spa/logic/basket/basketManger/basketManger';
import PopUpView from '@src/spa/view/popUp/popUpView';
import { ErrorMessages } from '@src/spa/logic/validator/types';

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

  public async removeProductFromBasket(basketItem: IBasketItem): Promise<void> {
    // logic for removing product from basket in commerce tools
    // if this operation failed show error message and return, else go further
    try {
      await BasketManager.getInstance().removeProductInBasket(basketItem.getData().id);
      const removingResult: boolean = this.page.removeProduct(basketItem);
      if (!removingResult) return;
    } catch (err) {
      PopUpView.getRejectPopUp(ErrorMessages.REMOVE_PRODUCT_BASKET).show();
    }

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
