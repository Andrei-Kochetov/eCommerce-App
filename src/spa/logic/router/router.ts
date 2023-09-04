import { ID_TEMPLATE, IRouter, QUERY_TEMPLATE, URLParams } from '@src/spa/logic/router/types';
import HistoryHandler from '@src/spa/logic/router/historyHandler/historyHandler';
import { routes } from '@src/spa/logic/router/routes';
import { PageNames } from '@src/spa/view/pages/types';
import { IBasePage } from '@src/spa/view/pages/basePage/types';

export default class Router implements IRouter {
  private readonly handler: HistoryHandler;
  private readonly basePage: IBasePage;

  public constructor(basePage: IBasePage) {
    this.basePage = basePage;
    this.handler = new HistoryHandler(this.onURLChangeHandler.bind(this));

    document.addEventListener('DOMContentLoaded', () => {
      this.handler.navigate(null);
    });
  }

  // parameter replace is for correct back and forward logic after redirecting
  public navigate(url: string, replace?: boolean): void {
    this.handler.navigate(url, replace);
  }

  private onURLChangeHandler(params: URLParams): void {
    let pathForFind = '';
    let relativePath = '';

    if (params.queryParams) {
      pathForFind = `?${QUERY_TEMPLATE}`;
      relativePath = `?${params.queryString}`;
    } // most likely not to be used

    if (params.resource) {
      pathForFind = `/${ID_TEMPLATE}${pathForFind}`;
      relativePath = `/${params.resource}${relativePath}`;
    }

    pathForFind = `${params.path}${pathForFind}`;
    relativePath = `${params.path}${relativePath}`;
    const route = routes.find((item) => item.path === pathForFind);

    if (!route) {
      this.redirectToNotFoundPage(relativePath);
      return;
    }

    route.callback(this.basePage, this);
  }

  public redirectToNotFoundPage(url: string): void {
    const notFoundPage = routes.find((item) => item.path === PageNames.NOT_FOUND);
    if (notFoundPage) {
      window.history.pushState(null, '', `/${url}`);
      notFoundPage.callback(this.basePage, this);
    }
  }
}
