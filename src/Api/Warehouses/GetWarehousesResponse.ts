import { WarehouseModel, WarehouseSummaryModel } from '@/Models/Contract';

export type GetWarehousesResponse = {
  stocks: WarehouseModel[];
  stat: WarehouseSummaryModel;
};
