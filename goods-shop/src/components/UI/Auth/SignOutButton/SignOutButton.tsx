import { Button } from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { signOut } from 'firebase/auth';
import React, { FC } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '../../../../hooks/useAuthContext';
import { Routes } from '../../../../routes';
import { takeAuthError } from '../../../../utils/helpers/authErrors';

type TProps = {
  title: string;
};

const SignOutButton: FC<TProps> = ({ title }) => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        navigate(Routes.Home);
      })
      .catch((error: FirebaseError) => {
        const errorMessage = takeAuthError(error.code);
        toast.error(`Error: ${errorMessage ?? error.code}!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
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
