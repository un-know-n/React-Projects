import { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { ContactsType, ProfileType } from '../../../../shared/types/reducer-types';
import { createField, Input } from '../../../common/FormsControls/FormsControls';
import classes from '../ProfileInfo.module.css';
import { TContact } from './ProfileData';

type TProps = {
  profile: ProfileType;
};

export type TProfileInfoFormValues = {
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
};

type TProfileInfoFormValuesKeys = Extract<keyof TProfileInfoFormValues, string>;

const ProfileDataForm: FC<InjectedFormProps<ProfileType, TProps> & TProps> = (
  props,
) => {
  return (
    <>
      {props.error ? <div className={classes.error}>{props.error}</div> : ''}
      <form onSubmit={props.handleSubmit}>
        <div className={classes.fullName}>
          <b>My name: </b>
          {createField<TProfileInfoFormValuesKeys>(
            'Your name',
            'fullName',
            [],
            Input,
            {},
          )}
        </div>
        <div>
          <b>About me: </b>
          {createField<TProfileInfoFormValuesKeys>(
            'About me',
            'aboutMe',
            [],
            Input,
            {},
          )}
        </div>
        <div>
          <b>Looking for a job: </b>
          {createField<TProfileInfoFormValuesKeys>(
            '',
            'lookingForAJob',
            [],
            Input,
            { type: 'checkbox' },
          )}
        </div>
        <div>
          <b>My skills: </b>
          {createField<TProfileInfoFormValuesKeys>(
            'Your skills',
            'lookingForAJobDescription',
            [],
            Input,
            {},
          )}
        </div>

        <Contacts contacts={props.profile.contacts} />
        <button type='submit'>Save data</button>
      </form>
    </>
  );
};

const ProfileDataFormRedux = reduxForm<ProfileType, TProps>({
  form: 'edit-profile',
})(ProfileDataForm);

export const Contacts = (props: Pick<ProfileType, 'contacts'>) => {
  return (
    <>
      <div>
        <b>contacts: </b>
        {Object.keys(props.contacts).map((key) => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={props.contacts[key as keyof ContactsType]}
          />
        ))}
      </div>
    </>
  );
};

const Contact: FC<TContact> = ({ contactTitle, contactValue }) => {
  const title = JSON.stringify(contactTitle);
  // console.log(title);
  return (
    <div>
      <b>{contactTitle}: </b>
      <Field
        component={Input}
        type='text'
        label={contactTitle}
        name={`contacts.${title}`}
      />
    </div>
  );
};

export default ProfileDataFormRedux;
