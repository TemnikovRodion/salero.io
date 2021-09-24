import { ProductCategory } from '../Enums';

export type AnalyticModel = {
  name: string;
  nmid: string;
  rating: ProductCategory;
  ratingNumber: number;
  sales_amount_per_month: number;
  discount: number;
  price: number;
  price_with_discount: number;
  units_sales_per_month: number;
  redemption: number;
  turn_over: number;
  image: string;
  isNew: boolean;
};
