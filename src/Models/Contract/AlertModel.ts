import { DescriptionType } from '../Enums';

export type AlertModel = {
  alert_date: string;
  barcode: string;
  product_name: string;
  product_image: string;
  description: string;
  description_type: DescriptionType;
};
