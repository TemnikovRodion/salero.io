export enum ChartUnit {
  Rubles = 'rubles',
  Units = 'units',
  Goods = 'goods',
  Redemption = 'redemption',
}

export const useAnalyticChartUnits = () => {
  return [
    { key: ChartUnit.Rubles, value: 'Рубли' },
    { key: ChartUnit.Goods, value: 'Товары' },
    { key: ChartUnit.Redemption, value: '% выкупа' },
  ];
};

export const useOrderFeedChartUnits = () => {
  return [
    { key: ChartUnit.Rubles, value: 'Рубли' },
    { key: ChartUnit.Units, value: 'Штуки' },
  ];
};
