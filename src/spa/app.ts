import '@src/spa/common.scss';
import { IApp } from '@src/spa/types';
import { IBasePage } from '@src/spa/view/pages/basePage/types';
import BasePage from '@src/spa/view/pages/basePage/basePageView';
import Router from './logic/router/router';
import { IRouter } from './logic/router/types';
import { ELEMENT_PAGE_NAME_ATTRIBUTE } from './view/pages/types';

// The main class of the application that provides app functionality to the entry point - index.ts
export default class App {
  private static readonly instance: IApp = new App();

  private readonly basePage: IBasePage;
  private readonly router: IRouter;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    this.basePage = new BasePage();
    this.router = new Router(this.basePage);
  }

  public static getInstance(): IApp {
    return this.instance;
  }

  public start(): void {
    this.basePage.startRendering();
    this.navigate();
  }

  // temporary method for initial navigation, in the future will be replaced by router
  private navigate(): void {
    const header: HTMLElement = this.basePage.getHeader().getView();
    header.addEventListener('click', (event: MouseEvent): void => {
      if (!(event.target instanceof HTMLElement)) return;
      const pageName: string | undefined = event.target.dataset[ELEMENT_PAGE_NAME_ATTRIBUTE];
      if (!pageName) return;
      this.router.navigate(pageName);
    });

    const main: HTMLElement = this.basePage.getMain().getView();
    main.addEventListener('click', (event: MouseEvent): void => {
      if (!(event.target instanceof HTMLElement)) return;
      const pageName: string | undefined = event.target.dataset[ELEMENT_PAGE_NAME_ATTRIBUTE];
      if (!pageName) return;
      this.router.navigate(pageName);
    });
  }
}
