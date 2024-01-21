import React, { useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { postFilteringAtom, showAllPostsAtom } from "../recoil";

interface IDropdownFiltering {
  path: string;
}
export default function DropdwonFiltering({ path }: IDropdownFiltering) {
  const [seed, setSeed] = useState(1);
  const setPostFilter = useSetRecoilState(postFilteringAtom);
  const resetFilter = useResetRecoilState(postFilteringAtom);
  const setShowAllPost = useSetRecoilState(showAllPostsAtom);

  const reset = () => {
    setSeed(Math.random());
    resetFilter();
    setShowAllPost(true);
  };

  const selectTag1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPostFilter((prev) => {
      return {
        ...prev,
        tag1: value,
      };
    });

    setShowAllPost(false);
  };
  const selectTag2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPostFilter((prev) => {
      return {
        ...prev,
        tag2: value,
      };
    });

    setShowAllPost(false);
  };

  return (
    <div
      className="flex items-center sm:flex-col sm:gap-y-2 md:flex-row md:gap-x-2"
      key={seed}
    >
      {path === "/" && (
        <div>
          <div className="flex gap-x-3">
            <select
              className="select select-primary w-full max-w-xs "
              disabled
            ></select>

            <select
              className="select select-primary w-full max-w-xs"
              disabled
            ></select>
          </div>
        </div>
      )}
      {path === "/free" && (
        <div>
          <div className="flex gap-x-3">
            <select
              onChange={selectTag1}
              defaultValue={"유형"}
              className="select select-primary w-1/2 max-w-xs "
            >
              <option disabled>유형</option>
              <option value={"질문"}>질문</option>
              <option value={"정보"}>정보</option>
            </select>

            <select
              onChange={selectTag2}
              defaultValue={"리그"}
              className="select select-primary w-10/12 max-w-xs"
            >
              <option disabled>리그</option>
              <option value={"국가대표"}>국가대표</option>
              <option value={"K-리그"}>K-리그</option>
              <option value={"EPL"}>EPL</option>
              <option value={"라리가"}>라리가</option>
              <option value={"세리에 A"}>세리에 A</option>
              <option value={"분데스리가"}>분데스리가</option>
              <option value={"리그앙"}>리그앙</option>
            </select>
          </div>
        </div>
      )}

      {path === "/morning-soccer" && (
        <div>
          <div className="flex gap-x-3">
            <select
              onChange={selectTag1}
              defaultValue={"지역"}
              className="select select-primary w-1/2 max-w-xs"
            >
              <option disabled>지역</option>
              <option value={"수성구"}>수성구</option>
              <option value={"북구"}>북구</option>
              <option value={"동구"}>동구</option>
              <option value={"중구"}>중구</option>
            </select>

            <select
              onChange={selectTag2}
              defaultValue={"포지션"}
              className="select select-primary w-1/2 max-w-xs"
            >
              <option disabled>포지션</option>
              <option value={"GK"}>GK</option>
              <option value={"DF"}>DF</option>
              <option value={"MF"}>MF</option>
              <option value={"FW"}>FW</option>
            </select>
          </div>
        </div>
      )}
      <button onClick={reset} className="btn btn-outline sm:btn-sm md:mr-2">
        필터링 초기화
      </button>
    </div>
  );
}
