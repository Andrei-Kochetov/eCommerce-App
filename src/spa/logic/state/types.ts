export interface IState {
  setRecord(key: string, value: string): void;
  getRecord(key: string): string;
}

export enum APP_STATE_KEYS {
  AUTHORIZED = 'authorized',
  IS_SPECIAL_PAGE = 'is_special_page', // for sign-in and registration page
  USER_LOGIN = 'user_login',
}

export type AUTHORIZED_STATE = 'true' | 'false';
export type IS_SPECIAL_PAGE = 'true' | 'false';

export interface StateRecords {
  [APP_STATE_KEYS.AUTHORIZED]: AUTHORIZED_STATE;
  [APP_STATE_KEYS.IS_SPECIAL_PAGE]: IS_SPECIAL_PAGE;
  [APP_STATE_KEYS.USER_LOGIN]: string;
}

export const DEFAULT_STATE: StateRecords = {
  [APP_STATE_KEYS.AUTHORIZED]: 'false',
  [APP_STATE_KEYS.IS_SPECIAL_PAGE]: 'false',
  [APP_STATE_KEYS.USER_LOGIN]: '',
};
