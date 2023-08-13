import { IRouter } from '@src/spa/logic/router/types';

export default class Router implements IRouter {
  public navigate(url: string): void {
    console.log(url);
  }
}
