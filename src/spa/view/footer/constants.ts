import { IImgLinkParams } from '@src/spa/view/img_link/types';

// wrapper properties
const WRAPPER_TAG = 'div';

// paragraph properties
const PARAGRAPH_TAG = 'p';
const FOOTER_YEAR_CLASS_NAME = 'footer__year';
const PARAGRAPH_TEXT_CONTENT = '2023';

// footer properties
const FOOTER_TAG = 'footer';
const FOOTER_CLASS_NAME = 'footer';
const FOOTER_CONTAINER_CLASS_NAME = 'footer__container';

// link GH wrapper properties
const LINK_GH_WRAPPER_CLASS_NAME = 'footer__wrapper-link-gh';

// link properties
const LINK_RS_HREH = 'https://rs.school/js/';
const LINK_GH_L_HREF = 'https://github.com/leanidrymkevich';
const LINK_GH_V_HREF = 'https://github.com/kushalvova';
const LINK_GH_A_HREF = 'https://github.com/andrei-kochetov';

// img properties
const IMG_RS_CLASS_NAME = 'footer-rs-img';
const IMG_GH_CLASS_NAME = 'footer-gh-img';

// const IMG_RS_SRC = './assets/rs_school.svg';
// const IMG_GH1_SRC = './assets/github_1.svg';
// const IMG_GH2_SRC = './assets/github_2.svg';

// imgLink parameters properties
const linkRS: IImgLinkParams = {
  linkAttributes: {
    href: LINK_RS_HREH,
    target: '_blank',
  },
  imgClasses: [IMG_RS_CLASS_NAME],
};

const linkGHL: IImgLinkParams = {
  linkAttributes: {
    href: LINK_GH_L_HREF,
    target: '_blank',
  },
  imgClasses: [IMG_GH_CLASS_NAME],
};

const linkGHV: IImgLinkParams = {
  linkAttributes: {
    href: LINK_GH_V_HREF,
    target: '_blank',
  },
  imgClasses: [IMG_GH_CLASS_NAME],
};

const linkGHA: IImgLinkParams = {
  linkAttributes: {
    href: LINK_GH_A_HREF,
    target: '_blank',
  },
  imgClasses: [IMG_GH_CLASS_NAME],
};

export {
  WRAPPER_TAG,
  PARAGRAPH_TAG,
  FOOTER_YEAR_CLASS_NAME,
  PARAGRAPH_TEXT_CONTENT,
  FOOTER_TAG,
  FOOTER_CLASS_NAME,
  FOOTER_CONTAINER_CLASS_NAME,
  LINK_GH_WRAPPER_CLASS_NAME,
  linkRS,
  linkGHL,
  linkGHV,
  linkGHA,
};
