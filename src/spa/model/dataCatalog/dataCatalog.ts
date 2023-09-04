import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { options } from '@src/spa/model/LoginClientApi/constants';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { IAllFiltersValue } from '@src/spa/logic/catalog/types';

export default class DataCatalog {
  private static readonly instance = new DataCatalog();
  private currentCategoryName;

  private constructor() {
    this.currentCategoryName = '';
  }

  public static getInstance() {
    return this.instance;
  }

  public getCatalogs() {
    const queryArgs = {
      expand: ['parent'],
    };
    const apiRoot = this.createApiRoot();
    return apiRoot
      .categories()
      .get({
        queryArgs: queryArgs,
      })
      .execute();
  }

  public getProducts() {
    const queryArgs = {
      priceCurrency: 'USD',
    };
    const apiRoot = this.createApiRoot();
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: queryArgs,
      })
      .execute();
  }

  public async getCategory(categoryName: string) {
    const queryArgs = {
      where: `name(en-US="${categoryName}")`,
    };
    const apiRoot = this.createApiRoot();
    const response = await apiRoot
      .categories()
      .get({
        queryArgs: queryArgs,
      })
      .execute();
    console.log(response.body.results[0].id, 'category by name');
    return response.body.results[0];
  }
  public async getProductsFromCategory(categoryName: string) {
    const category = await this.getCategory(categoryName);
    this.currentCategoryName = categoryName;
    const queryArgs = {
      priceCurrency: 'USD',
      filter: [`categories.id: subtree("${category.id}")`],
    };
    const apiRoot = this.createApiRoot();
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: queryArgs,
      })
      .execute();
  }

  public async getProductById(id: string) {
    const queryArgs = {
      filter: [`id:"${id}"`],
      priceCurrency: 'USD',
    };
    const apiRoot = this.createApiRoot();
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: queryArgs,
      })
      .execute();
  }
  /* eslint-disable max-lines-per-function*/
  public async getProductWithFilters(allValue: IAllFiltersValue) {
    const filter: string[] = [];
    if (this.currentCategoryName) {
      const category = await this.getCategory(this.currentCategoryName);
      filter.push(`categories.id: subtree("${category.id}")`);
    }

    const sort: string[] = [];

    if (allValue.color !== 'Color') {
      filter.push(`variants.attributes.color:"${allValue.color}"`);
    }
    if (allValue.brand !== 'Brand') {
      filter.push(`variants.attributes.brand:"${allValue.brand}"`);
    }
    if (allValue.sale) {
      filter.push(`variants.scopedPriceDiscounted: true`);
    }
    if (allValue.rangePrice[1]) {
      filter.push(`variants.price.centAmount:range (${allValue.rangePrice[0]} to ${allValue.rangePrice[1]})`);
    } else if (allValue.rangePrice[0]) {
      filter.push(`variants.price.centAmount:range (${allValue.rangePrice[0]} to *)`);
    }
    if (allValue.sortAlphabet === 'A-Z') {
      sort.push(`name.en-US asc`);
    }
    if (allValue.sortAlphabet === 'Z-A') {
      sort.push(`name.en-US desc`);
    }
    if (allValue.sortPrice === 'Ascending') {
      sort.push(`price asc`);
    }
    if (allValue.sortPrice === 'Descending') {
      sort.push(`price desc`);
    }
    console.log(filter, 'filter after if');
    console.log(sort, 'sort');
    const apiRoot = this.createApiRoot();
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          priceCurrency: 'USD',
          sort: sort,
          filter: filter,
        },
      })
      .execute();
  }
  /* eslint-enable max-lines-per-function*/
  public async getProductWithSearch(searchText: string) {
    const filter: string[] = [];
    if (this.currentCategoryName) {
      const category = await this.getCategory(this.currentCategoryName);
      filter.push(`categories.id: subtree("${category.id}")`);
    }
    console.log(searchText);
    const apiRoot = this.createApiRoot();
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          priceCurrency: 'USD',
          ['text.en-US']: `${searchText}`,
          filter: filter,
        },
      })
      .execute();
  }

  public async getProductResetFilters() {
    const filter: string[] = [];
    if (this.currentCategoryName) {
      const category = await this.getCategory(this.currentCategoryName);
      filter.push(`categories.id: subtree("${category.id}")`);
    }
    const apiRoot = this.createApiRoot();
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          priceCurrency: 'USD',
          filter: filter,
        },
      })
      .execute();
  }

  private createApiRoot() {
    const ctpClient: Client = new ClientBuilder()
      .withHttpMiddleware(options.httpMiddlewareOptions)
      .withClientCredentialsFlow(options.authMiddlewareOptions)
      .build();
    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: options.projectKey,
    });
    return apiRoot;
  }
}
