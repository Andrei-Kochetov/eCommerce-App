export interface IModalLogic {
  acceptHandler(): Promise<void>;
  exitHandler(): void;
}

export const UNKNOWN_REQUEST_ERROR = 'Server interaction error occurred!';
