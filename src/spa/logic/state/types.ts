export interface IState {
  setRecord(key: string, value: string): void;
  getRecord(key: string): string;
  resetState(): void;
}

export enum APP_STATE_KEYS {
  AUTHORIZED = 'authorized',
  IS_SPECIAL_PAGE = 'is_special_page', // for sign-in and registration page
  USER_LOGIN = 'user_login',
}

export const DEFAULT_STATE: Record<string, string> = {
  [APP_STATE_KEYS.AUTHORIZED]: 'false',
  [APP_STATE_KEYS.IS_SPECIAL_PAGE]: 'false',
  [APP_STATE_KEYS.USER_LOGIN]: '',
};
