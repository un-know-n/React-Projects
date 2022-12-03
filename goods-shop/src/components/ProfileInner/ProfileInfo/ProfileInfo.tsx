import { Box, Button, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoExitOutline } from 'react-icons/io5';

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useUserAuth } from '../../../hooks/useUserAuth';
import defaultUserImg from './../../../assets/images/default-user.png';
import c from './../ProfileInner.module.scss';

const ProfileInfo = () => {
  const { auth } = useAuthContext();
  const [user, loading, error] = useAuthState(auth);

  const infoList = [
    { title: 'Name: ', desc: user?.displayName },
    { title: 'Email: ', desc: user?.email },
    { title: 'Phone: ', desc: user?.photoURL },
    { title: 'Status: ', desc: 'Customer' },
    { title: 'Discount: ', desc: '10%' },
  ];

  return (
    <>
      <div className='profile__info flex flex-col w-auto items-center p-6'>
        <div className='info__image w-44 mb-8'>
          <img
            src={defaultUserImg}
            alt='User image'
          />
        </div>
        <div className='info__button block m-auto'>
          <Button
            rightIcon={<IoExitOutline color='white' />}
            colorScheme='red'
            variant='solid'>
            Sign Out
          </Button>
          <button className='logout__button'></button>
        </div>
        {/* <ul className='info__list mt-5'>
          {infoList.map((info) => (
            <li
              key={info.title}
              className='list__item p-1 border-2 border-b-0 border-slate-600'>
              {info.title}
              {info.desc}
            </li>
          ))}
        </ul> */}
        <div className='info__description w-full p-3 border rounded-2xl border-slate-600 mt-5'>
          <Stack
            className=' w-full'
            divider={<StackDivider />}
            spacing='1'>
            {infoList.map((info) => (
              <>
                <Box className='flex items-baseline justify-between'>
                  <Heading
                    size='xs'
                    textTransform='uppercase'>
                    {info.title}
                  </Heading>
                  <Text
                    pt='2'
                    fontSize='sm'
                    className='text-ellipsis truncate overflow-hidden ml-7'>
                    {info.desc}
                  </Text>
                </Box>
              </>
            ))}
          </Stack>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
