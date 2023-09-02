import { IRegistrationInputValue } from '@src/spa/model/registration/types';

export default interface IRegistrationController {
  register(element: HTMLElement, registrationInputValue: IRegistrationInputValue): void;
  goTo(element: HTMLElement): void;
}
