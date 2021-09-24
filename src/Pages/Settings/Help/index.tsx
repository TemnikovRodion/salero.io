import React, { useMemo } from 'react';
import { Card, Collapse } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Text, Title } from '@/Components/_Common';
import './styles.scss';

type Props = {};

const HelpComponent = ({}: Props): React.ReactElement => {
  const helpInfo = useMemo(() => {
    return [
      {
        title: 'Как начать работать с Salero?',
        text: 'Для того, чтобы подключить Ваш аккаунт к Salero Вам необходимо получить API-ключ в личном кабинете Wildberries. После получения ключа его необходимо вставить в нужное поле...',
      },
      {
        title: 'Как мне поможет данный сервис?',
        text: 'Salero занимается аналитикой Ваших продаж на Wildberries. Вы видите как глобальную аналитику, так и аналитику продаж конкретных товаров.',
      },
      {
        title: 'Как подключить аккаунт к Salero?',
        text: 'Для того, чтобы подключить Ваш аккаунт к Salero Вам необходимо получить API-ключ в личном кабинете Wildberries. После получения ключа его необходимо вставить в нужное поле...',
      },
    ];
  }, []);

  return (
    <>
      <div className="help-header-wrapper">
        <Title level={1} color={'white'} className={'help-header-title'}>
          {'Есть вопросы?'}
        </Title>
        <Text color={'white'} className={'help-header-text'}>
          {'Посмотрите в наш сборник часто задаваемых вопросов'}
        </Text>
      </div>

      <div className="help-body-wrapper">
        <Card>
          <Collapse
            accordion
            bordered={false}
            expandIcon={({ isActive }) => (
              <RightOutlined className={'help-body-icon'} type="right" rotate={isActive ? 90 : 0} />
            )}
          >
            {helpInfo.map((item, index) => (
              <Collapse.Panel header={item.title} key={index}>
                <Text className={'help-body-text'}>{item.text}</Text>
              </Collapse.Panel>
            ))}
          </Collapse>
        </Card>
      </div>
    </>
  );
};

const Help = React.memo(HelpComponent);

export default Help;
