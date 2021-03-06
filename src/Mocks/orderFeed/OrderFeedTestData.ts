import { OrderFeedModel } from '@/Models/Contract';
import { OrderType } from '@/Models/Enums';

export const orderFeedTestData: OrderFeedModel[] = [
  {
    id: 0,
    order_id: 654116,
    date: '2021-05-12',
    barcode: '15726283',
    product_name: 'Брюки',
    size: 'L',
    quantity: 2,
    discount: 10,
    total_price: 6272,
    dispatch_warehouse: 'Москва',
    delivery_region: 'Самарская обл.',
    order_type: OrderType.Sale,
    nm_id: 2211113,
  },
  {
    id: 1,
    order_id: 654119,
    date: '2021-05-12',
    barcode: '15726283',
    product_name: 'Рубашка',
    size: 'XL',
    quantity: 9,
    discount: 4,
    total_price: 3332,
    dispatch_warehouse: 'Яхрома',
    delivery_region: 'Московская обл.',
    order_type: OrderType.Sale,
    nm_id: 2245113,
  },
  {
    id: 2,
    order_id: 654170,
    date: '2021-05-12',
    barcode: '15726283',
    product_name: 'Мобильный телефон',
    size: '-',
    quantity: 6,
    discount: 6,
    total_price: 6505,
    dispatch_warehouse: 'Тверь',
    delivery_region: 'Ленинградская обл.',
    order_type: OrderType.Sale,
    nm_id: 2221113,
  },
  {
    id: 3,
    order_id: 654180,
    date: '2021-05-12',
    barcode: '15726283',
    product_name: 'Медведь плюшевый',
    size: '-',
    quantity: 2,
    discount: 10,
    total_price: 8226,
    dispatch_warehouse: 'Санкт-Петербург',
    delivery_region: 'Тверская обл.',
    order_type: OrderType.Sale,
    nm_id: 2216432,
  },
  {
    id: 4,
    order_id: 644181,
    date: '2021-05-12',
    barcode: '15726283',
    product_name: 'Торшер Light Tall',
    size: '-',
    quantity: 2,
    discount: 10,
    total_price: 8605,
    dispatch_warehouse: 'Казань',
    delivery_region: 'Калининградская обл.',
    order_type: OrderType.Sale,
    nm_id: 2215553,
  },
];
