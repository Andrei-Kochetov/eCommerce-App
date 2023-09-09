import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import IMG_REJECT_SRC from '@src/assets/popUp/reject-mark.png';
import IMG_APPROVE_SRC from '@src/assets/popUp/approve-mark.png';

function createImg(imgSrc: string): IElementCreator {
  const params: ElementCreatorParams = {
    tag: IMG_TAG,
    classNames: [IMG_APPROVE_CLASS_NAME],
    attributes: {
      alt: IMG_APPROVE_CLASS_NAME,
      src: imgSrc,
    },
  };
  const img: IElementCreator = new ElementCreator(params);
  return img;
}

const POP_UP_TAG = 'div';
const POP_UP_CLASS_NAME = 'pop-up';
const POP_UP_HIDDEN_CLASS_NAME = 'pop-up_hidden';
const POP_UP_REJECT_CLASS_NAME = 'pop-up_reject';

const IMG_TAG = 'img';
const IMG_APPROVE_CLASS_NAME = 'pop-up__img';

const TEXT_TAG = 'span';
const TEXT_CLASS = 'pop-up__text';

const BUTTON_TAG = 'button';
const BUTTON_CLASS = 'pop-up__button';

const SHOWING_TIME = 10000; //ms
const HIDE_ANIMATION_DURATION = 480; //ms

const rejectImg = createImg(IMG_REJECT_SRC);
const approveImg = createImg(IMG_APPROVE_SRC);

export {
  POP_UP_TAG,
  POP_UP_CLASS_NAME,
  POP_UP_HIDDEN_CLASS_NAME,
  POP_UP_REJECT_CLASS_NAME,
  TEXT_TAG,
  TEXT_CLASS,
  BUTTON_TAG,
  BUTTON_CLASS,
  SHOWING_TIME,
  HIDE_ANIMATION_DURATION,
  approveImg,
  rejectImg,
};
