export interface IState {
  setRecord(key: string, value: string): void;
  getRecord(key: string): string;
}
