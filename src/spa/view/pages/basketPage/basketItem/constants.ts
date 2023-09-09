import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import { btnParams } from '@src/spa/view/button/types';

export const BASKET_ITEM_PARAMS: ElementCreatorParams = {
  tag: 'div',
  classNames: ['basket__item'],
};

export const BASKET_PRODUCT_CLASS = 'basket-product';

export const ITEM_IMG_PARAMS: ElementCreatorParams = {
  tag: 'img',
  classNames: ['basket-product__img'],
  attributes: {
    alt: 'basket-product__img',
  },
};

export const AMOUNT_WRAPPER_CLASS = 'basket-product__amount-wrapper';

export const INPUT_CLASS = 'basket-product__input';

export const INCREASE_AMOUNT_BTN_PARAMS: btnParams = {
  textContent: '+',
  classNames: ['basket-product__btn'],
};

export const REDUCE_AMOUNT_BTN_PARAMS: btnParams = {
  textContent: '-',
  classNames: ['basket-product__btn'],
};

export const REMOVE_ITEM_BTN_PARAMS: btnParams = {
  textContent: '',
  classNames: ['basket-product__btn_remove'],
};
