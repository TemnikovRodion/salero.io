import React, { useMemo, useState } from 'react';
import { Card, Col, Button, Steps, message } from 'antd';
import { ApiKeyAccess, ApiKeyConnection, ApiKeyGeneration } from './modules';
import { Images } from '@/Static';
import { Title } from '@/Components/_Common';
import './styles.scss';

type Props = {};

export const IntegrationSteps = ({}: Props): React.ReactElement => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(() => {
    return [
      {
        title: 'Шаг первый',
        src: Images.Settings.Integration.ApiKeyAccess,
      },
      {
        title: 'Шаг второй',
        src: Images.Settings.Integration.ApiKeyGeneration,
      },
      {
        title: 'Шаг третий',
        src: Images.Settings.Integration.ApiKeyConnection,
      },
    ];
  }, []);

  return (
    <Col span={18} className={'integration-steps-wrapper'}>
      <Card className={'integration-steps-card'}>
        <div className="integration-steps-card-title">
          <Title level={2}>{'Как подключить Wildberries к нашему сервису'}</Title>
        </div>

        <Steps current={stepIndex}>
          {steps.map((item, idx) => (
            <Steps.Step key={idx} title={item.title} />
          ))}
        </Steps>

        <div className={'integration-steps-card-body'}>
          <div className="integration-steps-card-body-info">
            {stepIndex === 0 && <ApiKeyAccess step={steps[0]} />}
            {stepIndex === 1 && <ApiKeyConnection step={steps[1]} />}
            {stepIndex === 2 && <ApiKeyGeneration step={steps[2]} />}
          </div>

          <div className="integration-steps-card-body-buttons">
            {stepIndex < steps.length - 1 && (
              <Button type="primary" onClick={() => setStepIndex((prev) => prev + 1)}>
                Далее
              </Button>
            )}

            {stepIndex === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Все шаги пройдены!')}>
                Готово
              </Button>
            )}

            {stepIndex !== 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => setStepIndex((prev) => prev - 1)}>
                Назад
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Col>
  );
};
