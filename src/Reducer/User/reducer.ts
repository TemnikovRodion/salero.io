import { globalHistory } from '@/GlobalHistory';
import { UserModel } from '@/Models/Contract';
import { PagesRouting } from '@/Routing';
import { cookieUtils } from '@/Utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userAsyncThunks as asyncActions } from './asyncActions';

type UserState = {
  user: UserModel | null;
  dataLoadingStatus: 'none' | 'success' | 'inProcess' | 'error';
};

const initialState: UserState = {
  user: null,
  dataLoadingStatus: 'none',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserModel | null>) => {
      state.user = action.payload;
    },
    setDataLoadingStatus: (state, action: PayloadAction<'none' | 'success' | 'inProcess' | 'error'>) => {
      state.dataLoadingStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncActions.login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;

        if (!state.user.confirmed) {
          setTimeout(() => globalHistory.push(PagesRouting.Auth.ConfirmEmail), 500);
          return;
        } // if

        cookieUtils.setCookie(AUTH_COOKIE_NAME, action.payload.data.access_token);
        setTimeout(() => {
          globalHistory.push(PagesRouting.Dashboards.Analytic);
        }, 500);
      })
      .addCase(asyncActions.register.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        setTimeout(() => globalHistory.push(PagesRouting.Auth.ConfirmEmail), 500);
      })
      .addCase(asyncActions.logout.fulfilled, (state, action) => {
        setTimeout(() => {
          window.location.href = PagesRouting.Auth.Login;
        }, 500);
      })
      .addCase(asyncActions.confirmEmail.fulfilled, (state, action) => {
        state.user = action.payload.data.user;

        cookieUtils.setCookie(AUTH_COOKIE_NAME, action.payload.data.access_token);
        setTimeout(() => globalHistory.push(PagesRouting.Dashboards.Analytic), 3000);
      })
      .addCase(asyncActions.get.fulfilled, (state, action) => {
        state.user = action.payload.data.user;

        if (state.user.store_keys?.[0] && state.user.subscription?.active && !state.user.meta.is_synchronized) {
          state.dataLoadingStatus = 'inProcess';
        } else if (state.dataLoadingStatus === 'inProcess') {
          state.dataLoadingStatus = 'success';
        } // if
      })
      .addCase(asyncActions.update.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
      })
      .addCase(asyncActions.updateProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profile = action.payload.data.user_profile;
        } // if
      })
      .addCase(asyncActions.setStoreKey.fulfilled, (state, action) => {
        if (state.user) {
          state.user.store_keys?.push(action.payload.data.store_key);
        }
      });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userAsyncActions = asyncActions;
