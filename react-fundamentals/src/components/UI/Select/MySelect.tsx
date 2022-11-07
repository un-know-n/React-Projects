import React, { FC } from 'react';

type Option = { value: string | number; name: string };

type Props = {
  options: Option[];
  defaultValue: string;
  value: string | number;
  onChange: (value: any) => void;
};

export const MySelect: FC<Props> = ({
  options,
  defaultValue,
  value,
  onChange,
}) => {
  return (
    <div>
      <hr style={{ margin: '15px 0' }} />
      <select
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      >
        <option disabled value="">
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <hr style={{ margin: '15px 0' }} />
    </div>
  );
};
