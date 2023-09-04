import '@src/spa/view/pages/catalogPage/catalogPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PAGE_NAME_ATTRIBUTE, PageNames } from '@src/spa/view/pages/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import * as constants from '@src/spa/view/pages/catalogPage/constants';
import { CatalogData } from '@src/spa/logic/catalog/types';
import { ProductProjection } from '@commercetools/platform-sdk';
import CatalogDataManager from '@src/spa/logic/catalog/catalogDataManager';
import SelectAttributeView from './select/selectAttribute';
import InputView from '../../input/inputView';
import { IAllFiltersValue } from '@src/spa/logic/catalog/types';
import CardProductView from './cardProduct/cardProduct';
import { IRouter } from '@src/spa/logic/router/types';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import SwiperView from '../../swiper/swiperView';

const CATALOG_PAGE_CLASS = 'catalog';

export default class CatalogPageView extends PageView {
  private searchInput;
  private sectionCategoryNesting;
  private sectionSubcategories;
  private sectionFilter;
  private sectionCardsProduct;
  private initialState;
  private selectBrand;
  private selectColor;
  private startPriceInput;
  private endPriceInput;
  private checkboxSale;
  private sortAlphabet;
  private sortPrice;
  private buttonApplyFilters;
  private buttonResetFilters;

  private readonly router: IRouter;

  public constructor(data: CatalogData, router: IRouter, category?: string, subcategory?: string) {
    super(PageNames.CATALOG, CATALOG_PAGE_CLASS);
    this.initialState = data;
    this.searchInput = this.createSearchInput();
    this.sectionCategoryNesting = this.createSectionCategoryNesting();
    this.sectionSubcategories = this.createSectionSubcategories();
    this.selectBrand = this.createSelectBrand();
    this.selectColor = this.createSelectColor();
    this.sortAlphabet = this.createSortAlphabet();
    this.sortPrice = this.createSortPrice();
    this.startPriceInput = this.createStartPriceInput();
    this.endPriceInput = this.createEndPriceInput();
    this.checkboxSale = this.createCheckboxSale();
    this.buttonApplyFilters = this.createApplyFiltersButton();
    this.buttonResetFilters = this.createResetFiltersButton();
    this.sectionFilter = this.createSectionFilter();
    this.sectionCardsProduct = this.createSectionCardsProducts();
    this.router = router;

    this.configureView(data, category, subcategory);
    if (category && !subcategory) {
      this.downloadCategory(category);
    } else if (subcategory && category) {
      this.downloadSubCategory(subcategory);
    } else {
      this.changeSectionCardProducts(this.initialState.allProducts);
    }
    this.getAllValueFilters();
  }

  public changeSubcategoriesSection(textContentArr: string[], category: string) {
    this.sectionSubcategories.clearInnerHTML();
    textContentArr.forEach((el, i) => {
      const button = this.createButtonSubcategories(textContentArr[i], category);
      this.sectionSubcategories.addInnerElement(button.getElement());
    });
  }

  public changeSectionCardProducts(products: ProductProjection[]) {
    this.sectionCardsProduct.clearInnerHTML();
    products.forEach((product) => {
      const card = this.createProductCard(product);
      this.sectionCardsProduct.addInnerElement(card.getView());
    });
  }

  public getAllValueFilters(): IAllFiltersValue {
    const allValue = {
      brand: (this.selectBrand.getView() as HTMLSelectElement).value,
      color: (this.selectColor.getView() as HTMLSelectElement).value,
      rangePrice: [
        +(this.startPriceInput.getElement() as HTMLInputElement).value * 100,
        +(this.endPriceInput.getElement() as HTMLInputElement).value * 100,
      ],
      sale: (this.checkboxSale.getInput().getElement() as HTMLInputElement).checked,
      sortAlphabet: (this.sortAlphabet.getView() as HTMLSelectElement).value,
      sortPrice: (this.sortPrice.getView() as HTMLSelectElement).value,
    };
    return allValue;
  }

  public resetAllValueFilters() {
    (this.selectBrand.getView() as HTMLSelectElement).options.selectedIndex = 0;
    (this.selectColor.getView() as HTMLSelectElement).options.selectedIndex = 0;
    (this.startPriceInput.getElement() as HTMLInputElement).value = '';
    (this.endPriceInput.getElement() as HTMLInputElement).value = '';
    (this.checkboxSale.getInput().getElement() as HTMLInputElement).checked = false;
    (this.sortAlphabet.getView() as HTMLSelectElement).options.selectedIndex = 0;
    (this.sortPrice.getView() as HTMLSelectElement).options.selectedIndex = 0;
  }

