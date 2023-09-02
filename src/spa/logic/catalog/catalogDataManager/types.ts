import { Category } from '@commercetools/platform-sdk';
import { ProductProjection } from '@commercetools/platform-sdk';

export type CatalogData = {
  allCategories: Category[];
  allProducts: ProductProjection[];
};

export interface CustomProductData {
  id: string;
  path: string; // catalog/category/subcategory/product_id
  name: string;
  description: string;
  price: string;
  discountPrice: string | null;
  imgURLs: string[];
}
