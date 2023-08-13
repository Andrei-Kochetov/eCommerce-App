import { APP_STATE_KEYS, DEFAULT_STATE, IState, StateRecords } from '@src/spa/logic/state/types';

const STORAGE_STATE_KEY = 'app_state';

export default class State implements IState {
  private static readonly instance: IState = new State();

  private state: StateRecords;

  private constructor() {
    this.state = this.loadState();

    window.addEventListener('beforeunload', this.saveState.bind(this));
  }

  public static getInstance(): IState {
    return this.instance;
  }

  public resetState(): void {
    this.state = DEFAULT_STATE;
  }

  public setRecord<T extends APP_STATE_KEYS>(key: T, value: StateRecords[T]): void {
    this.state[key] = value;
  }

  public getRecord(key: APP_STATE_KEYS): string {
    if (key in this.state) {
      return this.state[key];
    }
    return '';
  }

  private saveState(): void {
    localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(this.state));
  }

  private loadState(): StateRecords {
    const stateString: string | null = localStorage.getItem(STORAGE_STATE_KEY);
    if (!stateString) return DEFAULT_STATE;
    return JSON.parse(stateString);
  }
}
