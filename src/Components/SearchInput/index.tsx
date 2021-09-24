import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './styles.scss';

type Props = {
  placeholder: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ placeholder, onChange }: Props): React.ReactElement => {
  return (
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      onChange={(e) => {
        onChange(e.target.value.toLowerCase().trim());
      }}
    />
  );
};
