import { AnalyticChartModel, AnalyticModel, AnalyticSummaryModel, AnalyticStatisticModel } from '@/Models/Contract';
import { createSlice } from '@reduxjs/toolkit';
import { analyticAsyncThunks as asyncActions } from './asyncActions';

type AnalyticState = {
  analyticTableData: AnalyticModel[];
  analyticChartData: AnalyticChartModel[];
  analyticSummaryData: AnalyticSummaryModel | null;
  analyticStatisticData: AnalyticStatisticModel[];
};

const initialState: AnalyticState = {
  analyticTableData: [],
  analyticChartData: [],
  analyticSummaryData: null,
  analyticStatisticData: [],
};

const analyticSlice = createSlice({
  name: 'analytic',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const analyticReducer = analyticSlice.reducer;
export const analyticActions = analyticSlice.actions;
export const analyticAsyncActions = asyncActions;
