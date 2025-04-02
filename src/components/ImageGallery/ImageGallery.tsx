import React, { useState } from "react";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import "swiper/css";
import "./style.css";

interface ImageGalleryProps {
  images: IGatsbyImageData[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);

  return (
    <div className="swiper">
      <Swiper
        effect={"coverflow"}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <GatsbyImage key={index} image={image} alt={`Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGallery;
