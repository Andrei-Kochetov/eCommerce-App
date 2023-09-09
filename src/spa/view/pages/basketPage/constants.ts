import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import promoCodeImgSRC from '@src/assets/basket-page/promo-code.png';
import emptyBasketImgSRC from '@src/assets/basket-page/empty-cart.png';

export const BASKET_PAGE_CLASS = 'basket';

export const PAGE_HEADER_CLASS = 'basket__header';

export const PAGE_TITLE_PARAMS: ElementCreatorParams = {
  tag: 'h2',
  classNames: ['basket__title'],
  textContent: 'Basket',
};

// promo code element
export const PROMO_CODE_CLASS = 'promo-code';
export const PROMO_CODE_INPUT_CLASS = 'promo-code__input';
export const PROMO_CODE_INPUT_PLACEHOLDER = 'Promo Code';
export const PROMO_CODE_IMG_PARAMS: ElementCreatorParams = {
  tag: 'img',
  classNames: ['promo-code__img'],
  attributes: {
    src: promoCodeImgSRC,
    alt: 'promo-code__img',
  },
};

export const BASKET_CONTENT_WRAPPER_CLASS = 'basket__content-wrapper';
export const EMPTY_BASKET_CLASS = 'basket__empty-info';
export const EMPTY_BASKET_IMG_PARAMS: ElementCreatorParams = {
  tag: 'img',
  classNames: ['basket__empty-info-img'],
  attributes: {
    src: emptyBasketImgSRC,
    alt: 'basket__empty-info-img',
  },
};
export const EMPTY_BASKET_TITLE_PARAMS: ElementCreatorParams = {
  tag: 'h3',
  classNames: ['basket__empty-info-title'],
  textContent: 'Your basket is empty',
};
export const EMPTY_BASKET_TEXT_1_PARAMS: ElementCreatorParams = {
  tag: 'span',
  textContent: 'Go to the ',
};
export const EMPTY_BASKET_TEXT_2_PARAMS: ElementCreatorParams = {
  tag: 'span',
  textContent: ' and add products',
};
export const EMPTY_BASKET_LINK_PARAMS: ElementCreatorParams = {
  tag: 'a',
  textContent: 'catalog',
  attributes: { href: '/catalog' },
};
export const EMPTY_BASKET_TEXT_WRAPPER_PARAMS: ElementCreatorParams = {
  tag: 'p',
  classNames: ['basket__empty-info-text-wrapper'],
};
