import { Svg } from '@/Static';

export enum ProductCategory {
  A = 'A',
  B = 'B',
  C = 'C',
}

export const useProductCategories = () => {
  return [
    {
      key: ProductCategory.A,
      value: ProductCategory.A,
      description: 'наиболее ценные товары',
      image: Svg.ACategory,
      color: 'green',
    },
    {
      key: ProductCategory.B,
      value: ProductCategory.B,
      description: 'промежуточные товары',
      image: Svg.BCategory,
      color: 'yellow',
    },
    {
      key: ProductCategory.C,
      value: ProductCategory.C,
      description: 'наименее ценные товары',
      image: Svg.CCategory,
      color: 'red',
    },
  ];
};
