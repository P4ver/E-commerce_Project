import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css';
import { Pagination, Autoplay } from 'swiper/modules';

import conv1 from "./images/car-key.jpg"
import conv2 from "./images/black-gift.jpg"
import conv3 from "./images/modern-stationary.jpg"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Slide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      {/* <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{
            delay: 2000,
            disableOnInteraction: false, // Keeps autoplay active even after user interaction
          }}
      > */}
            {/* <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={conv1} alt="Car key" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={conv2} alt="Car key" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={conv3} alt="Car key" />
        </SwiperSlide>
        <SwiperSlide>
          slide
        </SwiperSlide>
      </Swiper> */}
      <div className="slider-container border" style={{ width: "100%", margin: "auto" }}>
      <Slider {...settings}>
        <div className='h-28 bg-white'>
          <h3>1</h3>
        </div>
        <div className='h-28 bg-white'>
          <h3>2</h3>
        </div>
        <div className='h-28 bg-white'>
          <h3>3</h3>
        </div>
        <div className='h-28 bg-white'>
          <h3>4</h3>
        </div>
        <div className='h-28 bg-white'>
          <h3>5</h3>
        </div>
        <div className='h-28 bg-white'>
          <h3>6</h3>
        </div>
      </Slider></div>
    </>
  );
}
