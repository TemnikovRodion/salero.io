import { ProductCategory } from '../Enums';

export type AnalyticStatisticModel = {
  productCategory: ProductCategory;
  products_count: number;
  assortment_percentage: number;
  sales_percentage: number;
};
