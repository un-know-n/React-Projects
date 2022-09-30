import { useMatch } from 'react-router-dom';

export const withRouter = (Component) => {
  let RouterContainer = (props) => {
    const match = useMatch('/profile/:userId');
    return <Component {...this.props} param={match} />;
  };
  return RouterContainer;
};
