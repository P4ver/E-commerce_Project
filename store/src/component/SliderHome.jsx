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
export default function SliderHome() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      <div className="slider-container border" style={{ width: "100%", margin: "auto" }}>
      <Slider {...settings}>
        <div className='h-96 bg-white'>
          <h3>1</h3>
        </div>
        <div className='h-96 bg-white'>
          <h3>2</h3>
        </div>
        <div className='h-96 bg-white'>
          <h3>3</h3>
        </div>
        <div className='h-96 bg-white'>
          <h3>4</h3>
        </div>
      </Slider></div>
    </>
  );
}
