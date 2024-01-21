import React from "react";
import DropdwonFiltering from "./FilteringPosts";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { inputAtom } from "../recoil";

export default function Tools() {
  // const filterValue = useRecoilValue<IpostFilteringAtom>(postFilteringAtom);
  // console.log(filterValue)

  const [keyword, setKeyword] = useRecoilState(inputAtom);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const moveTab = (e: React.MouseEvent<HTMLSpanElement>) => {
    const value = e.currentTarget.innerText;
    if (value === "자유") {
      navigate("free");
    } else {
      navigate("morning-soccer");
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  return (
    <div className=" flex flex-col gap-y-5">
      <div className="flex gap-x-5 sm:text-base md:text-2xl lg:text-3xl">
        <span
          onClick={moveTab}
          className={`cursor-pointer  ${
            pathname === "/free" ? "text-green-600" : ""
          }`}
        >
          자유
        </span>
        <span
          onClick={moveTab}
          className={`cursor-pointer  ${
            pathname === "/morning-soccer" ? "text-green-600" : ""
          }`}
        >
          조기 축구 모집
        </span>
      </div>
      <div className="flex sm:flex-col sm:gap-y-3 sm:items-center md:flex-row md:justify-between">
        <DropdwonFiltering path={pathname} />
        <input
          value={keyword}
          onChange={handleKeywordChange}
          type="text"
          placeholder="검색"
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
    </div>
  );
}
