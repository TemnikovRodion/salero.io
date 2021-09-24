import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button as AntdButton } from 'antd';
import './styles.scss';

type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

export const DownloadButton = ({ text, onClick, disabled }: Props): React.ReactElement => {
  return (
    <AntdButton type={'primary'} icon={<DownloadOutlined />} onClick={onClick} disabled={disabled} block>
      {text}
    </AntdButton>
  );
};
