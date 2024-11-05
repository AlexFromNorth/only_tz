import { FC } from "react";
import styles from "./SlideElement.module.scss";
import { TSlide } from "@/types/types";

export const SlideElement: FC<TSlide> = ({ title, description, slideHash }) => {
  return (
    <article className={`slide_${slideHash}`}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </article>
  );
};
