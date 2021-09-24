import React, { useEffect, useState } from 'react';
import { Aside, Footer, Header, Main } from './Pages/Layouts';
import { useDispatch, useSelector } from 'react-redux';
import { userAsyncActions } from './Reducer/User/reducer';
import { userSelectors } from './Reducer/User/selectors';
import { StoreConnectionModal, SubscriptionEndModal } from './Modals';
import { LoadDataModal } from '@/Modals/LoadDataModal';
import { globalHistory } from '@/GlobalHistory';
import { PagesRouting } from '@/Routing';
import { AppDispatch } from './Reducer/Store';
import './App.scss';

type Props = {};

const App = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(userSelectors.user);
  const dataLoadingStatus = useSelector(userSelectors.dataLoadingStatus);
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const isUserSynchronized = useSelector(userSelectors.isUserSynchronized);
  const userSubscription = useSelector(userSelectors.userSubscription);

  // Состояния приложения
  const [isMenuShown, setIsMenuShown] = useState(true);
  const [isStoreConnectionModalShown, setIsStoreConnectionModalShown] = useState(false);
  const [isSubscriptionEndModalShown, setIsSubscriptionEndModalShown] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(userAsyncActions.get()).then((response) => {
        if (!response.payload) {
          globalHistory.push(PagesRouting.Auth.Login);
        } // if
      });
    } // if
  }, []);

  useEffect(() => {
    if (isUserStoreConnected !== null) {
      setIsStoreConnectionModalShown(!isUserStoreConnected);
      return;
    } // if

    if (userSubscription && !userSubscription.active) {
      setIsSubscriptionEndModalShown(true);
      return;
    } // if

    if (user && !isUserSynchronized) {
      setTimeout(() => {
        dispatch(userAsyncActions.get());
      }, 15000);
    } // if
  }, [isUserStoreConnected, isUserSynchronized, userSubscription]);

  return (
    <>
      <Header isMenuShown={isMenuShown} onAsideMenuButtonClick={() => setIsMenuShown(!isMenuShown)} />
      <Aside isMenuShown={isMenuShown} />

      <div className={`app-content-wrapper ${isMenuShown ? 'large' : 'small'}`}>
        <StoreConnectionModal
          visible={isStoreConnectionModalShown}
          onClose={() => setIsStoreConnectionModalShown(false)}
        />

        {userSubscription && (
          <SubscriptionEndModal
            visible={isSubscriptionEndModalShown && globalHistory.location.pathname !== PagesRouting.Settings.Pricing}
            userSubscriptionPlan={userSubscription.plan}
          />
        )}

        <LoadDataModal
          visible={
            (dataLoadingStatus !== 'none' &&
              globalHistory.location.pathname !== PagesRouting.Settings.Help &&
              globalHistory.location.pathname !== PagesRouting.Settings.Pricing &&
              globalHistory.location.pathname !== PagesRouting.Settings.Profile) ||
            dataLoadingStatus === 'success' ||
            dataLoadingStatus === 'error'
          }
          dataLoadingStatus={dataLoadingStatus}
        />

        <Main />
        <Footer />
      </div>
    </>
  );
};

export default App;
