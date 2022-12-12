import { takePriceFactor } from './takePriceFactor';

export const composePrice = (
  price: number,
  currentOption: string,
  options: string[] | undefined,
) => Number((price * takePriceFactor(currentOption, options)).toFixed(1));
