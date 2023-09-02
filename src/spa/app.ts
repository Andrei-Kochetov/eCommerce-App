import '@src/spa/common.scss';
import { IApp } from '@src/spa/types';
import { IBasePage } from '@src/spa/view/pages/basePage/types';
import BasePage from '@src/spa/view/pages/basePage/basePageView';
import Router from './logic/router/router';
import { IRouter } from './logic/router/types';

// The main class of the application that provides app functionality to the entry point - index.ts
export default class App {
  private static readonly instance: IApp = new App();

  private readonly basePage: IBasePage;
  private readonly router: IRouter;

  private constructor() {
    this.basePage = new BasePage();
    this.router = new Router(this.basePage);
    this.basePage.getHeader().setControllers(this.router);
  }

  public static getInstance(): IApp {
    return this.instance;
  }

  public start(): void {
    this.basePage.startRendering();
  }
}
