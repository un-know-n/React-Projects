import { Box, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React, { FC } from 'react';

import { useTypedSelector } from '../../../store/hooks/useTypedSelector';
import { takeUser } from '../../../store/selectors/user.selector';
import SignOutButton from '../../UI/Auth/SignOutButton/SignOutButton';
import defaultUserImg from './../../../assets/images/default-user.png';

type TProps = {
  user: User;
};

const ProfileInfo: FC<TProps> = ({ user }) => {
  const reduxUser = useTypedSelector(takeUser);

  const infoList = [
    { title: 'Name: ', desc: reduxUser.username },
    { title: 'Email: ', desc: reduxUser.email },
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
          <SignOutButton title='Sign Out' />
        </div>
        <div className='info__description w-full p-3 border rounded-2xl border-slate-600 mt-5'>
          <Stack
            className=' w-full'
            divider={<StackDivider />}
            spacing='1'>
            {infoList.map((info) => (
              <Box
                className='flex items-baseline justify-between'
                key={info.title}>
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
            ))}
          </Stack>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
