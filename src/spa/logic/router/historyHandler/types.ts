import { URLParams } from '@src/spa/logic/router/types';

export const HistoryHandlerEvent = 'popstate';
export const LocationPathname = 'pathname';
export const LocationSearch = 'search';

export interface IHistoryHandler {
  navigate(url: PopStateEvent | string | null): void;
}

export type HistoryHandlerCallback = (params: URLParams) => void;
