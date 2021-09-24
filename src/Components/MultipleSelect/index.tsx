import React, { useEffect } from 'react';
import { Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { useState } from 'react';
import './styles.scss';

type Props = {
  placeholder: string;
  disabled?: boolean;
  defaultValue?: string[];
  options: { key: string; value: string }[];
  onChange: (value: SelectValue) => void;
};

export const MultipleSelect = ({
  defaultValue,
  placeholder,
  disabled,
  options,
  onChange,
}: Props): React.ReactElement => {
  const [values, setValues] = useState<string[]>(defaultValue ?? []);
  const [isOpen, setIsOpen] = useState<boolean | number>(true);

  useEffect(() => {
    if (!isOpen) {
      onChange(values);
    } // if
  }, [isOpen]);

  useEffect(() => {
    if (defaultValue) {
      setValues(defaultValue);
    } // if
  }, [defaultValue]);

  return (
    <Select
      mode="multiple"
      placeholder={placeholder}
      showArrow
      allowClear
      className={'multiple-select'}
      disabled={disabled}
      value={values}
      onChange={(value) => setValues(value as string[])}
      onDropdownVisibleChange={(open) => setIsOpen(open)}
      onDeselect={(value) => {
        setValues(values.filter((item) => item !== value));

        if (!isOpen) {
          onChange(values.filter((item) => item !== value));
        } // if
      }}
      onClear={() => onChange([])}
    >
      {options.map((option) => (
        <Select.Option value={option.key} key={option.key}>
          {option.value}
        </Select.Option>
      ))}
    </Select>
  );
};
