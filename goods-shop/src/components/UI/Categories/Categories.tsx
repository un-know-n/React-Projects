import classNames from 'classnames';
import React, { useState } from 'react';

import { categories } from '../../../constants/filter';

export const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <>
      <div className='categories'>
        <ul className='m-auto'>
          {categories.map((c, i) => (
            <li
              key={c}
              className={classNames({
                active: selectedCategory === i,
              })}
              onClick={() => setSelectedCategory(i)}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
