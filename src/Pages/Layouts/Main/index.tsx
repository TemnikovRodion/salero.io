import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { PagesRouting } from '@/Routing';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { Loader } from '@/Components/_Common';
import './styles.scss';

// Dashboards
const Analytic = React.lazy(() => import(/* webpackChunkName: "analytic" */ '@/Pages/Dashboards/Analytic'));
const Alerts = React.lazy(() => import(/* webpackChunkName: "alerts" */ '@/Pages/Dashboards/Alerts'));
const Autodelivery = React.lazy(
  () => import(/* webpackChunkName: "auto_delivery" */ '@/Pages/Dashboards/AutoDelivery'),
);
const Finances = React.lazy(() => import(/* webpackChunkName: "finances" */ '@/Pages/Dashboards/Finances'));
const OrderFeed = React.lazy(() => import(/* webpackChunkName: "order_feed" */ '@/Pages/Dashboards/OrderFeed'));
const Products = React.lazy(() => import(/* webpackChunkName: "products" */ '@/Pages/Dashboards/Products'));
const Warehouse = React.lazy(() => import(/* webpackChunkName: "warehouse" */ '@/Pages/Dashboards/Warehouse'));

// Settings
const Help = React.lazy(() => import(/* webpackChunkName: "help" */ '@/Pages/Settings/Help'));
const Integration = React.lazy(() => import(/* webpackChunkName: "integration" */ '@/Pages/Settings/Integration'));
const Profile = React.lazy(() => import(/* webpackChunkName: "profile" */ '@/Pages/Settings/Profile'));
const Pricing = React.lazy(() => import(/* webpackChunkName: "pricing" */ '@/Pages/Settings/Pricing'));
const Users = React.lazy(() => import(/* webpackChunkName: "users" */ '@/Pages/Settings/Users'));

export const Main = (): React.ReactElement => {
  const isUserAdmin = useSelector(userSelectors.isUserAdmin);

  return (
    <main className={'main'}>
      <Suspense fallback={<Loader />}>
        <Switch>
          {/*
          <Route
            path={PagesRouting.Dashboards.Analytic}
            component={React.lazy(() => import('@/Pages/Dashboards/Analytic').then(({ Analytic }) => ({ default: Analytic  })))}
            exact
          />

          <Route
            path={PagesRouting.Dashboards.Alerts}
            component={React.lazy(() => import('@/Pages/Dashboards/Alerts').then(({ Alerts }) => ({ default: Alerts  })))}
            exact
          />
          

          <Route
            path={PagesRouting.Dashboards.Autodelivery}
            component={React.lazy(() => import('@/Pages/Dashboards/AutoDelivery').then(({ AutoDelivery }) => ({ default: AutoDelivery  })))}
            exact
          />

          <Route
            path={PagesRouting.Dashboards.Finances}
            component={React.lazy(() => import('@/Pages/Dashboards/Finances').then(({ Finances }) => ({ default: Finances  })))}
            exact
          />
          */}

          <Route path={PagesRouting.Dashboards.Products} component={Products} exact />
          <Route path={PagesRouting.Dashboards.Warehouse} component={Warehouse} exact />
          <Route path={PagesRouting.Dashboards.OrderFeed} component={OrderFeed} exact />
          <Route path={PagesRouting.Settings.Help} component={Help} exact />
          <Route path={PagesRouting.Settings.Integration} component={Integration} exact />
          <Route path={PagesRouting.Settings.Profile} component={Profile} exact />
          <Route path={PagesRouting.Settings.Pricing} component={Pricing} exact />
          <Route path={PagesRouting.Settings.Users} exact>
            {isUserAdmin ? <Users /> : <Redirect to={PagesRouting.Auth.Login} />}
          </Route>

          <Route path={'/'}>
            {/* TODO: Вернуть редирект на аналитику */}
            <Redirect to={PagesRouting.Dashboards.Products} />
          </Route>
        </Switch>
      </Suspense>
    </main>
  );
};
