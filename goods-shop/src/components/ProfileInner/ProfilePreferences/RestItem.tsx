import React, { FC } from 'react';
import { IconType } from 'react-icons/lib';

import c from './RestItem.module.scss';

type TProps = {
  title: string;
  outerIcon: React.ReactNode | null;
  additional: null | string | number;
};

const RestItem: FC<TProps> = ({ title, outerIcon, additional }) => {
  return (
    <>
      <li className={c.item}>
        <div className={c.item__wrapper}>
          <h5>{title}</h5>
          <i>{outerIcon ?? additional}</i>
        </div>
      </li>
    </>
  );
};

export default RestItem;
