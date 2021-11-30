import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './AwesomeSwiper.module.css';
import { BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs';

// import Swiper core and required modules
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Scrollbar,
  A11y,
  Navigation,
  Thumbs,
  Autoplay,
  Keyboard
} from 'swiper';
import { MdSwipe } from 'react-icons/md';

// install Swiper modules
// SwiperCore.use([
//   EffectCoverflow,
//   Pagination,
//   Keyboard,
//   Navigation,
//   Scrollbar,
//   A11y,
//   Autoplay
// ]);

export default function AwesomeSwiper({ children }) {
  // const [showOverlay, setShowOverlay] = useState(true)

  // bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]
  return (
    <div
      className={`${styles.wtf} 
      shadow-lg rounded-xl w-full 
      bg-white dark:bg-black border border-1 border-gray-200 dark:border-gray-800 
      `}
    >
      <div className="rounded-xl relative">
        {/* <div
          onClick={() => setShowOverlay(false)}
          className={
            `${showOverlay ? 'flex' : 'hidden' } justify-center items-center w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 z-10 text-[60px] md:hidden`
          }
        >
          <span className="text-white">
            <MdSwipe />
          </span>
        </div> */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={-20}
          createElements
          loop
          autoplay={{
            delay: 5000,
          }}
          slidesPerView={1}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            disabledClass: "hidden",
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          // scrollbar={{ draggable: true }}
          className={`${styles.swiper}`}
          modules={[
            EffectCoverflow,
            Pagination,
            Keyboard,
            Navigation,
            Scrollbar,
            A11y,
            Autoplay,
          ]}
        >
          {children.map((slide, idx) => (
            <div key={idx}>
              <SwiperSlide className={styles.swiperSlide}>{slide}</SwiperSlide>
            </div>
          ))}
          <div
            className={`swiper-button-prev ${styles.swiperButtonPrev}  duration-300`}
          >
            <svg
              className="w-[50px] rotate-180 text-gray-500 transition-colors duration-300 group-hover:text-deep-purple-accent-400"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
          </div>
          <div
            className={`swiper-button-next ${styles.swiperButtonNext}  duration-300`}
          >
            <svg
              className="w-[50px] text-gray-500 transition-colors duration-300 group-hover:text-deep-purple-accent-400"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
          </div>
          <div className="swiperPagination"></div>
        </Swiper>
      </div>
    </div>
  );
}
