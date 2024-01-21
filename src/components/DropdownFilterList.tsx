import React, { useEffect, useState } from "react";
import {
  districtList,
  freeTypeList,
  leagueList,
  positionList,
  postTypeList,
} from "../assets/data/dropdownFilterList";
import DropdownFilter from "./DropdownFilter";
import { useSetRecoilState } from "recoil";
import { postCategoryAtom } from "../recoil";
import Step from "./Step";

interface IDropdownFilterList {
  setSubmitted: () => void;
}

export default function DropdownFilterList({
  setSubmitted,
}: IDropdownFilterList) {
  const [pick, setPick] = useState("");
  const setPostCategory = useSetRecoilState<string[]>(postCategoryAtom);
  const [showForm, setShowForm] = useState(1);
  const [cnt, setCnt] = useState(1);

  useEffect(() => {
    setPostCategory([]);
  }, [setPostCategory]);
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPick(e.currentTarget.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (pick) {
      case "자유":
        setShowForm(2);
        setPostCategory([pick]);
        setCnt((prev) => (prev += 1));
        break;
      case "조기축구 모집":
        setShowForm(3);
        setPostCategory([pick]);
        setCnt((prev) => (prev += 1));
        break;
      default:
        return;
    }
  };
  const handleSubmitFreeForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const $freeFrom = document.querySelector("#freeForm");
    const freeTag1 = $freeFrom?.getElementsByTagName("select")[0]
      .value as string;
    const freeTag2 = $freeFrom?.getElementsByTagName("select")[1]
      .value as string;
    if (freeTag1 === "질문/정보" || freeTag2 === "리그") {
      alert("태그를 선택해주세요.");
      return;
    }
    const res = [freeTag1, freeTag2];

    setSubmitted();
    setPostCategory((prev) => [...prev, res[0], res[1]]);
    setCnt((prev) => (prev += 1));
    setShowForm(4);
  };
  const handleSubmitSoccerForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const $morningSoccerForm = document.querySelector("#morning-soccer-form");

    const soccerTag1 = $morningSoccerForm?.getElementsByTagName("select")[0]
      .value as string;
    const soccerTag2 = $morningSoccerForm?.getElementsByTagName("select")[1]
      .value as string;
    if (soccerTag1 === "수성구/중구/북구..." || soccerTag2 === "포지션") {
      alert("태그를 선택해주세요.");
      return;
    }
    const res = [soccerTag1, soccerTag2];

    setSubmitted();
    setPostCategory((prev) => [...prev, res[0], res[1]]);
    setCnt((prev) => (prev += 1));
    setShowForm(4);
  };

  return (
    <div className=" p-5 flex flex-col items-center place-content-center w-full">
      <Step step={cnt} />
      {showForm === 1 && (
        <div className="flex flex-col items-center w-full">
          <form
            id="postTypeForm"
            className="flex flex-col gap-y-5 w-1/2 items-center"
            onSubmit={onSubmit}
          >
            <DropdownFilter
              handleChange={onChange}
              label={"모집 구분"}
              data={postTypeList}
            />

            <button className="btn btn-outline btn-success">확인</button>
          </form>
        </div>
      )}

      {showForm === 2 && (
        <form
          onSubmit={handleSubmitFreeForm}
          id="freeForm"
          className="grid sm:grid-cols-1 md:grid-cols-2 justify-items-center gap-7 "
        >
          <DropdownFilter
            handleChange={onChange}
            label={"유형"}
            data={freeTypeList}
          />
          <DropdownFilter
            handleChange={onChange}
            label={"리그"}
            data={leagueList}
          />
          <button className="btn btn-outline btn-success col-span-2">
            제출
          </button>
        </form>
      )}

      {showForm === 3 && (
        <form
          onSubmit={handleSubmitSoccerForm}
          id="morning-soccer-form"
          className="grid sm:grid-cols-1 md:grid-cols-2 justify-items-center gap-7"
        >
          <DropdownFilter
            handleChange={onChange}
            label={"지역"}
            data={districtList}
          />
          <DropdownFilter
            handleChange={onChange}
            label={"포지션"}
            data={positionList}
          />
          <button className="btn btn-outline btn-success col-span-2">
            제출
          </button>
        </form>
      )}

      {showForm === 4 && (
        <div className=" my-10">
          <h1 className="sm:textbase md:text-xl">
            등록 완료, 글을 작성해주세요.
          </h1>
        </div>
      )}
    </div>
  );
}

//className="hover:-translate-x-80 transition-all duration-500"
