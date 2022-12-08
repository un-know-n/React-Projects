//Shows amount of stars, depending on ceiled rate
export const returnStars = (rate: number) => {
  const amount = Math.ceil(rate);
  return Array.from(Array(amount).keys()).map((s) => '⭐');
};
