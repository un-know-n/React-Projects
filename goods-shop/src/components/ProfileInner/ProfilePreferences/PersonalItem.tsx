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
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

import c from './PersonalItem.module.scss';

type TProps = {
  title: string;
  inner: string | null | undefined;
};

const PersonalItem: FC<TProps> = ({ inner, title }) => {
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
          {...getEditButtonProps()}
        />
      </Flex>
    );
  };

  return (
    <>
      <div className={c.wrapper}>
        <Editable
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
          <Input as={EditableInput} />
        </Editable>
      </div>
    </>
  );
};

export default PersonalItem;
