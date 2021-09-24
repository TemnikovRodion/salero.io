import { ApexOptions } from 'apexcharts';
import { numberUtils } from '@/Utils';

export const defaultOptions: ApexOptions = {
  chart: {
    // Масштаб
    zoom: {
      enabled: false,
    },
    // Меню
    toolbar: {
      show: false,
    },
    // Локаль
    defaultLocale: 'ru',
    locales: [
      {
        name: 'ru',
        options: {
          months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ],
          shortMonths: ['Янв.', 'Фев.', 'Мар.', 'Апр.', 'Май', 'Июн.', 'Июл.', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек'],
          days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          shortDays: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
        },
      },
    ],
  },
  // Подписи данных
  dataLabels: {
    enabled: false,
  },
  // Настройки линии,бара и т.д.
  stroke: {
    show: true,
    width: 3,
    curve: 'smooth',
    lineCap: 'round',
  },
  // Легенда
  legend: {
    show: false,
  },
  // Подписи по Х-оси
  xaxis: {
    type: 'datetime',
    categories: [],
  },
  // Сетка
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  tooltip: {
    y: {
      formatter: (value: number) => `${numberUtils.getRoundedString(value, 0)}`,
    },
  },
};
