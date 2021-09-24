import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import { Title } from '../_Common';
import moment from 'moment';
import { DateFilterType } from '@/Models/Types';
import { DateFormats } from '@/Constants/DateFormats';
import './styles.scss';

type Props = {
  title: string;
  disabled?: boolean;
  value?: DateFilterType;
  onChange: (value: [string, string]) => void;
};

export const DateRangePicker = ({
  title,
  disabled,
  value = {
    date_from: moment().format(),
    date_to: moment().format(),
  },
  onChange,
}: Props): React.ReactElement => {
  // Date values
  const [startDate, setStartDate] = useState<string | null>();
  const [endDate, setEndDate] = useState<string | null>();

  useEffect(() => {
    if (startDate && endDate) {
      console.log(startDate, endDate);
      onChange([startDate, endDate]);
      setStartDate(null);
      setEndDate(null);
    } // if
  }, [startDate, endDate]);

  return (
    <div className={'date-range-picker-wrapper'}>
      <Title level={4}>{title}</Title>

      <DatePicker.RangePicker
        disabled={disabled}
        value={[moment(value.date_from), moment(value.date_to)]}
        disabledDate={(current) => current > moment()}
        onCalendarChange={(dateStrings, info, rangeInfo) => {
          if (rangeInfo.range === 'start') setStartDate(dateStrings?.[0]?.format(DateFormats.RequestDateFormat));
          if (rangeInfo.range === 'end') setEndDate(dateStrings?.[1]?.format(DateFormats.RequestDateFormat));
        }}
        inputReadOnly={true}
        clearIcon={false}
        suffixIcon={false}
        separator={'-'}
        format={DateFormats.TextDateFormat}
        className={'date-range-picker'}
      />
    </div>
  );
};
