import { FC, useEffect, useRef, useState } from "react";
import { Circ, gsap } from "gsap";
import uuid from "react-uuid";

import style from "./PaginationCircle.module.scss";
import { IData, IPaginationCircle } from "@/types/types";

import { getInnerWidth } from "@/app/page";
import { SmallCircle } from "../SmallCircle";

export const PaginationCircle: FC<IPaginationCircle> = ({
  data,
  currentIndex,
  setCurrentIndex,
  gridRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(getInnerWidth());
  const [pagHash] = useState(uuid().slice(-6));

  let gridElementHeight = 0;
  if (gridRef.current?.offsetHeight) {
    gridElementHeight = gridRef.current.offsetHeight;
  }

  const handleWindowSizeChange = () => setPageWidth(getInnerWidth());

  useEffect(() => {
    // create custom hook
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  // вынеси эти модули и переименую
  const getContainerTopOffset = (pageWidth: number) =>
    pageWidth <= 820
      ? 0
      : gridElementHeight * 0.4444 - (pageWidth * (53 / 192)) / 2;

  const rotatePagination = (index: number): [number, number] => {
    const Radius = (pageWidth * (53 / 192)) / 2;
    const currentPagSize = 56;
    const gridColumnWidth = pageWidth / 24;

    // Math.acos((Radius + currentPagSize - gridColumnWidth * 3 + currentPagSize / 2) / Radius)
    // Вычисление радианы смещения активной точки относительно точки (1, 0) единичной окружности
    const radian =
      index * ((2 * Math.PI) / data.length) -
      Math.acos(
        (Radius + currentPagSize - gridColumnWidth * 3 + currentPagSize / 2) /
          Radius
      );

    //   add rename
    const vectorX = Radius * Math.cos(radian) - currentPagSize / 2;
    const vectorY = Radius * Math.sin(radian) - currentPagSize / 2;

    return [vectorX + Radius, vectorY + Radius];
  };

  const rotateCircle = (length: number, index: number, pagHash: string) => {
    gsap.to(containerRef.current, {
      duration: 1.5,
      rotation: -(360 / length) * index,
      ease: Circ.easeOut,
    });

    gsap.to(`.pag_${pagHash}`, {
      duration: 1.5,
      rotation: (360 / length) * index,
      ease: Circ.easeOut,
    });
  };

  useEffect(() => {
    rotateCircle(data.length, currentIndex, pagHash);
  }, [currentIndex]);

  const getPaginationText = (dataItem: IData) =>
    dataItem.labelText ? dataItem.labelText : "";

  return (
    <div
      ref={containerRef}
      className={style.container}
      style={{ marginTop: getContainerTopOffset(pageWidth) }}
    >
      <div className={style.wrapper}>
        {data.map((dataItem, index) => {
          return (
            <SmallCircle
              key={index}
              index={index}
              setCurrentIndex={setCurrentIndex}
              currentIndex={currentIndex}
              rotatePagination={rotatePagination}
              labelText={getPaginationText(dataItem)}
              paginationHash={pagHash}
            />
          );
        })}
      </div>
    </div>
  );
};
