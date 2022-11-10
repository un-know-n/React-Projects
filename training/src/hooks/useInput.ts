import { FormEvent, useState } from 'react';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return { value, onChange };
};
