import React, { useMemo } from 'react';
import { Col, Row } from 'antd';
import { Text, Title } from '@/Components/_Common';
import { numberUtils } from '@/Utils';
import './styles.scss';

type Props = {};

const UsersSummaryComponent = ({}: Props): React.ReactElement => {
  // TODO: В редьюсер
  const usersSummary = {
    income: 1,
    conversions: 1,
    activeClients: 1,
    subscriptionClient: 1,
    newClients: 1,
    departedClient: 1,
  };

  // TODO: Добавить зависимость
  const usersStatisticInfo = useMemo(() => {
    return [
      {
        title: 'Доход',
        text: numberUtils.getMoneyString(usersSummary?.income),
        subText: `${usersSummary?.conversions ?? '0'} конверсий в подписку`,
      },
      {
        title: 'Активные клиенты',
        text: usersSummary?.activeClients ?? '-',
        subText: `${usersSummary?.subscriptionClient ?? '0'} подписных клиентов`,
      },
      {
        title: 'Динамика клиентов',
        text: `${usersSummary?.newClients - usersSummary.departedClient ?? '-'}`,
        subText: `Новых клиентов ${usersSummary?.newClients ?? '0'} и ушедших ${usersSummary.departedClient}`,
      },
    ];
  }, []);

  return (
    <Row justify={'space-between'} className={'warehouse-dashboard-statistic'}>
      {usersStatisticInfo.map((info, idx) => (
        <Col key={idx} span={7}>
          <Row>
            <Title weight={'bold'} level={5}>
              {info.title}
            </Title>
          </Row>

          <Row>
            <Title level={1}>{info.text}</Title>
          </Row>

          <Row>
            <Text color={'gray'}>{info.subText}</Text>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export const UsersSummary = React.memo(UsersSummaryComponent);
