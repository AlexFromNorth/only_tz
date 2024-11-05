import { FC } from "react";
import styles from "./PaginationLine.module.scss";
import { IPaginationLine } from "@/types/types";

export const PaginationLine: FC<IPaginationLine> = ({
  data,
  currentIndex,
  setCurrentIndex,
}) => {
  return (
    <>
      {data.map((_, index) => {
        return (
          <span
            key={index}
            className={`${styles.pag} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        );
      })}
    </>
  );
};
