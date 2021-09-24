import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { warehousesAsyncThunks as asyncActions } from './asyncActions';
import { WarehouseModel, WarehouseSummaryModel } from '@/Models/Contract';
import { DateFilterType } from '@/Models/Types';
import { DateFormats } from '@/Constants/DateFormats';
import moment from 'moment';

type WarehousesState = {
  warehousesDateFilter: DateFilterType;
  warehousesTableData: WarehouseModel[];
  warehousesSummaryData: WarehouseSummaryModel | null;
};

const initialState: WarehousesState = {
  warehousesDateFilter: {
    date_from: moment().subtract(1, 'month').format(DateFormats.RequestDateFormat),
    date_to: moment().format(DateFormats.RequestDateFormat),
  },
  warehousesTableData: [],
  warehousesSummaryData: null,
};

const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState: initialState,
  reducers: {
    setWarehousesDateFilter: (state, action: PayloadAction<DateFilterType>) => {
      state.warehousesDateFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncActions.get.fulfilled, (state, action) => {
        state.warehousesTableData = action.payload.data.stocks;
        state.warehousesSummaryData = action.payload.data.stat;
      })
      .addCase(asyncActions.getSummary.fulfilled, (state, action) => {
        state.warehousesSummaryData = action.payload.data.stat;
      })
      .addCase(asyncActions.getExcel.fulfilled, (state, action) => {
        const FileDownload = require('js-file-download');
        FileDownload(action.payload, 'MySaleroStocks.xlsx');
      });
  },
});

export const warehousesReducer = warehousesSlice.reducer;
export const warehousesActions = warehousesSlice.actions;
export const warehousesAsyncActions = asyncActions;
