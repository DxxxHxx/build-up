import { Outlet, useLocation } from "react-router-dom";
import Tools from "../components/Tools";

export default function Posts() {
  const { pathname } = useLocation();
  return (
    <div className=" mt-5 p-3">
      <Tools />
      <Outlet />
      {pathname === "/" && (
        <div className="flex justify-center items-center sm:text-base md:text-xl mt-7">
          보고싶은 탭(자유 or 조기축구 모집)을 선택 해 주세요.
        </div>
      )}
      <div className=" mt-7 sm:w-3/5 md:w-1/3 lg:w-1/5 ml-auto"></div>
    </div>
  );
}
