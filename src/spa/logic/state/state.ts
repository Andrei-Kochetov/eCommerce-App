import { IState } from '@src/spa/logic/state/types';

const STORAGE_STATE_KEY = 'app_state';

export default class State implements IState {
  private static readonly instance: IState = new State();

  private readonly state: Record<string, string>;

  private constructor() {
    this.state = this.loadState();

    window.addEventListener('beforeunload', this.saveState.bind(this));
  }

  public static getInstance(): IState {
    return this.instance;
  }

  public setRecord(key: string, value: string): void {
    this.state[key] = value;
  }

  public getRecord(key: string): string {
    if (key in this.state) {
      return this.state[key];
    }
    return '';
  }

  private saveState(): void {
    localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(this.state));
  }

  private loadState(): Record<string, string> {
    const stateString: string | null = localStorage.getItem(STORAGE_STATE_KEY);
    if (!stateString) return {};
    return JSON.parse(stateString);
  }
}
