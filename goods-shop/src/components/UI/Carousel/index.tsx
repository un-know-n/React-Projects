import React, { FC, PropsWithChildren, useRef } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import SwiperClass, { Navigation } from 'swiper';
import { Swiper } from 'swiper/react';

import c from './Carousel.module.scss';

type TProps = {
  title: string;
};

const Carousel: FC<PropsWithChildren<TProps>> = ({ title, children }) => {
  //References to navigation buttons
  const nextSlideRef = useRef<HTMLButtonElement>(null);
  const prevSlideRef = useRef<HTMLButtonElement>(null);

  //Navigation object
  const navigation = {
    nextEl: nextSlideRef.current,
    prevEl: prevSlideRef.current,
  };

  //Give breakpoints to the slider
  const breakpoints = {
    320: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 0,
    },
    577: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 0,
    },
    950: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1025: {
      slidesPerGroup: 4,
      slidesPerView: 4,
      spaceBetween: 0,
    },
    1200: {
      slidesPerGroup: 5,
      slidesPerView: 5,
      spaceBetween: 0,
    },
  };

  //Setup the swiper
  const onSwiper = (swiper: SwiperClass) => {
    setTimeout(() => {
      //@ts-ignore
      swiper.params.navigation.prevEl = prevSlideRef.current;
      //@ts-ignore
      swiper.params.navigation.nextEl = nextSlideRef.current;

      //Re-initialization of navigation
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    });
  };

  return (
    <>
      <div className='carousel__top truncate flex flex-col justify-center items-center sm:flex-row sm:justify-between sm:items-end'>
        <h1 className='text-2xl font-normal'>{title}</h1>
        <div className='carousel__buttons flex mt-3 sm:mt-0'>
          <button
            className={c.slider__button}
            ref={prevSlideRef}>
            <BsChevronLeft />
          </button>
          <button
            className={c.slider__button}
            ref={nextSlideRef}>
            <BsChevronRight />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={0}
        navigation={navigation}
        onSwiper={onSwiper}
        breakpoints={breakpoints}
        preloadImages
        className='flex justify-around items-center'>
        {children}
      </Swiper>
    </>
  );
};

export default Carousel;
