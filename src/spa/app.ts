import { IApp } from "./types"; // TODO change relative paths to absolute with @src

// The main class of the application that provides app functionality to the entry point - index.ts
export default class App {
  private static readonly instance: IApp = new App();

  private constructor() {} // at the time empty

  public static getInstance(): IApp {
    return this.instance;
  }

  public start(): void {
    console.log('App is started!');
  }
}
