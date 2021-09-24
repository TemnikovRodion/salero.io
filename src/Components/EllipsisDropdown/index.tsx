import React from 'react';
import { Dropdown } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './styles.scss';

type Props = {
  placement: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  menu: JSX.Element;
};

export const EllipsisDropdown = ({ placement, menu }: Props): React.ReactElement => {
  return (
    <Dropdown overlay={menu} placement={placement} trigger={['click']}>
      <div className="ellipsis-dropdown">
        <EllipsisOutlined className="ellipsis-dropdown-icon" />
      </div>
    </Dropdown>
  );
};
