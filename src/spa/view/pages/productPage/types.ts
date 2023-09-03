import { CustomProductData } from '@src/spa/logic/catalog/catalogDataManager/types';
import { ISwiperView } from '@src/spa/view/swiper/types';
import IView from '@src/spa/view/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';

export interface IProductPage extends IView {
  getSwiper(): ISwiperView;
  getData(): CustomProductData;
  getAddToBasketBTN(): IElementCreator;
  getRemoveFromBasketBTN(): IElementCreator;
  disableAddToBasketBTN(): void;
  enableAddToBasketBTN(): void;
  disableRemoveFromBasketBTN(): void;
  enableRemoveFromBasketBTN(): void;
}
