import { ClientResponse, createApiBuilderFromCtpClient, Customer } from '@commercetools/platform-sdk';
import { options } from '@src/spa/model/LoginClientApi/constants';
import {
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  TokenStore,
  TokenCache,
} from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { SetPasswordObj, SetNameAndDateBirthObj, AddAddressObj } from '@src/spa/model/dataCustomer/types';
import State from '@src/spa/logic/state/state';
import { APP_STATE_KEYS } from '@src/spa/logic/state/types';
import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { CustomAddress } from '@src/spa/logic/profile/profileDataManager/types';
import MyTokenCache from '@src/spa/model/LoginClientApi/tokenCache';

export default class DataCustomer {
  private static readonly instance = new DataCustomer();
  private readonly token: TokenCache;
  private constructor() {
    this.token = new MyTokenCache();
  }

  public static getInstance() {
    return this.instance;
  }

  public getToken(): TokenStore {
    return this.token.get();
  }

  public getDataCustomer(token: string) {
    const authorization = `Bearer ${token}`;
    const optionAuth: ExistingTokenMiddlewareOptions = {
      force: true,
    };
    const ctpClient: Client = new ClientBuilder()
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withExistingTokenFlow(authorization, optionAuth)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });

    return apiRoot.me().get().execute();
  }

  public setNewEmail(token: string, email: string) {
    const apiRoot = this.createApiRootForSetNewData(token);
    const currentVersion = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.VERSION));
    return apiRoot
      .me()
      .post({
        body: {
          version: currentVersion,
          actions: [
            {
              action: 'changeEmail',
              email: email,
            },
          ],
        },
      })
      .execute();
  }

  public setNewPassword(token: string, passwordObj: SetPasswordObj) {
    const apiRoot = this.createApiRootForSetNewData(token);
    const currentVersion = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.VERSION));
    return apiRoot
      .me()
      .password()
      .post({
        body: {
          version: currentVersion,
          newPassword: passwordObj.newPassword,
          currentPassword: passwordObj.oldPassword,
        },
      })
      .execute();
  }

  public setNewNameAndDateBirth(token: string, nameAndDateBirthObj: SetNameAndDateBirthObj) {
    const apiRoot = this.createApiRootForSetNewData(token);
    const currentVersion = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.VERSION));
    return apiRoot
      .me()
      .post({
        body: {
          version: currentVersion,
          actions: [
            {
              action: 'setFirstName',
              firstName: nameAndDateBirthObj.firstName,
            },
            {
              action: 'setLastName',
              lastName: nameAndDateBirthObj.lastName,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: nameAndDateBirthObj.dateBirth,
            },
          ],
        },
      })
      .execute();
  }

  public async setNewAddress(token: string, addressObj: CustomAddress, currentAddress: CustomAddress) {
    const apiRoot = this.createApiRootForSetNewData(token);
    const currentVersion = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.VERSION));
    const actions: MyCustomerUpdateAction[] = this.createActionsAddress(addressObj, currentAddress);
    return apiRoot
      .me()
      .post({
        body: {
          version: currentVersion,
          actions: actions,
        },
      })
      .execute();
  }

  /* eslint-disable max-lines-per-function*/
  public async addNewAddress(token: string, addressObj: AddAddressObj): Promise<ClientResponse<Customer>> {
    const apiRoot = this.createApiRootForSetNewData(token);
    let currentVersion = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.VERSION));
    const actions: MyCustomerUpdateAction[] = [
      {
        action: 'addAddress',
        address: {
          streetName: addressObj.street,
          postalCode: addressObj.postcode,
          city: addressObj.city,
          country: addressObj.country,
        },
      },
    ];
    const responseAddAddress = await apiRoot
      .me()
      .post({
        body: {
          version: currentVersion,
          actions: actions,
        },
      })
      .execute();
    currentVersion = responseAddAddress.body.version;
    State.getInstance().setRecord(APP_STATE_KEYS.VERSION, `${currentVersion}`);
    if (
      addressObj.isBilling === 'true' ||
      addressObj.isShipping === 'true' ||
      addressObj.isDefaultBilling === 'true' ||
      addressObj.isDefaultShipping === 'true'
    ) {
      const currentAddressIndex = responseAddAddress.body.addresses.length - 1;
      const id = responseAddAddress.body.addresses[currentAddressIndex].id;
      const apiRoot = this.createApiRootForSetNewData(token);
      const actions: MyCustomerUpdateAction[] = [];
      if (addressObj.isBilling === 'true') {
        actions.push({
          action: 'addBillingAddressId',
          addressId: id,
        });
      }
      if (addressObj.isShipping === 'true') {
        actions.push({
          action: 'addShippingAddressId',
          addressId: id,
        });
      }
      if (addressObj.isDefaultBilling === 'true') {
        actions.push({
          action: 'setDefaultBillingAddress',
          addressId: id,
        });
      }
      if (addressObj.isDefaultShipping === 'true') {
        actions.push({
          action: 'setDefaultShippingAddress',
          addressId: id,
        });
      }
      const responseAddAddressWithShippingBillingAndDefault = await apiRoot
        .me()
        .post({
          body: {
            version: currentVersion,
            actions: actions,
          },
        })
        .execute();
      currentVersion = responseAddAddressWithShippingBillingAndDefault.body.version;
      State.getInstance().setRecord(APP_STATE_KEYS.VERSION, `${currentVersion}`);
      return responseAddAddressWithShippingBillingAndDefault;
    } else {
      return responseAddAddress;
    }
  }
  /* eslint-enable max-lines-per-function*/

  public deleteAddress(token: string, addressId: string) {
    const apiRoot = this.createApiRootForSetNewData(token);
    const currentVersion = JSON.parse(State.getInstance().getRecord(APP_STATE_KEYS.VERSION));
    return apiRoot
      .me()
      .post({
        body: {
          version: currentVersion,
          actions: [
            {
              action: 'removeAddress',
              addressId: addressId,
            },
          ],
        },
      })
      .execute();
  }

  private createBasicActionsAddress(
    addressObj: CustomAddress,
    currentAddress: CustomAddress
  ): MyCustomerUpdateAction[] {
    const actions: MyCustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: addressObj.id,
        address: {
          streetName: addressObj.street,
          postalCode: addressObj.postcode,
          city: addressObj.city,
          country: addressObj.country,
        },
      },
    ];
    if (addressObj.isBilling !== currentAddress.isBilling && addressObj.isBilling === 'true') {
      actions.push({
        action: 'addBillingAddressId',
        addressId: addressObj.id,
      });
    } else if (addressObj.isBilling !== currentAddress.isBilling && addressObj.isBilling === 'false') {
      actions.push({
        action: 'removeBillingAddressId',
        addressId: addressObj.id,
      });
    }
    return actions;
  }

  private createActionsAddress(addressObj: CustomAddress, currentAddress: CustomAddress): MyCustomerUpdateAction[] {
    const actions: MyCustomerUpdateAction[] = this.createBasicActionsAddress(addressObj, currentAddress);
    if (addressObj.isShipping !== currentAddress.isShipping && addressObj.isShipping === 'true') {
      actions.push({
        action: 'addShippingAddressId',
        addressId: addressObj.id,
      });
    } else if (addressObj.isShipping !== currentAddress.isShipping && addressObj.isShipping === 'false') {
      actions.push({
        action: 'removeShippingAddressId',
        addressId: addressObj.id,
      });
    }
    if (addressObj.isDefaultBilling !== currentAddress.isDefaultBilling && addressObj.isDefaultBilling === 'true')
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: addressObj.id,
      });
    if (addressObj.isDefaultShipping !== currentAddress.isDefaultShipping && addressObj.isDefaultShipping === 'true')
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: addressObj.id,
      });
    return actions;
  }

  private createApiRootForSetNewData(token: string) {
    const authorization = `Bearer ${token}`;
    const optionAuth: ExistingTokenMiddlewareOptions = {
      force: true,
    };
    const ctpClient: Client = new ClientBuilder()
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withExistingTokenFlow(authorization, optionAuth)
      .build();

    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });
    return apiRoot;
  }
}
