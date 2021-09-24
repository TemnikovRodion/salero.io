import { ApexOptions } from 'apexcharts';
import { defaultOptions } from './DefaultConfig';

export const apexLineChartOptions: ApexOptions = {
  ...defaultOptions,
};

export const apexAreaChartOptions: ApexOptions = {
  ...defaultOptions,
};

export const apexBarChartOptions: ApexOptions = {
  ...defaultOptions,
  stroke: {
    show: false,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '30px',
      colors: {
        backgroundBarRadius: 0,
      },
    },
  },
};
