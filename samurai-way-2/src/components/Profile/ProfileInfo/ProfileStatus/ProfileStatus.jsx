import { Component } from 'react';

class ProfileStatus extends Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  toggleEditMode = (isEdit) => {
    this.setState({
      editMode: isEdit,
    });
    this.props.updateUserStatus(this.state.status);
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    //If current status from server !== old status from server -> rewrite local state
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.editMode ? (
          <div>
            <input
              autoFocus={true}
              onChange={this.onStatusChange}
              onBlur={() => {
                this.toggleEditMode(!this.state.editMode);
              }}
              value={this.state.status}
            />
          </div>
        ) : (
          <div>
            <span
              onDoubleClick={() => {
                this.toggleEditMode(!this.state.editMode);
              }}>
              {this.props.status || 'The user has no status'}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
