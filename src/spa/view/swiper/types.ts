import Swiper from 'swiper';

export type swiperImgCallback = () => void;

export interface ISwiperView {
  getSwiper(): Swiper;
  hideNavigation(): void;
}
