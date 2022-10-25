export type ValidatorType = (value: string) => string | undefined;

export const requiredField: ValidatorType = (value) => {
  if (value) return undefined;
  return 'Field is required';
};

export const maxField = (maxValue: number): ValidatorType => {
  return (value) => {
    if (value && value.length < maxValue) return undefined;
    return `Out of maximum field size - ${maxValue} symbols`;
  };
};

export const minField = (minValue: number): ValidatorType => {
  return (value) => {
    if (value && value.length > minValue) return undefined;
    return `Minimum symbols in the field - ${minValue}`;
  };
};
