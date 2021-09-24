export enum OrderType {
  Order = 'order',
  Sale = 'sale',
  Refund = 'refund',
}

export const useOrderTypes = () => {
  return [
    { key: OrderType.Order, value: 'Заказы' },
    { key: OrderType.Sale, value: 'Продажи' },
    { key: OrderType.Refund, value: 'Возвраты' },
  ];
};
