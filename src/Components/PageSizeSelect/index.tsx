import React from 'react';
import { Select } from 'antd';
import './styles.scss';

type Props = {
  value?: string;
  options?: { key: string; value: string }[];
  onChange: (value: string) => void;
};

export const PageSizeSelect = ({
  value = '100',
  options = [
    { key: '100', value: 'Показывать по 100 шт.' },
    { key: '200', value: 'Показывать по 200 шт.' },
    { key: '300', value: 'Показывать по 300 шт.' },
  ],
  onChange,
}: Props): React.ReactElement => {
  return (
    <Select defaultValue={options[0].key} className={'page-size-select'} onChange={onChange}>
      {options.map((option) => (
        <Select.Option key={option.key} value={option.key}>
          {option.value}
        </Select.Option>
      ))}
    </Select>
  );
};
