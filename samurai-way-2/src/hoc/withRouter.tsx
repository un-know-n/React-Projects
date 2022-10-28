import { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

export function withRouter<WCP>(WrappedComponent: ComponentType<WCP>) {
  return (props: WCP) => {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  };
}
