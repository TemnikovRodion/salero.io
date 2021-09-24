const getFormattedDay = (value: number): string => {
  const valueRemind = Math.abs(value) % 100;
  const valueRemind1 = value % 10;
  if (valueRemind > 10 && valueRemind < 20) return `${value} дней`;
  if (valueRemind1 > 1 && valueRemind1 < 5) return `${value} дня`;
  if (valueRemind1 == 1) return `${value} день`;
  return `${value} дней`;
}; // getFormattedDay

export const stringUtils = {
  getFormattedDay,
};
