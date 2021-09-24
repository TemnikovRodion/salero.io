export type GetAutodeliveryTableRequest = {
  delivery_date: string;
  warehouse_name: string;
  sale_days: number;
  product_create_days: number;
  commodity_stock: number;
  page_Size: number;
  current_page: number;
  sort_order: 'ASC' | 'DESC';
  sort_columns: string;
};
