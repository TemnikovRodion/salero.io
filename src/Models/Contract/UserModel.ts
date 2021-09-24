import { SubscriptionModel } from '.';
import { UserProfileModel } from './UserProfileModel';
import { UserRoleModel } from './UserRoleModel';
import { UserStoreKeyModel } from './UserStoreKeyModel';

export type UserModel = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  store_keys?: UserStoreKeyModel[];
  subscription: SubscriptionModel | null;
  first_sale_date: string;
  confirmed: boolean;
  role: UserRoleModel;
  profile: UserProfileModel;
  meta: {
    is_synchronized: boolean;
  };
};
