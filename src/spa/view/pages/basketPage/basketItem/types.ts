import IView from '@src/spa/view/types';
import { CustomBasketProductData } from '@src/spa/view/pages/basketPage/types';

export interface IBasketItem extends IView {
  getData(): CustomBasketProductData;
  getAmountInput(): HTMLInputElement;
  getProductId(): string;
  changeProductPriceAndDiscountedPrice(price: string, discountedPrice: string | null): void;
}
