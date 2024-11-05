"use client";

import uuid from "react-uuid";

import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/index";
import { switchTheIndex } from "@/store/currentIndexSlice";
import { swiperBreakpoints } from "@/data/swiperBreakpoints";

import { Swiper as SwiperClass } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./page.module.scss";

import { PaginationCircle } from "@/components/PaginationCircle";
import { PaginationLine } from "@/components/PaginationLine";
import { YearElement } from "@/components/YearElement";
import { NavigatorArrow } from "@/components/NavigatorArrow";
import { SlideElement } from "@/components/SlideElement";

import { changeSwiperInfo } from "@/utils/utils";
import { IDatesOfYears, IPrevState, ISwiperState, TSlide } from "@/types/types";

const Main: FC<IDatesOfYears> = () => {
  
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.data);
  const currentIndex = useSelector(
    (state: RootState) => state.currentIndex.currentIndex
  );
  
  const swiperRef = useRef<SwiperRef>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [pageWidth] = useState(getInnerWidth());
  const [slideHash] = useState(uuid().slice(-6));
  
  const [prevYears, setPrevYears] = useState<IPrevState>();
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [swiperState, setSwiperState] = useState<ISwiperState>({
    isBegin: true,
    isEnd: false,
  });
  

  const dispatchCurrentIndex = (index: number) => {
    dispatch(switchTheIndex(index));
  };

  useEffect(() => {
    if (swiperRef?.current?.swiper) {
      setSwiper(swiperRef.current.swiper);
    }
  }, [swiperRef]);

  useEffect(() => {
    setPrevYears({
      startYear: data[currentIndex].startYear,
      endYear: data[currentIndex].endYear,
    });
    changeSwiperInfo(slideHash);
  }, [currentIndex, data]);


  return (
    <div className={`${styles.grid_container}`}>
      <div className={styles.container} ref={gridRef}>
        {pageWidth > 820 ? (
          <PaginationCircle
            data={data}
            currentIndex={currentIndex}
            setCurrentIndex={dispatchCurrentIndex}
            gridRef={gridRef}
          />
        ) : (
          <div className={styles.pagination_container}>
            <PaginationLine
              data={data}
              currentIndex={currentIndex}
              setCurrentIndex={dispatchCurrentIndex}
            />
          </div>
        )}
        <div className={styles.content}>
          <h1 className={styles.title}>Исторические даты</h1>
          <YearElement
            startYear={data[currentIndex].startYear}
            endYear={data[currentIndex].endYear}
            prevStartYear={
              typeof prevYears?.startYear === "string"
                ? prevYears.startYear
                : "0"
            }
            prevEndYear={
              typeof prevYears?.endYear === "string" ? prevYears.endYear : "0"
            }
          />
        </div>
        <span className={styles.line}></span>
        <div className={styles.navigation}>
          <NavigatorArrow
            currentIndex={currentIndex}
            dataLength={data.length}
            setCurrentIndex={dispatchCurrentIndex}
          />
        </div>
        <div className={styles.swiper}>
          <button
            className={`swiper-button-prev ${
              swiperState.isBegin ? "disable" : ""
            }`}
            onClick={() => {
              if (swiper) {
                swiper.slidePrev();
              }
            }}
          ></button>
          <Swiper
            ref={swiperRef}
            slidesPerView={1.4}
            spaceBetween={25}
            modules={[Navigation]}
            className="my_swiper"
            onSlideChange={() => {
              swiper?.update();
              if (swiper) {
                setSwiperState({
                  isEnd: swiper.isEnd,
                  isBegin: swiper.isBeginning,
                });
              }
            }}
            breakpoints={swiperBreakpoints}
          >
            <>
              {data[currentIndex].info.map(
                (
                  dataItem: Pick<TSlide, "title" | "description">,
                  index: number
                ) => (
                  <SwiperSlide key={index}>
                    <SlideElement
                      title={dataItem.title}
                      description={dataItem.description}
                      slideHash={slideHash}
                    />
                  </SwiperSlide>
                )
              )}
            </>
          </Swiper>
          <button
            className={`swiper-button-next ${
              swiperState.isEnd ? "disable" : ""
            }`}
            onClick={() => {
              if (swiper) {
                swiper.slideNext();
              }
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export const getInnerWidth = () => window.innerWidth;

export default Main;
