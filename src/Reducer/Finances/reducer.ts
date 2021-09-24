import { FinanceChartModel, FinanceModel, FinanceSummaryModel } from '@/Models/Contract';
import { createSlice } from '@reduxjs/toolkit';
import { financesAsyncThunks as asyncActions } from './asyncActions';
import { DateFilterType } from '@/Models/Types';
import { DateFormats } from '@/Constants/DateFormats';
import moment from 'moment';

type FinancesState = {
  financesDateFilter: DateFilterType;
  financesTableData: FinanceModel[];
  financesChartData: FinanceChartModel | null;
  financesSummaryData: FinanceSummaryModel | null;
};

const initialState: FinancesState = {
  financesDateFilter: {
    date_from: moment().subtract(1, 'month').format(DateFormats.RequestDateFormat),
    date_to: moment().format(DateFormats.RequestDateFormat),
  },
  financesTableData: [],
  financesChartData: null,
  financesSummaryData: null,
};

const financesSlice = createSlice({
  name: 'finances',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const financesReducer = financesSlice.reducer;
export const financesActions = financesSlice.actions;
export const financesAsyncActions = asyncActions;
