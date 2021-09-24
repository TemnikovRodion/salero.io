import React from 'react';
import { Text, Title } from '../_Common';
import './styles.scss';

type Props = {
  title: string;
  text: string;
};

export const DashboardTitle = ({ title, text }: Props): React.ReactElement => {
  return (
    <div className={'dashboard-title'}>
      <Title level={3}>{title}</Title>
      <Text>{text}</Text>
    </div>
  );
};
