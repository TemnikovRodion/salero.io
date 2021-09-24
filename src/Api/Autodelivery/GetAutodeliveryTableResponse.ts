import { AutodeliveryModel } from '@/Models/Contract';

export type GetAutodeliveryTableResponse = {
  autodelivery_table_data: AutodeliveryModel[];
  total: number;
};
