import { AlertModel } from '@/Models/Contract';
import { DescriptionType } from '@/Models/Enums';
import { Images } from '@/Static';

export const alertsTestData: AlertModel[] = [
  {
    alert_date: '2021-08-01',
    barcode: '111111',
    product_name: 'Продукт 1',
    product_image: Images.Test.Products.Product1,
    description: 'Падение заказов на более, чем на 10 %',
    description_type: DescriptionType.OrdersDrop,
  },
  {
    alert_date: '2021-08-01',
    barcode: '111112',
    product_name: 'Продукт 2',
    product_image: Images.Test.Products.Product2,
    description: 'Падение продаж на более, чем на 30 %',
    description_type: DescriptionType.SalesDrop,
  },
  {
    alert_date: '2021-08-01',
    barcode: '111113',
    product_name: 'Продукт 3',
    product_image: Images.Test.Products.Product3,
    description: 'Товар закончился на складе',
    description_type: DescriptionType.ProductEnd,
  },
  {
    alert_date: '2021-08-01',
    barcode: '111114',
    product_name: 'Продукт 4',
    product_image: Images.Test.Products.Product4,
    description: 'Товар скоро закончится',
    description_type: DescriptionType.ProductEndSoon,
  },
];
