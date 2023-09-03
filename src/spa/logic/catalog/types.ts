import { Category } from '@commercetools/platform-sdk';
import { ProductProjection } from '@commercetools/platform-sdk';

export type CatalogData = {
  allCategories: Category[];
  allProducts: ProductProjection[];
  categories: Category[];
  categoriesThree: Record<string, Category[]>;
  categoriesThreeText: Record<string, string[]>;
  attributesArr: string[];
};

export type IAllFiltersValue = {
  brand: string;
  color: string;
  rangePrice: number[];
  sale: boolean;
  sortAlphabet: string;
  sortPrice: string;
};
