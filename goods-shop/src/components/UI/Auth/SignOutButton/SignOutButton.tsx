import { Button } from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { signOut } from 'firebase/auth';
import React, { FC } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../../hooks/useAuthContext';
import { Routes } from '../../../../routes';
import { useAppDispatch } from '../../../../store/hooks/useTypedDispatch';
import { clearCart } from '../../../../store/reducers/cart.slice';
import { clearUser } from '../../../../store/reducers/user.slice';
import { takeAuthError } from '../../../../utils/helpers/auth/authErrors';
import { errorToast } from '../../../../utils/helpers/toasts';

type TProps = {
  title: string;
};

const SignOutButton: FC<TProps> = ({ title }) => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        navigate(Routes.Home);
        dispatch(clearCart());
        dispatch(clearUser());
      })
      .catch((error: FirebaseError) => {
        const errorMessage = takeAuthError(error.code);
        errorToast(`Error occurred: ${errorMessage ?? error.code}!`);
      });
  };

  return (
    <>
      <Button
        rightIcon={<IoExitOutline color='white' />}
        colorScheme='red'
        variant='solid'
        onClick={handleClick}>
        {title}
      </Button>
    </>
  );
};

export default SignOutButton;
