import { ISwiperView } from '@src/spa/view/swiper/types';
import IView from '@src/spa/view/types';

export interface IProductModal extends IView {
  getSwiper(): ISwiperView;
  showModal(): void;
}
