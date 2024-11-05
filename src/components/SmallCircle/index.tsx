import { FC, useEffect, useRef } from "react";
import { gsap, Sine } from "gsap";

import { ICirclePagination } from "@/types/types";
import style from "./SmallCircle.module.scss";

export const SmallCircle: FC<ICirclePagination> = ({
  index,
  currentIndex,
  setCurrentIndex,
  rotatePagination,
  labelText,
  paginationHash,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const animationElement = (duration: number) => {
    gsap.to(ref.current, {
      delay: 0.1,
      fontSize: 20,
    });
    gsap.to(ref.current, {
      duration: duration,
      opacity: 1,
      ease: Sine.easeInOut,
    });
  };

  const hideElement = () => {
    gsap.to(ref.current, {
      duration: 0.2,
      opacity: 0,
      ease: Sine.easeInOut,
    });
  };

  useEffect(() => {
    if (currentIndex === index) {
      animationElement(0.0001);
    }
  }, []);

  useEffect(() => {
    if (currentIndex === index) {
      animationElement(1);
    } else {
      hideElement();
    }
  }, [currentIndex, index]);

  return (
    <>
      <div
        className={`${style.pag_container} pag_${paginationHash}`}
        style={{
          left: rotatePagination(index)[0],
          top: rotatePagination(index)[1],
        }}
      >
        <span
          className={`${style.pag} ${
            currentIndex === index ? style.active : ""
          }`}
          onClick={() => setCurrentIndex(index)}
        >
          {index + 1}
        </span>
        <span ref={ref} className={`${style.pag_text} pag_text`}>
          {labelText}
        </span>
      </div>
    </>
  );
};
