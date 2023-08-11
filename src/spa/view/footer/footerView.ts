import '@src/spa/view/footer/footer.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import IView from '@src/spa/view/types';
import ContainerView from '@src/spa/view/container/containerView';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import ImgLinkView from '@src/spa/view/img_link/imgLinkView';
import * as constants from '@src/spa/view/footer/constants';

export default class FooterView extends View implements IView {
  public constructor() {
    const params: ElementCreatorParams = {
      tag: constants.FOOTER_TAG,
      classNames: [constants.FOOTER_CLASS_NAME],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const container = new ContainerView();
    container.getViewCreator().setClasses(constants.FOOTER_CONTAINER_CLASS_NAME);
    const wrapperLinkGitHub = this.createWrapper(constants.LINK_GH_WRAPPER_CLASS_NAME);
    wrapperLinkGitHub.addInnerElement(
      new ImgLinkView(constants.linkGHL).getView(),
      new ImgLinkView(constants.linkGHV).getView(),
      new ImgLinkView(constants.linkGHA).getView()
    );
    container
      .getViewCreator()
      .addInnerElement(
        new ImgLinkView(constants.linkRS).getView(),
        this.createParagraph().getElement(),
        wrapperLinkGitHub.getElement()
      );
    this.getViewCreator().addInnerElement(container.getViewCreator());
  }

  private createWrapper(...classes: string[]): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.WRAPPER_TAG,
      classNames: classes,
    };
    const wrapper: IElementCreator = new ElementCreator(params);
    return wrapper;
  }

  private createParagraph(): IElementCreator {
    const params: ElementCreatorParams = {
      tag: constants.PARAGRAPH_TAG,
      classNames: [constants.FOOTER_YEAR_CLASS_NAME],
    };
    const paragraph: IElementCreator = new ElementCreator(params);
    paragraph.setTextContent(constants.PARAGRAPH_TEXT_CONTENT);
    return paragraph;
  }
}
