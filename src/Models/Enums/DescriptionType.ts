export enum DescriptionType {
  ProductEnd = 'ProductEnd',
  ProductEndSoon = 'ProductEndSoon',
  OrdersDrop = 'OrdersDrop',
  SalesDrop = 'SalesDrop',
}

export const useDescriptions = () => {
  return [
    { key: DescriptionType.ProductEnd, value: 'Закончился' },
    { key: DescriptionType.ProductEndSoon, value: 'Скоро закончится' },
    { key: DescriptionType.OrdersDrop, value: 'Падение продаж' },
    { key: DescriptionType.SalesDrop, value: 'Падение заказов' },
  ];
};
