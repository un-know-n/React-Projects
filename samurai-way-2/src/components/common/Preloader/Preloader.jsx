import preloaderGif from './../../../assets/images/loader.gif';
import classes from './Preloader.module.css';

const Preloader = () => {
  return (
    <div className={classes.preloaderWrapper}>
      <img src={preloaderGif} alt='' />
    </div>
  );
};

export default Preloader;
