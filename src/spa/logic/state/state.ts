import { APP_STATE_KEYS, IState, DEFAULT_STATE } from '@src/spa/logic/state/types';

export default class State implements IState {
  private static readonly instance: IState = new State();

  private state: Record<string, string>;

  private constructor() {
    this.state = this.loadState();

    window.addEventListener('beforeunload', this.saveState.bind(this));
  }

  public static getInstance(): IState {
    return this.instance;
  }

  public resetState(): void {
    Object.keys(DEFAULT_STATE).forEach((key: string) => {
      this.state[key] = DEFAULT_STATE[key];
    });
  }

  // if necessary add a record to local storage add a key here and its default value to DEFAULT_STATE
  public setRecord(key: APP_STATE_KEYS, value: string): void {
    this.state[key] = value;
  }

  public getRecord(key: APP_STATE_KEYS): string {
    if (key in this.state) {
      return this.state[key];
    }
    return '';
  }

  private saveState(): void {
    Object.entries(this.state).forEach(([key, value]): void => {
      localStorage.setItem(key, value);
    });
  }

  private loadState(): Record<string, string> {
    const state: Record<string, string> = {};

    Object.keys(DEFAULT_STATE).forEach((key: string): void => {
      const value: string | null = localStorage.getItem(key);
      state[key] = value ? value : DEFAULT_STATE[key];
    });

    return state;
  }
}
