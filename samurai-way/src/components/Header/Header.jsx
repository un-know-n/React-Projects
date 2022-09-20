import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <img src="./images/header-logo.png" alt="header-logo" />
    </header>
  );
};

export default Header;
