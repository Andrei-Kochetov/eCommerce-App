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
    this.state = {};
  }

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
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  private loadState(): Record<string, string> {
    const state: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key: string | null = localStorage.key(i);
      if (!key) continue;
      const value: string | null = localStorage.getItem(key);
      if (value === null) continue;
      state[key] = value;
    }

    // set some default values
    Object.keys(DEFAULT_STATE).forEach((key: string): void => {
      if (!(key in state)) state[key] = DEFAULT_STATE[key];
    });
    return state;
  }
}
