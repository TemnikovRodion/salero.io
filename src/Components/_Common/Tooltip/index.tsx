import React from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import { Svg } from '@/Static';
import './styles.scss';

type Props = {
  title: string;
};

export const Tooltip = ({ title }: Props): React.ReactElement => {
  return (
    <AntdTooltip overlay={null} title={title} placement={'topLeft'}>
      <img alt={'Tooltip'} src={Svg.Tooltip} className={'tooltip-image'} />
    </AntdTooltip>
  );
};
