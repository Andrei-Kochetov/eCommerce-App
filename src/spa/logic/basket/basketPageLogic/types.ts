import { IBasketItem } from '@src/spa/view/pages/basketPage/basketItem/types';

export interface IBasketPageLogic {
  reduceProductAmountBTNHandler(basketItem: IBasketItem): void;
  increaseProductAmountBTNHandler(basketItem: IBasketItem): void;
  removeProductFromBasket(basketItem: IBasketItem): void;
  changheProductAmountInputHandler(basketItem: IBasketItem): void;
  clearBasket(applyPromocode: boolean): void;
  setPromoCode(promocodeInput: HTMLInputElement): void;
  deletePromoCode(): void;
}
