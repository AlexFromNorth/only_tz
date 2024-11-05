import { FC, useEffect, useRef } from "react";
import { Circ, gsap } from "gsap";

import styles from "./YearElement.module.scss";
import { IYearElement } from "@/types/types";

export const YearElement: FC<IYearElement> = ({
  startYear,
  endYear,
  prevStartYear,
  prevEndYear,
}) => {
  const startYearRef = useRef<HTMLSpanElement>(null);
  const endYearRef = useRef<HTMLSpanElement>(null);

  const changeYear = (
    yearRef: HTMLSpanElement | null,
    prevYear: string | undefined
  ) => {
    if (yearRef && prevYear) {
      gsap.from(yearRef, {
        textContent: prevYear,
        duration: 1.5,
        ease: Circ.easeOut,
        snap: { textContent: 1 },
      });
    }
  };

  useEffect(() => {
    changeYear(startYearRef.current, prevStartYear);
    changeYear(endYearRef.current, prevEndYear);
  }, [startYear, endYear, prevStartYear, prevEndYear]);

  return (
    <div className={styles.year_container}>
      <span ref={startYearRef} className={styles.year}>
        {startYear}
      </span>
      <span ref={endYearRef} className={styles.year}>
        {endYear}
      </span>
    </div>
  );
};
