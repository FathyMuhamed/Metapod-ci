export const formatAsCurrency = (value: number) => {
  const valueIndollars = value / 100;
  return `$${valueIndollars.toFixed(2)}`;
};
