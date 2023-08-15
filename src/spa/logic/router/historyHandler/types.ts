import { URLParams } from '@src/spa/logic/router/types';

export const HistoryHandlerEvent = 'popstate';
export const WindowLocationField = 'pathname';

export interface IHistoryHandler {
  navigate(url: PopStateEvent | string | null): void;
}

export type HistoryHandlerCallback = (params: URLParams) => void;
