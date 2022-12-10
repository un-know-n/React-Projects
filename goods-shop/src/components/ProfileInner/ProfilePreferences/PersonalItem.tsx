import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useRef } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

import c from './PersonalItem.module.scss';

type TProps = {
  title: string;
  inner: string | null | undefined;
  callback: (value: string) => void;
};

const PersonalItem: FC<TProps> = ({ inner, title, callback }) => {
  const inputRef = useRef<any>();

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup
        justifyContent='center'
        size='sm'>
        <IconButton
          aria-label='Confirm editing'
          icon={<AiOutlineCheckCircle />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label='Close editing'
          icon={<AiOutlineCloseCircle />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton
          aria-label='Edit text'
          size='sm'
          icon={<BiEdit />}
          onClick={() => console.log(inputRef.current)}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  };

  return (
    <>
      <div className={c.wrapper}>
        <Editable
          onSubmit={(value: string) => callback(value)}
          className='truncate'
          textAlign='center'
          defaultValue={inner || 'None...'}
          fontSize='md'
          isPreviewFocusable={false}>
          <div className={c.personal__group}>
            <h4 className='text-lg truncate '>{title}</h4>
            <EditableControls />
          </div>
          <EditablePreview />
          {/* Here is the custom input */}
          <Input
            ref={inputRef}
            as={EditableInput}
          />
        </Editable>
      </div>
    </>
  );
};

export default PersonalItem;
