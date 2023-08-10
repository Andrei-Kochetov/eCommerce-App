import '@src/spa/common.scss';
import { IApp } from '@src/spa/types';
import PasswordInputView from './view/input/passwordInput/passwordInputView';

// The main class of the application that provides app functionality to the entry point - index.ts
export default class App {
  private static readonly instance: IApp = new App();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {} // at the time empty

  public static getInstance(): IApp {
    return this.instance;
  }

  public start(): void {
    console.log('App is started!');
    const password = new PasswordInputView();
    password.setTextError('adasdasd');
    document.body.append(password.getView());
  }
}
