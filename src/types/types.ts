// data types

import { ReactNode, RefObject } from "react";

export interface IData {
  startYear: string;
  endYear: string;
  info: Pick<TSlide, "title" | "description">[];
  labelText?: string;
}

// pages types

export interface ProvidersProps {
  children: ReactNode;
}

export interface IPrevState {
  startYear: string;
  endYear: string;
}

export interface ISwiperState {
  isBegin: boolean;
  isEnd: boolean;
}

export interface IDatesOfYears {
  data: IData[];
}

// components types

export interface IButtonArrow {
  isActive: boolean;
  direction: "left" | "right";
}

export interface INavigationPagination {
  currentIndex: number;
  dataLength: number;
  setCurrentIndex: (index: number) => void; 
}

export enum ButtonDestination {
  PREV = -1,
  NEXT = 1,
}

export interface IPaginationCircle {
  data: IData[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void; 
  gridRef: RefObject<HTMLDivElement>;
}

export interface IPaginationLine {
  data: IData[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void; 
}

export type TSlide = {
  title: string;
  description: string;
  slideHash: string;
};

export interface ICirclePagination {
  index: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void; 
  rotatePagination: (index: number) => [number, number];
  labelText: string;
  paginationHash: string;
}

export interface IYearElement {
  startYear: string;
  endYear: string;
  prevStartYear?: string;
  prevEndYear?: string;
}
