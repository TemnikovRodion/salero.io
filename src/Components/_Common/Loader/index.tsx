import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import './styles.scss';

type Props = {};

export const Loader = ({}: Props): React.ReactElement => {
  return (
    <div className={'loader'}>
      <Spin indicator={<LoadingOutlined className={'loader-image'} />} />
    </div>
  );
};
