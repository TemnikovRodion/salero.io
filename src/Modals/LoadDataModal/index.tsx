import React, { useMemo } from 'react';
import { Text } from '@/Components/_Common';
import { Modal } from '@/Components';
import { Button } from 'antd';
import { globalHistory } from '@/GlobalHistory';
import { PagesRouting } from '@/Routing';
import { useDispatch } from 'react-redux';
import './styles.scss';
import { userActions } from '@/Reducer/User/reducer';

type Props = {
  visible: boolean;
  dataLoadingStatus: 'success' | 'inProcess' | 'error' | 'none';
};

const LoadData = ({ visible, dataLoadingStatus }: Props): React.ReactElement => {
  const dispatch = useDispatch();

  //TODO поменять обратно на аналитику
  const modalInfo = useMemo(() => {
    switch (dataLoadingStatus) {
      case 'success':
        return {
          title: 'Вы подключили магазин.',
          text: 'Перейдите в Товары, чтоб посмотреть данные.',
          buttonText: 'Товары',
          buttonAction: () => {
            globalHistory.push(PagesRouting.Dashboards.Products);
            dispatch(userActions.setDataLoadingStatus('none'));
          },
        };

      case 'inProcess':
        return {
          title: 'Мы подключаем Ваш магазин и обновляем данные!',
          text: 'Это занимает менее 5 минут. Пока идет загрузка, можно посмотреть раздел «Помощь», там много полезного..',
          buttonText: 'Помощь',
          buttonAction: () => {
            globalHistory.push(PagesRouting.Settings.Help);
          },
        };

      case 'error':
        return {
          title: 'Ошибка подключения магазина!',
          text: 'Вы ввели неправильный ключ или ключ уже использован. Перепроверьте API ключ и вставьте его заново.',
          buttonText: globalHistory.location.pathname === PagesRouting.Settings.Integration ? 'Ок' : 'Интеграция',
          buttonAction: () => {
            globalHistory.push(PagesRouting.Settings.Integration);
            dispatch(userActions.setDataLoadingStatus('none'));
          },
        };

      default:
        return null;
    }
  }, [dataLoadingStatus]);

  return (
    <Modal
      title={modalInfo?.title ?? ''}
      visible={visible}
      width={654}
      body={<Text>{modalInfo?.text}</Text>}
      buttons={
        <>
          <Button key="submit" type="primary" onClick={modalInfo?.buttonAction}>
            {modalInfo?.buttonText}
          </Button>
        </>
      }
    />
  );
};

export const LoadDataModal = React.memo(LoadData);
