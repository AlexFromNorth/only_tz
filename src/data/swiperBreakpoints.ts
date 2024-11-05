import { SwiperOptions } from "swiper/types";

export const swiperBreakpoints: Record<number, SwiperOptions> = {
    1200: {
      slidesPerView: 3,
      spaceBetween: 80,
    },
    820: {
      slidesPerView: 2,
      spaceBetween: 80,
    },
    650: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
    512: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
  };