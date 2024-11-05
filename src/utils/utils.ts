import { Circ, gsap } from "gsap";

export const numberChanges = (currentNumber:number, additionalNumber: number) => {
    return currentNumber + additionalNumber
}

export const changeSwiperInfo = (slideHash: string) => {
    gsap
      .timeline()
      .to(`.slide_${slideHash}`, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: Circ.easeInOut,
      })
      .to(`.slide_${slideHash}`, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: Circ.easeOut,
      });
  };