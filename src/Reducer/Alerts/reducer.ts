import { AlertModel, AlertSettingModel } from '@/Models/Contract';
import { createSlice } from '@reduxjs/toolkit';
import { alertsAsyncThunks as asyncActions } from './asyncActions';
import { DateFilterType } from '@/Models/Types';
import { DescriptionType } from '@/Models/Enums';
import { DateFormats } from '@/Constants/DateFormats';
import moment from 'moment';

type AlertsState = {
  alertsDateFilter: DateFilterType;
  alertsTableData: AlertModel[];
  alertsHeaderData: AlertModel[];
  alertsSettings: AlertSettingModel[];
};

const initialState: AlertsState = {
  alertsDateFilter: {
    date_from: moment().subtract(1, 'month').format(DateFormats.RequestDateFormat),
    date_to: moment().format(DateFormats.RequestDateFormat),
  },
  alertsTableData: [],
  alertsHeaderData: [],
  alertsSettings: [
    {
      description_type: DescriptionType.ProductEnd,
      description: 'Товар закончился на складе',
      sendInEmail: true,
      sendInProfile: true,
    },
    {
      description_type: DescriptionType.ProductEndSoon,
      description: 'Товар закончится менее чем через',
      condition: 10,
      sendInEmail: true,
      sendInProfile: true,
    },
    {
      description_type: DescriptionType.OrdersDrop,
      description: 'Падение заказов более чем на',
      condition: 40,
      sendInEmail: true,
      sendInProfile: true,
    },
    {
      description_type: DescriptionType.SalesDrop,
      description: 'Падение продаж более чем на',
      condition: 35,
      sendInEmail: true,
      sendInProfile: true,
    },
  ],
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const alertsReducer = alertsSlice.reducer;
export const alertsActions = alertsSlice.actions;
export const alertsAsyncActions = asyncActions;
