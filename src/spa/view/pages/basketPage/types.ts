import { CustomProductData } from '@src/spa/logic/catalog/catalogDataManager/types';
import IView from 'src/spa/view/types';
import { IBasketItem } from '@src/spa/view/pages/basketPage/basketItem/types';

export interface CustomBasketProductData extends Omit<CustomProductData, 'description' | 'isProductInBasket'> {
  productAmount: string;
}

export interface CustomBasketData {
  basketID: string;
  products: CustomBasketProductData[];
  totalPrice: string;
  discountPrice: string | null;
}

export interface IBasketPage extends IView {
  getData(): CustomBasketData;
  removeProduct(product: IBasketItem): boolean;
  changeTotalAndDiscountedTotalPrices(totalPrice: string, discountedTotal: string | null): void;
  clearBasket(): void;
}
