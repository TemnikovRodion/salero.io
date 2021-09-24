import React from 'react';
import Chart from 'react-apexcharts';
import { apexAreaChartOptions, apexBarChartOptions, apexLineChartOptions } from './config';
import './styles.scss';

const colorsDescription = {
  green: '#26CD58',
  yellow: '#FDDD36',
  volcano: '#E2534A',
  gold: '#2488ff',
  purple: '#a461d8',
  orange: '#fa8c16',
  blue: '#4385f4',
  red: '#fd6d75',
};

type Props<TData extends object> = {
  series: TData[];
  colors: ('green' | 'yellow' | 'orange' | 'red' | 'blue')[];
  type: 'line' | 'bar' | 'area';
};

export const DataChart = <TData extends object>({ series, colors, type }: Props<TData>): React.ReactElement => {
  const getChartTypeDefaultOption = () => {
    switch (type) {
      case 'line':
        return apexLineChartOptions;
      case 'bar':
        return apexBarChartOptions;
      case 'area':
        return apexAreaChartOptions;
    }
  };

  const getChartColors = (): string[] => {
    const chartColors: string[] = [];

    colors.forEach((item) => {
      chartColors.push(colorsDescription[item]);
    });

    return chartColors;
  };

  return (
    <Chart
      type={type}
      series={series}
      options={{
        ...getChartTypeDefaultOption(),
        colors: getChartColors(),
      }}
      height={350}
    />
  );
};
