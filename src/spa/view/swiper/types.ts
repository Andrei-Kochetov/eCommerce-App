import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import Swiper from 'swiper';

export type swiperImgCallback = () => void;

export interface ISwiperView {
  getSwiper(): Swiper;
  hideNavigation(): void;
  getSwiperLayout(): IElementCreator;
  getBTNPrev(): IElementCreator;
  getBTNNext(): IElementCreator;
  getPagination(): IElementCreator;
  getWrapper(): IElementCreator;
}
