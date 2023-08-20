import '@src/spa/view/pages/profilePage/profilePage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';

const PROFILE_PAGE_CLASS = 'profile';

export default class ProfilePageView extends PageView {
  public constructor() {
    super(PageNames.CATALOG, PROFILE_PAGE_CLASS);
    this.getViewCreator().setTextContent('PROFILE-PAGE');
  }
}
