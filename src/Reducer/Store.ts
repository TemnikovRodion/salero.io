import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { analyticReducer } from './Analytic/reducer';
import { autodeliveryReducer } from './Autodelivery/reducer';
import { productsReducer } from './Products/reducer';
import { userReducer } from './User/reducer';
import { warehousesReducer } from './Warehouses/reducer';
import { orderFeedReducer } from '@/Reducer/OrderFeed/reducer';
import { financesReducer } from '@/Reducer/Finances/reducer';
import { alertsReducer } from '@/Reducer/Alerts/reducer';
import { subscriptionPlansReducer } from './SubscriptionPlans/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  warehouses: warehousesReducer,
  analytic: analyticReducer,
  autodelivery: autodeliveryReducer,
  orderFeed: orderFeedReducer,
  finances: financesReducer,
  alerts: alertsReducer,
  subscriptionPlans: subscriptionPlansReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
