import classes from './Header.module.css';
import headerLogo from '../../images/header-logo.png';

const Header = () => {
  return (
    <header className={classes.header}>
      <img src={headerLogo} alt="header-logo" />
    </header>
  );
};

export default Header;
