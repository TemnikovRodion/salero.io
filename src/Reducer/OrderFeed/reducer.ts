import { OrderFeedChartModel, OrderFeedModel, OrderFeedSummaryModel } from '@/Models/Contract';
import { DateFilterType } from '@/Models/Types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderFeedAsyncThunks as asyncActions } from './asyncActions';
import { OrderType } from '@/Models/Enums';
import { DateFormats } from '@/Constants/DateFormats';
import moment from 'moment';

type OrderFeedState = {
  orderFeedDateFilter: DateFilterType;
  orderFeedTableData: {
    orders: OrderFeedModel[];
    sales: OrderFeedModel[];
    refunds: OrderFeedModel[];
  };
  orderFeedChartData: OrderFeedChartModel[];
  orderFeedSummaryData: OrderFeedSummaryModel | null;
};

const initialState: OrderFeedState = {
  orderFeedDateFilter: {
    date_from: moment().subtract(1, 'month').format(DateFormats.RequestDateFormat),
    date_to: moment().format(DateFormats.RequestDateFormat),
  },
  orderFeedTableData: {
    orders: [],
    sales: [],
    refunds: [],
  },
  orderFeedChartData: [],
  orderFeedSummaryData: null,
};

const orderFeedSlice = createSlice({
  name: 'order-feed',
  initialState: initialState,
  reducers: {
    setOrderFeedDateFilter: (state, action: PayloadAction<DateFilterType>) => {
      state.orderFeedDateFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncActions.get.fulfilled, (state, action) => {
        state.orderFeedChartData = action.payload.data.chart;
        state.orderFeedSummaryData = action.payload.data.stat;
        state.orderFeedTableData = {
          orders: action.payload.data.order_feed.filter((item) => item.order_type === OrderType.Order),
          sales: action.payload.data.order_feed.filter((item) => item.order_type === OrderType.Sale),
          refunds: action.payload.data.order_feed.filter((item) => item.order_type === OrderType.Refund),
        };
      })
      .addCase(asyncActions.getExcel.fulfilled, (state, action) => {
        const FileDownload = require('js-file-download');
        FileDownload(action.payload, 'MySaleroOrderFeed.xlsx');
      });
  },
});

export const orderFeedReducer = orderFeedSlice.reducer;
export const orderFeedActions = orderFeedSlice.actions;
export const orderFeedAsyncActions = asyncActions;
