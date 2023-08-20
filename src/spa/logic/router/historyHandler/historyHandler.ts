import {
  HistoryHandlerCallback,
  HistoryHandlerEvent,
  IHistoryHandler,
  LocationPathname,
  LocationSearch,
} from '@src/spa/logic/router/historyHandler/types';
import { URLParams } from '@src/spa/logic/router/types';

export default class HistoryHandler implements IHistoryHandler {
  private readonly callback: HistoryHandlerCallback;

  constructor(callback: HistoryHandlerCallback) {
    this.callback = callback;
    window.addEventListener(HistoryHandlerEvent, this.navigate.bind(this));
  }

  public navigate(url: PopStateEvent | string | null, replace = false): void {
    if (typeof url === 'string') {
      this.setHistoryRecord(url, replace);
    }

    const params: URLParams = {
      path: '',
      resource: '',
      queryString: '',
      queryParams: null,
    };

    const pathname: string = window.location[LocationPathname].slice(1);
    const queryString: string = window.location[LocationSearch].slice(1);

    if (queryString) {
      params.queryString = queryString;
      params.queryParams = this.parseQueryString(queryString);
    }

    const lastSlashIdx: number = pathname.lastIndexOf('/');
    if (lastSlashIdx > 0) {
      params.path = pathname.slice(0, lastSlashIdx);
      const lastPart: string = pathname.slice(lastSlashIdx + 1);

      if (isNaN(+lastPart)) {
        params.path = `${params.path}/${lastPart}`;
      } else {
        params.resource = lastPart;
      }
    } else {
      params.path = pathname;
    }

    this.callback(params);
  }

  private parseQueryString(queryString: string): Record<string, string> {
    const result: Record<string, string> = {};
    queryString.split('&').forEach((query: string): void => {
      const [key, value] = query.split('=');
      result[key] = value;
    });
    return result;
  }

  private setHistoryRecord(url: string, replace: boolean): void {
    if (replace) {
      window.history.replaceState(null, '', `/${url}`);
    } else {
      window.history.pushState(null, '', `/${url}`);
    }
  }
}
