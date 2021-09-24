import { DescriptionType } from '../Enums';

export type AlertSettingModel = {
  description_type: DescriptionType;
  description: string;
  condition?: number;
  sendInProfile: boolean;
  sendInEmail: boolean;
};
