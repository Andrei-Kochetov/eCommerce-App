import '@src/spa/view/pages/aboutUsPage/aboutUsPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';

const ABOUT_US_PAGE_CLASS = 'about-us';

export default class AboutUsPageView extends PageView {
  public constructor() {
    super(PageNames.ABOUT_US, ABOUT_US_PAGE_CLASS);
    this.getViewCreator().setTextContent('ABOUT-US-PAGE');
  }
}
