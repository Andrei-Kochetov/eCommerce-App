import IView from '@src/spa/view/types';

export interface IMainView {
  addPage(component: IView): void;
}

export type IMain = IMainView & IView;
