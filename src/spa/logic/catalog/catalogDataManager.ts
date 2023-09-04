import DataCatalog from '@src/spa/model/dataCatalog/dataCatalog';
import { CatalogData, IAllFiltersValue } from './types';
import { Category, ProductProjection } from '@commercetools/platform-sdk';

export default class CatalogDataManager /* implements IProfileDataManager */ {
  private static readonly instance = new CatalogDataManager();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    return this.instance;
  }

  /* eslint-disable max-lines-per-function*/
  public async getCatalogData(): Promise<CatalogData> {
    const allCategories = await this.getCatalogs();
    const allProducts: ProductProjection[] = (await this.getProducts()).body.results;
    const categories = allCategories.filter((el) => !el.parent);
    const subcategories = allCategories.filter((el) => el.parent);
    const categoriesThree: Record<string, Category[]> = {};
    for (let i = 0; i < categories.length; i++) {
      const categoryName = Object.values(categories[i].name)[0];
      const subcategory = [];
      for (let j = 0; j < subcategories.length; j++) {
        if (categories[i].id === subcategories[j].parent?.id) {
          subcategory.push(subcategories[j]);
        }
      }
      categoriesThree[categoryName] = subcategory;
    }
    const categoriesThreeText: Record<string, string[]> = {};
    for (let i = 0; i < categories.length; i++) {
      const categoryName = Object.values(categories[i].name)[0];
      const subcategory = [];
      for (let j = 0; j < subcategories.length; j++) {
        if (categories[i].id === subcategories[j].parent?.id) {
          subcategory.push(Object.values(subcategories[j].name)[0]);
        }
      }
      categoriesThreeText[categoryName] = subcategory;
    }
    const attributesAllSet: Set<string> = new Set();
    allProducts.forEach((el) => {
      const attributes = el.masterVariant.attributes;
      attributes?.forEach((el) => {
        attributesAllSet.add(el.name);
      });
    });
    const attributesArr = Array.from(attributesAllSet);
    return {
      allCategories: allCategories,
      allProducts: allProducts,
      categories: categories,
      categoriesThree: categoriesThree,
      categoriesThreeText: categoriesThreeText,
      attributesArr: attributesArr,
    };
  }

  public async getCatalogs() {
    const dataCatalogResponse = await DataCatalog.getInstance().getCatalogs();
    return dataCatalogResponse.body.results;
  }

  public async getCategoriesThree() {
    const allCategories = await this.getCatalogs();
    const categories = allCategories.filter((el) => !el.parent);
    const subcategories = allCategories.filter((el) => el.parent);
    const categoriesThreeText: Record<string, string[]> = {};
    for (let i = 0; i < categories.length; i++) {
      const categoryName = Object.values(categories[i].name)[0];
      const subcategory = [];
      for (let j = 0; j < subcategories.length; j++) {
        if (categories[i].id === subcategories[j].parent?.id) {
          subcategory.push(Object.values(subcategories[j].name)[0]);
        }
      }
      categoriesThreeText[categoryName] = subcategory;
    }
    return categoriesThreeText;
  }

  public async getProducts() {
    const dataCatalogResponse = await DataCatalog.getInstance().getProducts();
    return dataCatalogResponse;
  }

  public async getProductById(id: string) {
    const product = (await DataCatalog.getInstance().getProductById(id)).body.results[0];
    const urlsArr: string[] = [];
    product.masterVariant.images?.forEach((el) => {
      urlsArr.push(el.url);
    });
    return {
      id: product.id,
      name: `${product.name['en-US']}`,
      description: product.description ? `${product.description['en-US']}` : '',
      price: `${product.masterVariant.price?.value.centAmount}`,
      discountPrice: `${product.masterVariant.price?.discounted?.value.centAmount}`,
      imgUrls: urlsArr,
      path: '',
    };
  }
  public async getCategoryId(categoryName: string) {
    const dataCatalogResponse = await DataCatalog.getInstance().getCategory(categoryName);
    return dataCatalogResponse;
  }

  public async getProductsFromCategory(categoryName: string) {
    const dataCatalogResponse = await DataCatalog.getInstance().getProductsFromCategory(categoryName);
    return dataCatalogResponse.body.results;
  }

  public async getProductWithFilters(allValue: IAllFiltersValue) {
    const dataCatalogResponse = await DataCatalog.getInstance().getProductWithFilters(allValue);
    return dataCatalogResponse.body.results;
  }

  public async getProductResetWithFilters() {
    const dataCatalogResponse = await DataCatalog.getInstance().getProductResetFilters();
    return dataCatalogResponse.body.results;
  }

  public async getProductWithSearch(searchText: string) {
    const dataCatalogResponse = await DataCatalog.getInstance().getProductWithSearch(searchText);
    return dataCatalogResponse.body.results;
  }
}
