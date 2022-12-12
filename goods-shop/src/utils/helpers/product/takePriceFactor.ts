export const takePriceFactor = (
  currentOption: string,
  options: string[] | undefined,
) => (options ? options.findIndex((item) => item === currentOption) + 1 : 1);
