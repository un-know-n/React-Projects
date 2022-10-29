import { create } from 'react-test-renderer';

import ProfileStatusWithHooks from './../../../../../components/Profile/ProfileInfo/ProfileStatus/ProfileStatusWithHooks';

describe('Profile component', () => {
  test('profile status from props should be in the state', async () => {
    const component = create(
      <ProfileStatusWithHooks
        status='I am fine'
        updateUserStatus={function (status: string): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const instance = component.getInstance();
    //@ts-ignore
    expect(instance.state.status).toBe('I am fine');
  });
  test('profile status should have the span element', async () => {
    const component = create(
      <ProfileStatusWithHooks
        status='I am fine'
        updateUserStatus={function (status: string): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const root = component.root;
    let span = await root.findByType('span');
    expect(span.children.length).toBe(1);
  });
  test('input should be displayed instead of span', async () => {
    const component = create(
      <ProfileStatusWithHooks status='I am fine' updateUserStatus={() => {}} />,
    );
    const root = component.root;
    let span = await root.findByType('span');
    span.props.onDoubleClick();
    let input = await root.findByType('input');
    expect(input.props.value).toBe('I am fine');
  });
  test('callback should be called', async () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatusWithHooks
        status='I am fine'
        updateUserStatus={() => {
          mockCallback();
        }}
      />,
    );
    const instance = component.getInstance();
    //@ts-ignore
    instance.toggleEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});

// describe('Profile status component', () => {
//   test('Status from props should be in state', () => {
//     const testStatusStr = 'Test status';
//     const component = TestRenderer.create(<ProfileStatus profileStatus={testStatusStr}/>);
//     let statusInSpan = component.toJSON().children[0].children[1]
//     expect(statusInSpan).toBe(testStatusStr)
//   })
// })

// class ProfileStatus extends Component {
//   state = {
//     editMode: false,
//     status: this.props.status,
//   };
//
//   toggleEditMode = (isEdit) => {
//     this.setState({
//       editMode: isEdit,
//     });
//     this.props.updateUserStatus(this.state.status);
//   };
//
//   onStatusChange = (e) => {
//     this.setState({
//       status: e.currentTarget.value,
//     });
//   };
//
//   componentDidUpdate(prevProps, prevState) {
//     //If current status from server !== old status from server -> rewrite local state
//     if (prevProps.status !== this.props.status) {
//       this.setState({
//         status: this.props.status,
//       });
//     }
//   }
//
//   render() {
//     return (
//       <div>
//         {this.state.editMode ? (
//           <div>
//             <input
//               autoFocus={true}
//               onChange={this.onStatusChange}
//               onBlur={() => {
//                 this.toggleEditMode(!this.state.editMode);
//               }}
//               value={this.state.status}
//             />
//           </div>
//         ) : (
//           <div>
//             <span
//               onDoubleClick={() => {
//                 this.toggleEditMode(!this.state.editMode);
//               }}>
//               {this.props.status || 'The user has no status'}
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
