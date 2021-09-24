export type AutodeliveryModel = {
  barcode: string;
  product_brand: string;
  product_name: string;
  product_size: string;
  units_sales_per_day: number;
  out_of_stock_days: number;
  on_way_to_client: number;
  on_way_from_client: number;
  stock_quantity: number;
  required_supply_count: number;
  need_add_in_file: boolean;
  nm_id: number;
};
