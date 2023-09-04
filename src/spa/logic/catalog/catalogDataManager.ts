import DataCatalog from '@src/spa/model/dataCatalog/dataCatalog';
import { CatalogData, IAllFiltersValue } from './types';
import { Category, ProductProjection, Project } from '@commercetools/platform-sdk';

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
    console.log(allCategories, allProducts, 'all');
    console.log(categories, 'main category');
    console.log(categoriesThree, 'three');
    console.log(categoriesThreeText, 'threeText');
    console.log(Array.from(attributesAllSet), 'attributes all');

    return {
      allCategories: allCategories,
      allProducts: allProducts,
      categories: categories,
      categoriesThree: categoriesThree,
      categoriesThreeText: categoriesThreeText,
      attributesArr: attributesArr,
    };
  }
  /* eslint-enable max-lines-per-function*/
  public async getCatalogs() {
    const dataCatalogResponse = await DataCatalog.getInstance().getCatalogs();
    return dataCatalogResponse.body.results;
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
      description: `${product.description!['en-US']}`,
      price: `${product.masterVariant.price?.value.centAmount}`,
      discountPrice: `${product.masterVariant.price?.discounted?.value.centAmount}`,
      imgUrls: urlsArr,
      path: 'нету))',
    };
  }
  public async getCategoryId(categoryName: string) {
    const dataCatalogResponse = await DataCatalog.getInstance().getCategory(categoryName);
    console.log(dataCatalogResponse, 'category by name');
  }
  public async getProductsFromCategory(categoryName: string) {
    const dataCatalogResponse = await DataCatalog.getInstance().getProductsFromCategory(categoryName);
    console.log(dataCatalogResponse.body.results, 'product from catalog');
    return dataCatalogResponse.body.results;
  }
  public async getProductWithFilters(allValue: IAllFiltersValue) {
    const dataCatalogResponse = await DataCatalog.getInstance().getProductWithFilters(allValue);
    console.log(dataCatalogResponse.body.results, 'product after');
    return dataCatalogResponse.body.results;
  }
  public async getProductResetWithFilters() {
    const dataCatalogResponse = await DataCatalog.getInstance().getProductResetFilters();
    console.log(dataCatalogResponse.body.results, 'product reset filter');
    return dataCatalogResponse.body.results;
  }
  public async getProductWithSearch(searchText: string) {
    const dataCatalogResponse = await DataCatalog.getInstance().getProductWithSearch(searchText);
    console.log(dataCatalogResponse.body.results, 'search response');
    return dataCatalogResponse.body.results;
  }
}
