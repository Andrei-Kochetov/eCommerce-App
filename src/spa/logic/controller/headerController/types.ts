export interface IHeaderController {
  goTo(element: HTMLElement): void;
  goToBasket(): void;
  goToProfile(): void;
  signOut(element: HTMLElement): void;
}
