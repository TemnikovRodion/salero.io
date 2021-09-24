import { UserModel } from '@/Models/Contract';

export type ConfirmEmailResponse = {
  user: UserModel;
  access_token: string;
};
