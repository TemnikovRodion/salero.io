import { ProductModel, ProductSummaryModel } from '@/Models/Contract';

export type GetProductsResponse = {
  products: ProductModel[];
  stat: ProductSummaryModel;
};