  private configureView(data: CatalogData, category?: string, subcategory?: string) {
    const leftContainerFixed = this.createLeftFixedContainer();
    const wrapperCategories = this.createWrapperCategories(data);
    const rightContentContainer = this.createRightContentContainer();
    const searchSection = this.createSearchSection();
    const paginationSection = this.createSectionPagination();
    leftContainerFixed.addInnerElement(wrapperCategories.getElement());
    rightContentContainer.addInnerElement(
      searchSection.getElement(),
      this.createBreadCrumbs(category, subcategory),
      this.sectionCategoryNesting.getElement(),
      this.sectionSubcategories.getElement(),
      this.sectionFilter.getElement(),
      this.sectionCardsProduct.getElement(),
      paginationSection.getElement()
    );
    this.getViewCreator().addInnerElement(leftContainerFixed.getElement(), rightContentContainer.getElement());
  }

  private createWrapperCategories(data: CatalogData) {
    const wrapper = new ElementCreator(constants.paramsWrapperCategories);
    data.categories.forEach((element) => {
      const button = this.createButtonCategories(Object.values(element.name)[0]);
      wrapper.addInnerElement(button);
    });
    return wrapper;
  }

  private createLeftFixedContainer() {
    const container = new ElementCreator(constants.paramsContainerLeftFixed);
    return container;
  }

  private createRightContentContainer() {
    const container = new ElementCreator(constants.paramsContainerRightContent);
    return container;
  }

  private createSearchSection() {
    const container = new ElementCreator(constants.paramsSearchSection);
    const button = new ElementCreator(constants.paramsButtonSearch);
    button.getElement().addEventListener('click', async () => {
      const searchText: string = (this.searchInput.getElement() as HTMLInputElement).value;
      this.resetAllValueFilters();
      const productResult = await CatalogDataManager.getInstance().getProductWithSearch(searchText);
      this.changeSectionCardProducts(productResult);
    });
    container.addInnerElement(this.searchInput.getElement(), button.getElement());
    return container;
  }

  private createSearchInput() {
    const input = new ElementCreator(constants.paramsInputSearch);
    return input;
  }

  private createSectionCategoryNesting() {
    const section = new ElementCreator(constants.paramsCategoryNesting);
    return section;
  }

  private createSectionSubcategories() {
    const section = new ElementCreator(constants.paramsSubcategoriesSection);
    return section;
  }

  private createSectionFilter() {
    const section = new ElementCreator(constants.paramsFilterSection);
    section.addInnerElement(
      this.selectBrand.getView(),
      this.selectColor.getView(),
      this.createRangePrice().getElement(),
      this.checkboxSale.getView(),
      this.sortAlphabet.getView(),
      this.sortPrice.getView(),
      this.buttonApplyFilters.getElement(),
      this.buttonResetFilters.getElement()
    );
    return section;
  }

  private createSectionCardsProducts() {
    const section = new ElementCreator(constants.paramsCardsProductsSection);
    return section;
  }
  private createSectionPagination() {
    const section = new ElementCreator(constants.paramsPaginationsSection);
    return section;
  }

  private createButtonSubcategories(textContent: string, category: string) {
    const params = {
      tag: 'button',
      classNames: ['catalog__button-subategories'],
      textContent: textContent,
    };
    const button = new ElementCreator(params);
    const path = `catalog/${category}/${textContent}`;
    button.setAttributes({ [PAGE_NAME_ATTRIBUTE]: path });
    button.getElement().addEventListener('click', (): void => this.router.navigate(path));
    return button;
  }

  private createButtonCategories(textContent: string) {
    const params = {
      tag: 'button',
      classNames: ['catalog__button-categories'],
      textContent: textContent,
    };
    const button = new ElementCreator(params);
    const path = `catalog/${textContent}`;
    button.setAttributes({ [PAGE_NAME_ATTRIBUTE]: path });
    button.getElement().addEventListener('click', (): void => this.router.navigate(path));
    return button;
  }

  private async downloadCategory(category: string): Promise<void> {
    const productsFromCategory = await CatalogDataManager.getInstance().getProductsFromCategory(category);
    this.changeSubcategoriesSection(this.initialState.categoriesThreeText[category], category);
    this.changeSectionCardProducts(productsFromCategory);
  }

  private async downloadSubCategory(category: string): Promise<void> {
    const productsFromSubctegory = await CatalogDataManager.getInstance().getProductsFromCategory(category);
    this.changeSectionCardProducts(productsFromSubctegory);
  }

  private createProductCard(product: ProductProjection) {
    const card = new CardProductView(product, this.router);
    return card;
  }

  private createSelectBrand() {
    const params = {
      classNames: ['catalog__select-brand'],
      optionNames: ['Brand', 'Lenovo', 'Samsung', 'HP', 'Honor', 'Redme', 'Acer', 'LG', 'Sony'],
      attributes: {
        name: 'brand-select',
      },
    };
    const select = new SelectAttributeView(params);
    return select;
  }

