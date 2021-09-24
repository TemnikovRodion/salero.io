import { UserModel } from '@/Models/Contract';

export type LoginResponse = {
  user: UserModel;
  access_token: string;
};
