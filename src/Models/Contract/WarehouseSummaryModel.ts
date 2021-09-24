export type WarehouseSummaryModel = {
  total_products: number;
  sku: number;
  in_warehouse: number;
  sku_ended: number;
  balance_cost: number;
  revenue: number;
  in_way_to_client: number;
  in_way_from_client: number;
  redemption_percentage: number;
  turnover: number;
};
