import '@src/spa/view/pages/aboutUsPage/aboutUsPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';
import pageHTML from '@src/spa/view/pages/aboutUsPage/about-us.html';

const ABOUT_US_PAGE_CLASS = 'about-us';

export default class AboutUsPageView extends PageView {
  public constructor() {
    super(PageNames.ABOUT_US, ABOUT_US_PAGE_CLASS);
    this.getView().innerHTML = pageHTML;
  }
}
