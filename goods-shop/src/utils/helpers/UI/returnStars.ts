/**
 * Shows amount of stars, depending on ceiled rate
 *
 * @param rate - number of stars
 * @returns Array of the stars to output
 */
export const returnStars = (rate: number) => {
  const amount = Math.ceil(rate);
  return Array.from(Array(amount).keys()).map((s) => '⭐');
};
