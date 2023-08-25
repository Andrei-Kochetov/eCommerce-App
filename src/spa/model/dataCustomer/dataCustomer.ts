import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { options } from '@src/spa/model/LoginClientApi/constants';
import { Client, ClientBuilder, ExistingTokenMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { SetPasswordObj, SetNameAndDateBirthObj, SetAddressObj } from '@src/spa/model/dataCustomer/types';

export default class DataCustomer {
  private static readonly instance = new DataCustomer();

  public static getInstance() {
    return this.instance;
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

    return apiRoot
      .me()
      .post({
        body: {
          version: 3,
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

  public setNewNameAndDateBirth(token: string, nameAndDateBirthObj: SetNameAndDateBirthObj) {
    const apiRoot = this.createApiRootForSetNewData(token);
    return apiRoot
      .me()
      .post({
        body: {
          version: 3,
          actions: [
            {
              action: 'setFirstName',
              firstName: nameAndDateBirthObj.newFirstName,
            },
            {
              action: 'setLastName',
              lastName: nameAndDateBirthObj.newLastName,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: nameAndDateBirthObj.newDateBirth,
            },
          ],
        },
      })
      .execute();
  }

  public setNewAddress(token: string, addressObj: SetAddressObj) {
    const apiRoot = this.createApiRootForSetNewData(token);
    return apiRoot
      .me()
      .post({
        body: {
          version: 5,
          actions: [
            {
              action: 'changeAddress',
              addressId: addressObj.addressId,
              address: {
                streetName: addressObj.streetName,
                postalCode: addressObj.postalCode,
                city: addressObj.city,
                country: addressObj.country,
              },
            },
          ],
        },
      })
      .execute();
  }

  public deleteAddress(token: string, addressId: string) {
    const apiRoot = this.createApiRootForSetNewData(token);

    return apiRoot
      .me()
      .post({
        body: {
          version: 6,
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

  public setNewPassword(token: string, passwordObj: SetPasswordObj) {
    const apiRoot = this.createApiRootForSetNewData(token);

    return apiRoot
      .me()
      .password()
      .post({
        body: {
          version: 1,
          currentPassword: passwordObj.currentPassword,
          newPassword: passwordObj.newPassword,
        },
      })
      .execute();
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
