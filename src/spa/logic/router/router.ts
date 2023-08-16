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

    if (params.queryParams) {
      pathForFind = `?${QUERY_TEMPLATE}`;
    }

    if (params.resource) {
      pathForFind = `/${ID_TEMPLATE}${pathForFind}`;
    }

    pathForFind = `${params.path}${pathForFind}`;
    console.log(pathForFind);
    const route = routes.find((item) => item.path === pathForFind);

    if (!route) {
      this.redirectToNotFoundPage();
      return;
    }

    route.callback(this.basePage);
  }

  redirectToNotFoundPage() {
    const notFoundPage = routes.find((item) => item.path === PageNames.NOT_FOUND);
    if (notFoundPage) {
      this.navigate(notFoundPage.path);
    }
  }
}
