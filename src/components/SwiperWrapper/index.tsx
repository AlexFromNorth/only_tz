import { FC, ReactNode } from "react";
import { Swiper } from "swiper/react";
import { SwiperRef } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

interface SwiperWrapperProps {
  swiperRef: React.RefObject<SwiperRef>;
  swiperState: { isBegin: boolean; isEnd: boolean };
  children: ReactNode; // Позволяет передавать детей
  onSlidePrev: () => void;
  onSlideNext: () => void;
}

const SwiperWrapper: FC<SwiperWrapperProps> = ({
  swiperRef,
  swiperState,
  children,
  onSlidePrev,
  onSlideNext,
}) => {
  return (
    <>
      <button
        className={`swiper-button-prev ${swiperState.isBegin ? "disable" : ""}`}
        onClick={onSlidePrev}
        disabled={swiperState.isBegin} 
      ></button>

      <Swiper ref={swiperRef} className="my_swiper">
        {children}
      </Swiper>

      <button
        className={`swiper-button-next ${swiperState.isEnd ? "disable" : ""}`}
        onClick={onSlideNext}
        disabled={swiperState.isEnd}
      ></button>
    </>
  );
};

export default SwiperWrapper;
