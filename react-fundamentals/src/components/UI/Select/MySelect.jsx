import React from 'react';

export const MySelect = ({ options, defaulValue, value, onChange }) => {
  return (
    <div>
      <hr style={{ margin: '15px 0' }} />
      <select
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      >
        <option disabled value="">
          {defaulValue}
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
