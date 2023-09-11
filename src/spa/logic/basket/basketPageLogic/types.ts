import { IBasketItem } from '@src/spa/view/pages/basketPage/basketItem/types';

export interface IBasketPageLogic {
  reduceProductAmountBTNHandler(input: HTMLInputElement): void;
  increaseProductAmountBTNHandler(input: HTMLInputElement): void;
  removeProductFromBasket(basketItem: IBasketItem): void;
  cleatBasket(): void;
}