  private createSelectColor() {
    const params = {
      classNames: ['catalog__select-color'],
      optionNames: ['Color', 'Black', 'Blue', 'White', 'Silver', 'Red'],
      attributes: {
        name: 'color-select',
      },
    };
    const select = new SelectAttributeView(params);
    return select;
  }

  private createStartPriceInput() {
    const paramsFrom = {
      tag: 'input',
      classNames: ['catalog__input-price'],
      attributes: {
        type: 'number',
        name: 'start-price',
        placeholder: 'from',
      },
    };
    const inputFrom = new ElementCreator(paramsFrom);
    return inputFrom;
  }

  private createEndPriceInput() {
    const paramsTo = {
      tag: 'input',
      classNames: ['catalog__input-price'],
      attributes: {
        type: 'number',
        name: 'end-price',
        placeholder: 'to',
      },
    };
    const inputTo = new ElementCreator(paramsTo);
    return inputTo;
  }

  private createRangePrice() {
    const paramsWrapper = {
      tag: 'div',
      classNames: ['catalog__wrapper-price'],
      textContent: 'Price',
    };

    const wrapper = new ElementCreator(paramsWrapper);
    wrapper.addInnerElement(this.startPriceInput.getElement(), this.endPriceInput.getElement());
    return wrapper;
  }

  private createCheckboxSale() {
    const params = {
      attributes: {
        id: 'checkbox-sale',
        type: 'checkbox',
        name: 'checkbox-sale',
      },
      textLabel: 'Sale',
    };
    const checkbox = new InputView(params);
    checkbox.getViewCreator().setClasses('catalog__checkbox-sale');
    return checkbox;
  }

  private createSortAlphabet() {
    const params = {
      classNames: ['catalog__select-alphabet-sort'],
      optionNames: ['Alphabetical sorting', 'A-Z', 'Z-A'],
      attributes: {
        name: 'sort-alphabet-select',
      },
    };
    const select = new SelectAttributeView(params);
    return select;
  }

  private createSortPrice() {
    const params = {
      classNames: ['catalog__select-price-sort'],
      optionNames: ['Sort by price', 'Ascending', 'Descending'],
      attributes: {
        name: 'sort-price-select',
      },
    };
    const select = new SelectAttributeView(params);
    return select;
  }

  private createApplyFiltersButton() {
    const params = {
      tag: 'button',
      classNames: ['catalog__button-add-filters'],
      textContent: 'Apply filters',
    };
    const div = new ElementCreator(params);
    div.getElement().addEventListener('click', async () => {
      const allValues = this.getAllValueFilters();
      const filterProducts = await CatalogDataManager.getInstance().getProductWithFilters(allValues);
      this.changeSectionCardProducts(filterProducts);
    });
    return div;
  }

  private createResetFiltersButton() {
    const params = {
      tag: 'button',
      classNames: ['catalog__button-reset-filters'],
      textContent: 'Reset',
    };
    const div = new ElementCreator(params);
    div.getElement().addEventListener('click', async () => {
      this.resetAllValueFilters();
      const productFilterReset = await CatalogDataManager.getInstance().getProductResetWithFilters();
      this.changeSectionCardProducts(productFilterReset);
    });
    return div;
  }

  private createBreadCrumbs(category?: string, subcategory?: string): IElementCreator {
    const breadCrumbsContainer = SwiperView.createDivElement(constants.BREAD_CRUMBS_CONTAINER_CLASS);
    const catalog: IElementCreator = this.createLinkElement('catalog >', 'catalog');
    breadCrumbsContainer.addInnerElement(catalog);

    if (category) {
      const categoryLink: IElementCreator = this.createLinkElement(`${category} >`, `catalog/${category}`);
      breadCrumbsContainer.addInnerElement(categoryLink);
    }

    if (subcategory) {
      const categoryLink: IElementCreator = this.createLinkElement(
        `${subcategory} >`,
        `catalog/${category}/${subcategory}`
      );
      breadCrumbsContainer.addInnerElement(categoryLink);
    }
    console.log(breadCrumbsContainer.getElement());
    return breadCrumbsContainer;
  }

  private createLinkElement(textContent: string, href: string): IElementCreator {
    const params: ElementCreatorParams = {
      tag: 'a',
      classNames: [constants.BREAD_CRUMBS_CLASS],
      textContent: textContent,
      attributes: { [PAGE_NAME_ATTRIBUTE]: href },
      listenersParams: [{ event: 'click', callback: (): void => this.router.navigate(href) }],
    };
    return new ElementCreator(params);
  }
}
