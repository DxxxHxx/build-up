import { useEffect } from "react";

interface IStep {
  step: number;
}
export default function Step({ step }: IStep) {
  useEffect(() => {
    const $list = document.querySelector(".steps");
    (() => {
      const itemList = Array.prototype.slice.call($list?.children);
      for (let i = 0; i < step; i++) {
        if (itemList[i] === undefined) {
          return;
        }
        itemList[i].classList.add("step-primary");
      }
    })();
  }, [step]);

  return (
    <ul
      id="steps"
      className="steps sm:w-full sm:text-sm  md:w-1/2 md:text-base -z-10"
    >
      <li className="step">글 유형</li>
      <li className="step">태그 지정</li>
      <li className="step">완료</li>
    </ul>
  );
}
