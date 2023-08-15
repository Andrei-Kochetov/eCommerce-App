import {
  HistoryHandlerCallback,
  HistoryHandlerEvent,
  IHistoryHandler,
  WindowLocationField,
} from '@src/spa/logic/router/historyHandler/types';
import { URLParams } from '@src/spa/logic/router/types';

export default class HistoryHandler implements IHistoryHandler {
  private readonly callback: HistoryHandlerCallback;

  constructor(callback: HistoryHandlerCallback) {
    this.callback = callback;
    window.addEventListener(HistoryHandlerEvent, this.navigate.bind(this));
  }

  public navigate(url: PopStateEvent | string | null): void {
    if (typeof url === 'string') {
      this.setHistoryRecord(url);
    }

    let pathname: string = window.location[WindowLocationField].slice(1);
    const params: URLParams = {
      path: '',
      resource: '',
      queryString: '',
      queryParams: null,
    };

    const queryStringStart: number = pathname.indexOf('?');
    if (queryStringStart >= 0) {
      const queryString: string = pathname.slice(queryStringStart + 1);
      params.queryString = queryString;
      params.queryParams = this.parseQueryString(queryString);
      pathname = pathname.slice(0, queryStringStart);
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

  private setHistoryRecord(url: string): void {
    window.history.pushState(null, '', `/${url}`);
  }
}
