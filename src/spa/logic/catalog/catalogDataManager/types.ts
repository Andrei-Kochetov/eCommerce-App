import { Category } from '@commercetools/platform-sdk';
import { ProductProjection } from '@commercetools/platform-sdk';

export type CatalogData = {
  allCategories: Category[];
  allProducts: ProductProjection[];
};

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: string;
  discountPrice: string | null;
  imgURLs: string[];
}
