import '@src/spa/common.scss';
import { IApp } from '@src/spa/types';
import { IBasePage } from '@src/spa/view/pages/basePage/types';
import BasePageView from '@src/spa/view/pages/basePage/basePageView';

// The main class of the application that provides app functionality to the entry point - index.ts
export default class App {
  private static readonly instance: IApp = new App();

  private readonly basePage: IBasePage;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    this.basePage = new BasePageView();
  }

  public static getInstance(): IApp {
    return this.instance;
  }

  public start(): void {
    this.renderStartPage();
  }

  private renderStartPage(): void {
    document.body.append(this.basePage.getView());
  }
}
