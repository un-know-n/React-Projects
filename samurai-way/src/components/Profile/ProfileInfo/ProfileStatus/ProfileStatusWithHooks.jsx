import { useEffect, useState } from 'react';

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState('');

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const toggleEditMode = (isEdit) => {
    setEditMode(isEdit);
    props.updateUserStatus(status);
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input
            autoFocus={true}
            onChange={onStatusChange}
            onBlur={() => {
              toggleEditMode(!editMode);
            }}
            value={status}
          />
        </div>
      ) : (
        <div>
          <span
            onDoubleClick={() => {
              toggleEditMode(!editMode);
            }}>
            {props.status || 'The user has no status'}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
