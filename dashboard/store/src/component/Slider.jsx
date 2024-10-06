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


export default function Slide() {
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
            <Swiper
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
      </Swiper>
    </>
  );
}
