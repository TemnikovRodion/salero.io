import React from 'react';
import { Text, Title, Tooltip } from '../_Common';
import './styles.scss';

type Props = {
  options: {
    title: string;
    subTitle: string;
    text: string;
    tooltip?: string;
    trend?: string;
  }[];
};

export const AsideSummary = ({ options }: Props): React.ReactElement => {
  return (
    <div className={'aside-summary-wrapper'}>
      {options.map((item, idx) => (
        <div key={idx} className={'aside-summary-item'}>
          <Title level={4} className={'aside-summary-title'}>
            {item.title}
            {item.tooltip && <Tooltip title={item.tooltip} />}
          </Title>

          <Title level={1} className={'aside-summary-sub-title'}>
            {item.subTitle}
            {item.trend && <img src={item.trend} alt={''} />}
          </Title>

          <Text color={'gray'}>{item.text}</Text>
        </div>
      ))}
    </div>
  );
};
