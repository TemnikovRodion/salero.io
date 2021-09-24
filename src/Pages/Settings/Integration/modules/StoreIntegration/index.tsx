import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Col, Divider, Input, Button } from 'antd';
import { Text, Title } from '@/Components/_Common';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { StorageIntegrationStatus } from '@/Models/Enums';
import { userActions, userAsyncActions } from '@/Reducer/User/reducer';
import { AppDispatch } from '@/Reducer/Store';
import { BaseResponse } from '@/Api';
import ym from 'react-yandex-metrika';
import TagManager from 'react-gtm-module';
import './styles.scss';

type Props = {};

export const StoreIntegrationComponent = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [storeKey, setStoreKey] = useState('');
  const [storeStatus, setStoreStatus] = useState<StorageIntegrationStatus>(
    isUserStoreConnected ? StorageIntegrationStatus.Connected : StorageIntegrationStatus.NotConnected,
  );

  // Отправка ключа магазина
  const sendStoreKey = () => {
    setIsLoading(true);

    dispatch(userActions.setDataLoadingStatus('inProcess'));
    dispatch(userAsyncActions.setStoreKey({ key: storeKey })).then((response) => {
      setTimeout(() => {
        const responseStatus = (response.payload as BaseResponse<void>)?.status;

        dispatch(userActions.setDataLoadingStatus(responseStatus ? 'success' : 'error'));

        // Обновляем состояние, если компонент не удален
        if (mountedRef.current) {
          setIsLoading(false);

          if (!responseStatus) {
            setStoreStatus(StorageIntegrationStatus.Error);
            return;
          } // if

          setStoreStatus(StorageIntegrationStatus.Connected);
          setStoreKey('');
        } // if

        if (responseStatus) {
          ym(String(YM_ACCOUNT), 'reachGoal', 'setWbKey');
          TagManager.dataLayer({
            dataLayer: {
              gtmId: GA_ACCOUNT,
              page: 'integration',
            },
            dataLayerName: 'PageDataLayer',
          });
        }
      }, 2000);
    });
  }; // sendStoreKey

  const storageIntegrationInfo = useMemo(() => {
    return [
      {
        status: StorageIntegrationStatus.NotConnected,
        title: 'Введите API ключ вашего магазина',
        description: 'Бесплатный период 7 дней начнется после ввода API ключа',
      },
      {
        status: StorageIntegrationStatus.Connected,
        title: `Вы подключили магазин. Перейдите в Аналитику.`,
        description: 'Чтобы подключить другой магазин вместо текущего, введите новый API ключ',
      },
      {
        status: StorageIntegrationStatus.Error,
        title: 'Вы ввели неправильный ключ',
        description: 'Перепроверьте API ключ и вставьте его заново',
      },
    ];
  }, []);

  return (
    <Col span={6} className={'storage-integration-wrapper'}>
      <Card
        className={'storage-integration-form'}
        style={{ background: '#3e82f7', width: '100%', height: 'max-content' }}
      >
        <div className={'storage-integration-title'}>
          {isLoading ? (
            <>
              <Title level={4} color={'white'}>
                {'Ваш магазин подключается....'}
              </Title>
              <Text color={'white'}>{'Обычно это занимает до 5 минут.'}</Text>
            </>
          ) : (
            <>
              <Title level={4} color={'white'}>
                {storageIntegrationInfo.find((item) => item.status === storeStatus)?.title ?? ''}
              </Title>
              <Text color={'white'}>
                {storageIntegrationInfo.find((item) => item.status === storeStatus)?.description ?? ''}
              </Text>
            </>
          )}
        </div>

        <Divider />

        <Input value={storeKey} placeholder="Вставьте сюда API ключ" onChange={(e) => setStoreKey(e.target.value)} />

        <Button
          loading={isLoading}
          disabled={storeKey.length === 0 || isLoading}
          type={'default'}
          htmlType="submit"
          className={'storage-integration-button'}
          onClick={() => sendStoreKey()}
        >
          {isLoading ? 'Подключение' : 'Подключить магазин'}
        </Button>
      </Card>
    </Col>
  );
};

export const StoreIntegration = React.memo(StoreIntegrationComponent);
