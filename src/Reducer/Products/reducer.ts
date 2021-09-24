import { ProductModel, ProductSummaryModel } from '@/Models/Contract';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsAsyncThunks as asyncActions } from './asyncActions';
import { DateFilterType } from '@/Models/Types';
import { DateFormats } from '@/Constants/DateFormats';
import moment from 'moment';

type ProductsState = {
  productsDateFilter: DateFilterType;
  productsTableData: ProductModel[];
  productsSummaryData: ProductSummaryModel | null;
};

const initialState: ProductsState = {
  productsDateFilter: {
    date_from: moment().subtract(1, 'month').format(DateFormats.RequestDateFormat),
    date_to: moment().format(DateFormats.RequestDateFormat),
  },
  productsTableData: [],
  productsSummaryData: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    setProductsDateFilter: (state, action: PayloadAction<DateFilterType>) => {
      state.productsDateFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncActions.get.fulfilled, (state, action) => {
        state.productsTableData = action.payload.data.products;
        state.productsSummaryData = action.payload.data.stat;
      })
      .addCase(asyncActions.getExcel.fulfilled, (state, action) => {
        const FileDownload = require('js-file-download');
        FileDownload(action.payload, 'MySaleroProducts.xlsx');
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const productsActions = productsSlice.actions;
export const productsAsyncActions = asyncActions;
