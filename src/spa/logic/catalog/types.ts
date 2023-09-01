import { Category } from '@commercetools/platform-sdk';
import { ProductProjection } from '@commercetools/platform-sdk';

export type CatalogData = {
  allCategories: Category[];
  allProducts: ProductProjection[];
};
