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

  public navigate(url: string): void {
    this.handler.navigate(url);
  }

  private onURLChangeHandler(params: URLParams): void {
    let pathForFind = '';
    let relativePath = '';

    if (params.queryParams) {
      pathForFind = `?${QUERY_TEMPLATE}`;
    }

    if (params.resource) {
      pathForFind = `/${ID_TEMPLATE}${pathForFind}`;
      relativePath = `/${params.resource}`;
    }

    pathForFind = `${params.path}${pathForFind}`;
    relativePath = `${params.path}${relativePath}`;
    const route = routes.find((item) => item.path === pathForFind);

    if (!route) {
      this.redirectToNotFoundPage(relativePath);
      return;
    }

    route.callback(this.basePage);
  }

  redirectToNotFoundPage(url: string) {
    const notFoundPage = routes.find((item) => item.path === PageNames.NOT_FOUND);
    if (notFoundPage) {
      window.history.pushState(null, '', `/${url}`);
      notFoundPage.callback(this.basePage);
    }
  }
}
