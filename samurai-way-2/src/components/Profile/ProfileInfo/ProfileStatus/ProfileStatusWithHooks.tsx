import { FC, useEffect, useState } from 'react';

type PropsType = {
  status: string;
  updateUserStatus: (status: string) => void;
};

const ProfileStatusWithHooks: FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState('');

  const onStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.currentTarget.value);
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const toggleEditMode = (isEdit: boolean) => {
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
