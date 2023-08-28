import { IModalLogic } from '@src/spa/logic/modalLogic/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import ButtonView from '@src/spa/view/button/buttonView';
import { btnParams } from '@src/spa/view/button/types';
import { IModal } from '@src/spa/view/modal/types';
import PopUpView from '@src/spa/view/popUp/popUpView';
import { IPopUpView } from '@src/spa/view/popUp/types';

const ARE_YOU_SURE_MESSAGE = `You want to exit without saving changes?`;
const YES_BTN_CLASS = 'btn_yes';

export default abstract class ModalLogic<T extends IModal> implements IModalLogic {
  protected readonly modal: T;

  public constructor(modal: T) {
    this.modal = modal;
  }

  public static ObjTopLevelCompare<T>(first: T, second: T): boolean {
    for (const key in first) {
      if (first[key] !== second[key]) return false;
    }
    return true;
  }

  protected abstract validate(): boolean;
  protected abstract beforeCloseActions(): void;
  protected abstract wasChanges(): boolean;

  public acceptHandler(): void {
    if (!this.validate()) return;
    if (this.wasChanges()) {
      this.beforeCloseActions();
    }
    this.modal.hideModal();
  }

  public exitHandler(): void {
    if (this.wasChanges()) {
      const popUp: IPopUpView = PopUpView.getRejectPopUpWithoutImg(ARE_YOU_SURE_MESSAGE);
      popUp.getView().prepend(this.createYesBTN(popUp).getElement());
      popUp.showWithoutAutoHiding();
      return;
    } else {
      this.modal.hideModal();
    }
  }

  private createYesBTN(popUp: IPopUpView): IElementCreator {
    const params: btnParams = {
      textContent: 'Yes',
      classNames: [YES_BTN_CLASS],
    };
    const button: IElementCreator = new ButtonView(params).getViewCreator();
    button.setListeners({
      event: 'click',
      callback: (): void => {
        this.modal.hideModal();
        popUp.getView().remove();
      },
    });
    return button;
  }
}
