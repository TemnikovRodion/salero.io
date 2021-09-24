import { StoreModel } from './StoreModel';

export type UserStoreKeyModel = {
  active: boolean;
  created_at: string;
  key: string;
  store: StoreModel;
};
