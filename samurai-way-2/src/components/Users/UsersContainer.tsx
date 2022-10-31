import React, { FC } from 'react';
import { ComponentType } from 'react';
import { useSelector } from 'react-redux';

import { getIsFetching } from '../../redux/selectors/users-selectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

type TProps = {
  outerTitle: string;
};

const UsersPage: FC<TProps> = (props) => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      {isFetching ? <Preloader /> : null}
      <h2>{props.outerTitle}</h2>
      <Users />
    </>
  );
};

export default UsersPage;
