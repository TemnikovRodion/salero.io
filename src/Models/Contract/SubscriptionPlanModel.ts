export type SubscriptionPlanModel = {
  id: number;
  name: string;
  description: string;
  price: number;
  features: SubscriptionPlanFeature[];
};

type SubscriptionPlanFeature = {
  id: number;
  name: string;
};
