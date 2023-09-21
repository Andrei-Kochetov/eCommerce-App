import IView from '@src/spa/view/types';

export interface ILoadSpinner extends IView {
  show(): void;
  hide(): void;
}
