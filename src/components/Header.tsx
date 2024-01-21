import { useNavigate } from "react-router-dom";
import Hamburger from "../assets/icon/Hamburger";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ToggleThemeBtn from "./ToggleThemeBtn";
import { getLogin, setLogout } from "../manageLoginState";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  useEffect(() => {
    const $html = document.querySelector("html");
    localStorage.setItem("theme", theme ?? "light");
    const localTheme = localStorage.getItem("theme");

    $html?.setAttribute("data-theme", localTheme!);
  }, [theme]);

  const refreshComponent = () => setRefresh(Math.random());
  const handleLoginAndOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText: text } = e.currentTarget;

    if (text === "로그인") {
      navigate("/login");
    } else {
      await signOut(auth);
      setLogout();

      location.reload();
    }

    refreshComponent();
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleCreatePostPage = () => {
    if (getLogin()) {
      navigate("/create-new-post");
    } else {
      alert("글 작성은 로그인 후 가능합니다.");
      navigate("/login");
    }

    refreshComponent();
  };
  return (
    <div className="mb-3 flex justify-between sm:p-2 sm:text-sm md:p-5 md:text-lg  lg:p-8 lg:text-xl lg:font-bold">
      <button onClick={() => navigate("/free")}>build-up</button>

      <div className="sm:hidden md:block">
        <div className="flex gap-5">
          <ToggleThemeBtn theme={theme!} onToggle={handleToggle} />
          <button onClick={handleCreatePostPage}>글 쓰기</button>
          <button onClick={handleLoginAndOut}>
            {getLogin() ? "로그아웃" : "로그인"}
          </button>

          {getLogin() && (
            <div
              onClick={() => navigate("/profile")}
              className="avatar cursor-pointer"
            >
              <div className=" w-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {auth.currentUser?.photoURL ? (
                  <img src={auth.currentUser?.photoURL as string} />
                ) : (
                  <div className="flex justify-center my-1">
                    <FaUserCircle />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sm:block md:hidden" key={refresh}>
        <div>
          <ToggleThemeBtn theme={theme!} onToggle={handleToggle} />
          <details className="dropdown relative">
            <summary
              id="hamburger"
              className="m-1 btn bg-transparent border-none"
            >
              <Hamburger />
            </summary>
            <ul
              id="mobile-menu"
              className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-36 absolute right-0"
            >
              <li className="z-50">
                <span onClick={handleCreatePostPage}>글 쓰기</span>
              </li>
              <li className="z-50">
                <span onClick={handleLoginAndOut}>
                  {getLogin() ? "로그아웃" : "로그인"}
                </span>
              </li>
              {getLogin() && (
                <li className="z-50">
                  <span
                    onClick={() => {
                      navigate("/profile");
                      refreshComponent();
                    }}
                  >
                    프로필
                  </span>
                </li>
              )}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
