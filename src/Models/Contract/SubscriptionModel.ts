import { SubscriptionPlanModel, SubscriptionStatusModel } from './';

export type SubscriptionModel = {
  active: boolean;
  created_at: string;
  end_date: string;
  isRebill: boolean;
  plan: SubscriptionPlanModel;
  status: SubscriptionStatusModel;
};
