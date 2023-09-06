import { CustomProductData } from '@src/spa/logic/catalog/catalogDataManager/types';

export interface CustomBasketProductData extends Omit<CustomProductData, 'description'> {
  productAmount: string;
}

export interface CustomBasketData {
  basketID: string;
  products: CustomBasketProductData[];
  totalPrice: string;
  discountPrice: string | null;
}
