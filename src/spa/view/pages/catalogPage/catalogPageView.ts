import '@src/spa/view/pages/catalogPage/catalogPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';

const CATALOG_PAGE_CLASS = 'catalog';

export default class CatalogPageView extends PageView {
  public constructor() {
    super(PageNames.CATALOG, CATALOG_PAGE_CLASS);
    this.getViewCreator().setTextContent('CATALOG-PAGE');
  }
}
