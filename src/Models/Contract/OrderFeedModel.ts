import { OrderType } from '@/Models/Enums';

export type OrderFeedModel = {
  barcode: string;
  date: string;
  delivery_region: string;
  discount: number;
  dispatch_warehouse: string;
  order_id: number;
  order_type: OrderType;
  product_name: string;
  size: string;
  quantity: number;
  total_price: number;
  nm_id: number;
};
