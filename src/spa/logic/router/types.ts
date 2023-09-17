export interface IRouter {
  navigate(url: string, replace?: boolean): void;
  redirectToNotFoundPage(url: string): void;
}

export const ID_TEMPLATE = '{id}';
export const QUERY_TEMPLATE = '{query}';
export const CATEGORY = '{category}';
export const SUBCATEGORY = '{subcategory}';
export const PRODUCT_ID = '{product_id}';

export interface URLParams {
  path: string;
  resource: string;
  queryString: string;
  queryParams: Record<string, string> | null;
}

export interface CatalogParts {
  category?: string;
  subcategory?: string;
  productID?: string;
}
