import { IBasePage } from '@src/spa/view/pages/basePage/types';
import { PageNames } from '@src/spa/view/pages/types';
import { IRouter } from '@src/spa/logic/router/types';
import { APP_STATE_KEYS, IState } from '@src/spa/logic/state/types';
import State from '@src/spa/logic/state/state';
import { DEFAULT_PROFILE_DATA, ProfileData } from '@src/spa/logic/profile/profileDataManager/types';
import ProfileDataManager from '@src/spa/logic/profile/profileDataManager/profileDataManager';
import CatalogDataManager from '@src/spa/logic/catalog/catalogDataManager';
import PopUpView from '@src/spa/view/popUp/popUpView';
import { UNKNOWN_REQUEST_ERROR } from '@src/spa/logic/modalLogic/types';
import { CatalogData } from '@src/spa/logic/catalog/types';
import { CustomProductData } from '@src/spa/logic/catalog/catalogDataManager/types';

export interface IRoute {
  path: string;
  callback: (basePage: IBasePage, router: IRouter) => void;
}

export const routes: IRoute[] = [
  {
    path: ``,
    callback: async (basePage: IBasePage): Promise<void> => {
      const { default: HomePageView } = await import('@src/spa/view/pages/homePage/homePageView'); // async import for lazy loading
      basePage.renderPage(new HomePageView());
    },
  },
  {
    path: `${PageNames.MAIN}`,
    callback: async (basePage: IBasePage): Promise<void> => {
      const { default: HomePageView } = await import('@src/spa/view/pages/homePage/homePageView');
      basePage.renderPage(new HomePageView());
    },
  },
  {
    path: `${PageNames.LOGIN}`,
    callback: async (basePage: IBasePage, router: IRouter): Promise<void> => {
      const { default: LoginPageView } = await import('@src/spa/view/pages/loginPage/loginPageView');
      const state: IState = State.getInstance();
      if (state.getRecord(APP_STATE_KEYS.AUTHORIZED) === 'true') {
        router.navigate(PageNames.MAIN, true);
      } else {
        basePage.renderPage(new LoginPageView(router));
      }
    },
  },
  {
    path: `${PageNames.REGISTRATION}`,
    callback: async (basePage: IBasePage, router: IRouter): Promise<void> => {
      const { default: RegistrationPageView } = await import(
        '@src/spa/view/pages/registrationPage/registrationPageView'
      );
      const state: IState = State.getInstance();
      if (state.getRecord(APP_STATE_KEYS.AUTHORIZED) === 'true') {
        router.navigate(PageNames.MAIN, true);
      } else {
        basePage.renderPage(new RegistrationPageView(router));
      }
    },
  },
  {
    path: `${PageNames.NOT_FOUND}`,
    callback: async (basePage: IBasePage, router: IRouter): Promise<void> => {
      const { default: NotFoundPageView } = await import('@src/spa/view/pages/notFoundPage/notFoundPageView');
      basePage.renderPage(new NotFoundPageView(router));
    },
  },
  {
    path: `${PageNames.ABOUT_US}`,
    callback: async (basePage: IBasePage): Promise<void> => {
      const { default: AboutUsPageView } = await import('@src/spa/view/pages/aboutUsPage/aboutUsPageView');
      basePage.renderPage(new AboutUsPageView());
    },
  },
  {
    path: `${PageNames.CATALOG}`,
    callback: async (basePage: IBasePage, router: IRouter): Promise<void> => {
      const { default: CatalogPageView } = await import('@src/spa/view/pages/catalogPage/catalogPageView');
      const state: IState = State.getInstance();
      if (state.getRecord(APP_STATE_KEYS.AUTHORIZED) !== 'true') {
        router.navigate(PageNames.LOGIN, true);
      } else {
        let params;
        try {
          params = await CatalogDataManager.getInstance().getCatalogData();
        } catch {
          PopUpView.getRejectPopUp(UNKNOWN_REQUEST_ERROR).show();
        }
        if (!params) return;
        basePage.renderPage(new CatalogPageView(params));
      }
    },
  },
  {
    path: `${PageNames.BASKET}`,
    callback: async (basePage: IBasePage): Promise<void> => {
      const { default: BasketPageView } = await import('@src/spa/view/pages/basketPage/basketPageView');
      basePage.renderPage(new BasketPageView());
    },
  },
  {
    path: `${PageNames.PROFILE}`,
    callback: async (basePage: IBasePage, router: IRouter): Promise<void> => {
      const { default: ProfilePageView } = await import('@src/spa/view/pages/profilePage/profilePageView');
      const state: IState = State.getInstance();
      if (state.getRecord(APP_STATE_KEYS.AUTHORIZED) !== 'true') {
        router.navigate(PageNames.LOGIN, true);
      } else {
        let params: ProfileData;
        try {
          params = await ProfileDataManager.getInstance().getProfileData();
        } catch {
          params = DEFAULT_PROFILE_DATA;
          PopUpView.getRejectPopUp(UNKNOWN_REQUEST_ERROR).show();
        }
        basePage.renderPage(new ProfilePageView(params));
      }
    },
  },
  {
    //temporary for testing
    path: `${PageNames.PRODUCT}`,
    callback: async (basePage: IBasePage): Promise<void> => {
      const { default: ProductPageView } = await import('@src/spa/view/pages/productPage/productPageView');
      basePage.renderPage(new ProductPageView(productInfo));
    },
  },
  // TODO add paths for other pages by its templates
];

const productInfo: CustomProductData = {
  id: 'hon90lite8256clb',
  path: 'catalog/electronics/phones/hon90lite8256clb',
  name: 'HONOR 90 Lite 8GB/256GB',
  description:
    'Android, screen 6.7" IPS (1080x2388) 90 Hz, Mediatek Dimensity 6020, 8 GB RAM, 256 GB memory, 100 MP camera, 4500 mAh battery, 2 SIM (nano-SIM)',
  price: '899', // $
  discountPrice: '799', // $
  imgURLs: [
    'https://content2.onliner.by/catalog/device/main/71afe5898b9a35de52ab4ed3a4e131e2.jpeg',
    'https://content2.onliner.by/catalog/device/main/b5309561ad7bb7c38d26f0c2dfe00db6.jpeg',
    'https://content2.onliner.by/catalog/device/main/3cbff6b060b8775fb5611e6d74420091.jpeg',
    'https://content2.onliner.by/catalog/device/main/0619b9023d05c99443f6e8338e2e326f.jpeg',
    'https://content2.onliner.by/catalog/device/main/a6c4344b1ce7deb5912c4cf80e8e01ff.jpeg',
    'https://content2.onliner.by/catalog/device/main/b5b8edf86b4a4954be8a7e74bc0d5e0e.jpeg',
  ],
};
