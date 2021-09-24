import ReactDOM from 'react-dom';
import { store } from '@/Reducer/Store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { ConfirmEmail, ForgotPassword, Login, Register, ResetPassword } from './Pages/Authorization';
import { PagesRouting } from './Routing';
import { globalHistory } from './GlobalHistory';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/locale/ru_RU';
import App from '@/App';
import { YMInitializer } from 'react-yandex-metrika';
import TagManager from 'react-gtm-module';
import '@/Styles/site.scss';

moment.locale('ru');

TagManager.initialize({ gtmId: GA_ACCOUNT });

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <YMInitializer accounts={[Number(YM_ACCOUNT)]} />
      <Router history={globalHistory}>
        <Switch>
          <Route path={PagesRouting.Auth.Login} component={Login} exact />
          <Route path={PagesRouting.Auth.Register} component={Register} exact />
          <Route path={PagesRouting.Auth.ForgotPassword} component={ForgotPassword} exact />
          <Route path={PagesRouting.Auth.ResetPassword} component={ResetPassword} exact />
          <Route path={PagesRouting.Auth.ConfirmEmail} component={ConfirmEmail} exact />
          <Route path={'/'} component={App} />
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById('app'),
);
