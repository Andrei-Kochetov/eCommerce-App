const WRAPPER_TAG = 'div';
const WRAPPER_CATEGORIES_CLASS_NAME = ['catalog__wrapper-categories'];

const CONTAINER_TAG = 'div';
const CONTAINER_LEFT_FIXED_CLASS_NAME = ['catalog__container-fixed'];

const CONTAINER_RIGHT_CONTENT_CLASS_NAME = ['catalog__container-content'];

const SECTION_TAG = 'div';

const SEARCH_SECTION_CLASS_NAME = ['catalog__search-section'];

const SEARCH_INPUT_TAG = 'input';
const SEARCH_INPUT_CLASS_NAME = ['catalog__input-search'];
const SEARCH_INPUT_ATTRIBUTES = {
  type: 'text',
  placeholder: '  search line',
};

const SEARCH_BUTTON_TAG = 'button';
const SEARCH_BUTTON_CLASS_NAME = ['catalog__button-search'];
const SEARCH_BUTTON_TEXT_CONTENT = 'search';

const CATEGORY_NESTING_CLASS_NAME = ['catalog__category-nesting'];
const CATEGORY_NESTING_DEFAULT_TEXT_CONTENT = 'category';

const SECTION_SUBCATEGORIES_CLASS_NAME = ['catalog__section-subcategories'];

const SECTION_FILTER_CLASS_NAME = ['catalog__section-filter'];

const SECTION_CARDS_PRODUCT_CLASS_NAME = ['catalog__section-cards-product'];

const SECTION_PAGINATION_CLASS_NAME = ['catalog__section-pagination'];

export const paramsWrapperCategories = {
  tag: WRAPPER_TAG,
  classNames: WRAPPER_CATEGORIES_CLASS_NAME,
};

export const paramsContainerLeftFixed = {
  tag: CONTAINER_TAG,
  classNames: CONTAINER_LEFT_FIXED_CLASS_NAME,
};

export const paramsContainerRightContent = {
  tag: CONTAINER_TAG,
  classNames: CONTAINER_RIGHT_CONTENT_CLASS_NAME,
};

export const paramsSearchSection = {
  tag: SECTION_TAG,
  classNames: SEARCH_SECTION_CLASS_NAME,
};
export const paramsInputSearch = {
  tag: SEARCH_INPUT_TAG,
  classNames: SEARCH_INPUT_CLASS_NAME,
  attributes: SEARCH_INPUT_ATTRIBUTES,
};

export const paramsButtonSearch = {
  tag: SEARCH_BUTTON_TAG,
  classNames: SEARCH_BUTTON_CLASS_NAME,
  textContent: SEARCH_BUTTON_TEXT_CONTENT,
};

export const paramsCategoryNesting = {
  tag: SECTION_TAG,
  classNames: CATEGORY_NESTING_CLASS_NAME,
  textContent: CATEGORY_NESTING_DEFAULT_TEXT_CONTENT,
};

export const paramsSubcategoriesSection = {
  tag: SECTION_TAG,
  classNames: SECTION_SUBCATEGORIES_CLASS_NAME,
};

export const paramsFilterSection = {
  tag: SECTION_TAG,
  classNames: SECTION_FILTER_CLASS_NAME,
};
export const paramsCardsProductsSection = {
  tag: SECTION_TAG,
  classNames: SECTION_CARDS_PRODUCT_CLASS_NAME,
};
export const paramsPaginationsSection = {
  tag: SECTION_TAG,
  classNames: SECTION_PAGINATION_CLASS_NAME,
};
