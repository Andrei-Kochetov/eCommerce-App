import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import { PAGE_NAME_ATTRIBUTE, PageNames } from '@src/spa/view/pages/types';

const PAGE_WRAPPER_TAG = 'div';

export default abstract class Page extends View {
  constructor(pageName: PageNames, ...pageWrapperClasses: string[]) {
    const params: ElementCreatorParams = {
      tag: PAGE_WRAPPER_TAG,
      classNames: pageWrapperClasses,
      attributes: {
        [PAGE_NAME_ATTRIBUTE]: pageName,
      },
    };
    super(params);
  }
}
