import classes from '../ProfileInfo.module.css';
import { Field, reduxForm } from 'redux-form';
import { FormControlElement } from '../../../common/FormsControls/FormsControls';

const Input = FormControlElement('input');

const ProfileDataForm = (props) => {
  return (
    <>
      {props.error ? <div className={classes.error}>{props.error}</div> : ''}
      <form onSubmit={props.handleSubmit}>
        <div className={classes.fullName}>
          <b>My name: </b>
          <Field
            component={Input}
            type='text'
            name='fullName'
            label='Your name'
          />
        </div>
        <div>
          <b>About me: </b>
          <Field
            component={Input}
            type='text'
            label='About me'
            name='aboutMe'
          />
        </div>
        <div>
          <b>Looking for a job: </b>
          <Field component={Input} type='checkbox' name='lookingForAJob' />
        </div>
        <div>
          <b>My skills: </b>
          <Field
            component={Input}
            type='text'
            name='lookingForAJobDescription'
            label='Your skills'
          />
        </div>

        <Contacts contacts={props.profile.contacts} />
        <button type='submit'>Save data</button>
      </form>
    </>
  );
};

const ProfileDataFormRedux = reduxForm({
  form: 'edit-profile',
})(ProfileDataForm);

export const Contacts = (props) => {
  return (
    <>
      <div>
        <b>contacts: </b>
        {Object.keys(props.contacts).map((key) => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={props.contacts[key]}
          />
        ))}
      </div>
    </>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  const title = JSON.stringify(contactTitle);
  console.log(title);
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
