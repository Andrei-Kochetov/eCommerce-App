import '@src/spa/view/footer/footer.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import IView from '@src/spa/view/types';
import ContainerView from '@src/spa/view/container/containerView';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import ImgLinkView from '../img_link/imgLinkView';
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

const IMG_RS_SRC = './assets/rs_school.svg';
const IMG_GH1_SRC = './assets/github_1.svg';
const IMG_GH2_SRC = './assets/github_2.svg';

// imgLink parameters properties
const linkRS: IImgLinkParams = {
  imgAttributes: {
    src: IMG_RS_SRC,
  },
  linkAttributes: {
    href: LINK_RS_HREH,
  },
  imgClasses: [IMG_RS_CLASS_NAME],
};

const linkGHL: IImgLinkParams = {
  imgAttributes: {
    src: IMG_GH1_SRC,
  },
  linkAttributes: {
    href: LINK_GH_L_HREF,
  },
  imgClasses: [IMG_GH_CLASS_NAME],
};

const linkGHV: IImgLinkParams = {
  imgAttributes: {
    src: IMG_GH2_SRC,
  },
  linkAttributes: {
    href: LINK_GH_V_HREF,
  },
  imgClasses: [IMG_GH_CLASS_NAME],
};

const linkGHA: IImgLinkParams = {
  imgAttributes: {
    src: IMG_GH1_SRC,
  },
  linkAttributes: {
    href: LINK_GH_A_HREF,
  },
  imgClasses: [IMG_GH_CLASS_NAME],
};

export default class FooterView extends View implements IView {
  protected readonly container: IView;
  private readonly wrapperLinkGH: IElementCreator;
  public constructor() {
    const params: ElementCreatorParams = {
      tag: FOOTER_TAG,
      classNames: [FOOTER_CLASS_NAME],
    };
    super(params);
    this.container = new ContainerView();
    this.wrapperLinkGH = this.createWrapper(LINK_GH_WRAPPER_CLASS_NAME);
    this.configureView();
  }

  private configureView(): void {
    this.container.getViewCreator().setClasses(FOOTER_CONTAINER_CLASS_NAME);
    this.wrapperLinkGH.addInnerElement(
      new ImgLinkView(linkGHL).getView(),
      new ImgLinkView(linkGHV).getView(),
      new ImgLinkView(linkGHA).getView()
    );
    this.container
      .getViewCreator()
      .addInnerElement(
        new ImgLinkView(linkRS).getView(),
        this.createParagraph().getElement(),
        this.wrapperLinkGH.getElement()
      );
    this.getViewCreator().addInnerElement(this.container.getViewCreator());
  }

  private createWrapper(...classes: string[]): IElementCreator {
    const params: ElementCreatorParams = {
      tag: WRAPPER_TAG,
      classNames: classes,
    };
    const wrapper: IElementCreator = new ElementCreator(params);
    return wrapper;
  }

  private createParagraph(): IElementCreator {
    const params: ElementCreatorParams = {
      tag: PARAGRAPH_TAG,
      classNames: [FOOTER_YEAR_CLASS_NAME],
    };
    const paragraph: IElementCreator = new ElementCreator(params);
    paragraph.setTextContent(PARAGRAPH_TEXT_CONTENT);
    return paragraph;
  }
}
