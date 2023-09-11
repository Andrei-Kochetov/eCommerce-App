import IView from '@src/spa/view/types';
import { CustomBasketProductData } from '@src/spa/view/pages/basketPage/types';

export interface IBasketItem extends IView {
  getData(): CustomBasketProductData;
}
