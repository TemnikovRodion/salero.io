import { AutodeliveryModel, AutodeliveryParamsModel, AutodeliverySummaryModel } from '@/Models/Contract';
import { autodeliveryAsyncThunks as asyncActions } from './asyncActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AutodeliveryState = {
  autodeliveryParams: AutodeliveryParamsModel;
  autodeliveryTableData: AutodeliveryModel[];
  autodeliverySummaryData: AutodeliverySummaryModel | null;
  warehouseNames: string[];
};

const initialState: AutodeliveryState = {
  autodeliveryParams: {
    sale_days: 14,
    product_age_days: 10,
    commodity_stock_days: 14,
  },
  autodeliveryTableData: [],
  autodeliverySummaryData: null,
  warehouseNames: [],
};

const autodeliverySlice = createSlice({
  name: 'autodelivery',
  initialState: initialState,
  reducers: {
    setAutodeliveryParams: (state, action: PayloadAction<AutodeliveryParamsModel>) => {
      state.autodeliveryParams = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const autodeliveryReducer = autodeliverySlice.reducer;
export const autodeliveryActions = autodeliverySlice.actions;
export const autodeliveryAsyncActions = asyncActions;
