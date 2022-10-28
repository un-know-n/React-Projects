import { FC } from 'react';

import { ContactsType, ProfileType } from '../../../../shared/types/reducer-types';
import classes from '../ProfileInfo.module.css';

type TProps = {
  profile: ProfileType;
  setEditMode: any;
};

export type TContact = {
  contactTitle: string;
  contactValue: string | null;
};

const ProfileData = (props: TProps) => {
  return (
    <div className={classes.descriptionBlock}>
      <div>
        <b>My name: </b>
        {props.profile.fullName}
      </div>
      {props.profile.lookingForAJob && (
        <>
          <div>
            <b>Looking for a job: </b>
            {props.profile.lookingForAJob ? <p>yes</p> : <p>no</p>}
          </div>
          <div>
            <b>My skills: </b>
            {props.profile.lookingForAJobDescription}
          </div>
        </>
      )}
      <div>
        <b>About me: </b>
        {props.profile.aboutMe}
      </div>
      <Contacts contacts={props.profile.contacts} />
      <button onClick={props.setEditMode}>Edit data</button>
    </div>
  );
};

export const Contacts = (props: Pick<ProfileType, 'contacts'>) => {
  return (
    <>
      <div>
        <b>contacts: </b>
        {Object.keys(props.contacts).map((key) => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={props.contacts[key as keyof ContactsType]} // TODO: See detailed explanation
          />
        ))}
      </div>
    </>
  );
};

const Contact: FC<TContact> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}: </b> <p>{contactValue}</p>
    </div>
  );
};

export default ProfileData;
