import { AnalyticStatisticModel } from '@/Models/Contract/AnalyticStatisticModel';
import { ProductCategory } from '@/Models/Enums';

export const analyticStatisticTestData: AnalyticStatisticModel[] = [
  {
    productCategory: ProductCategory.A,
    products_count: 1,
    assortment_percentage: 33.3,
    sales_percentage: 70.2,
  },
  {
    productCategory: ProductCategory.B,
    products_count: 1,
    assortment_percentage: 33.3,
    sales_percentage: 24.6,
  },
  {
    productCategory: ProductCategory.C,
    products_count: 1,
    assortment_percentage: 33.3,
    sales_percentage: 5.2,
  },
];
