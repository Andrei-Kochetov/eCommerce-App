import '@src/spa/view/pages/catalogPage/catalogPage.scss';
import PageView from '@src/spa/view/pages/pageView';
import { PageNames } from '@src/spa/view/pages/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import * as constants from '@src/spa/view/pages/catalogPage/constants';
import { CatalogData } from '@src/spa/logic/catalog/types';

const CATALOG_PAGE_CLASS = 'catalog';

export default class CatalogPageView extends PageView {
  private searchInput;
  private sectionCategoryNesting;
  private sectionSubcategories;
  private sectionFilter;
  private sectionCardsProduct;
  public constructor(data: CatalogData) {
    super(PageNames.CATALOG, CATALOG_PAGE_CLASS);
    this.searchInput = this.createSearchInput();
    this.sectionCategoryNesting = this.createSectionCategoryNesting();
    this.sectionSubcategories = this.createSectionSubcategories();
    this.sectionFilter = this.createSectionFilter();
    this.sectionCardsProduct = this.createSectionCardsProducts();
    this.configureView(data);
  }

  /*   public changeSubcategoriesSection(){

  } */

  private configureView(data: CatalogData) {
    const leftContainerFixed = this.createLeftFixedContainer();
    const wrapperCategories = this.createWrapperCategories(data);
    const rightContentContainer = this.createRightContentContainer();
    const searchSection = this.createSearchSection();
    const paginationSection = this.createSectionPagination();
    leftContainerFixed.addInnerElement(wrapperCategories.getElement());
    rightContentContainer.addInnerElement(
      searchSection.getElement(),
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
      wrapper.addInnerElement(button.getElement());
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
  private createButtonCategories(textContent: string) {
    const params = {
      tag: 'button',
      classNames: ['catalog__button-categories'],
      textContent: textContent,
      /*       addEventListener: {
        'click': ()=>{
          
        }
      } */
    };
    const button = new ElementCreator(params);
    return button;
  }
  /*   private createProductCard(){
    const params{
      ta
    }
  } */
}
