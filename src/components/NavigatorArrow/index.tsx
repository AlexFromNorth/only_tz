import { FC, useState } from "react";

import styles from "./NavigatorArrow.module.scss";

import { ButtonDestination, INavigationPagination } from "@/types/types";

import { ButtonArrow } from "../ButtonArrow";
import { getInnerWidth } from "@/app/page";

export const NavigatorArrow: FC<INavigationPagination> = ({
  dataLength,
  currentIndex,
  setCurrentIndex,
}) => {
  const isMaxIndex = currentIndex === dataLength - 1;
  const isMinIndex = currentIndex === 0;
  const [isDisabled, setIsDisabled] = useState(false);

  const onButtonClick = (buttonDestination: ButtonDestination) => {
    if (buttonDestination === ButtonDestination.PREV && !isMinIndex) {
      setCurrentIndex(buttonDestination);
    } else if (buttonDestination === ButtonDestination.NEXT && !isMaxIndex) {
      setCurrentIndex(buttonDestination);
    }

    if (getInnerWidth() >= 821) {
      setIsDisabled(true);
      setTimeout(() => setIsDisabled(false), 800);
    }
  };

  return (
    <>
      <span className={styles.counter}>
        {`${(currentIndex + 1).toString().padStart(2, "0")}/${dataLength
          .toString()
          .padStart(2, "0")}`}
      </span>
      <div className={styles.nav_buttons_container}>
        <button
          className={`${styles.btn} ${isMinIndex ? styles.btn__disable : ""}`}
          onClick={() => onButtonClick(ButtonDestination.PREV)}
          disabled={isDisabled || isMinIndex} 
        >
          <ButtonArrow isActive={isMinIndex} direction="left" />
        </button>
        <button
          className={`${styles.btn} ${isMaxIndex ? styles.btn__disable : ""}`}
          onClick={() => onButtonClick(ButtonDestination.NEXT)}
          disabled={isDisabled || isMaxIndex} 
        >
          <ButtonArrow isActive={isMaxIndex} direction="right" />
        </button>
      </div>
    </>
  );
};
