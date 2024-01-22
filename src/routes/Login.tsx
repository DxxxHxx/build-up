import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GithubLogin from "../components/GithubLogin";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    switch (id) {
      case "email":
        setInfo((prev) => {
          return {
            ...prev,
            email: value,
          };
        });
        break;
      case "password":
        setInfo((prev) => {
          return {
            ...prev,
            password: value,
          };
        });
        break;
      default:
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // console.log(info);

    if (isLoading || Object.keys(info).some((item) => item === "")) return;
    try {
      setIsLoading(true);
      // await signInWithEmailAndPassword(auth, info.email, info.password);
      await setPersistence(auth, browserSessionPersistence).then(() => {
        return signInWithEmailAndPassword(auth, info.email, info.password);
      });
      navigate("/free");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.code);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-3 flex flex-col items-center">
      <h1 className="text-3xl mb-7">로그인</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-3 mb-2">
        <label htmlFor="email">
          이메일{" "}
          <input
            value={info.email}
            autoComplete="true"
            onChange={onChange}
            required
            id="email"
            type="email"
            placeholder="입력"
            className="input input-bordered input-primary w-full max-w-xs mt-2"
          />
        </label>
        <label htmlFor="password">
          비밀번호{" "}
          <input
            value={info.password}
            autoComplete="true"
            onChange={onChange}
            required
            id="password"
            type="password"
            placeholder="입력"
            className="input input-bordered input-primary w-full max-w-xs mt-2"
          />
        </label>

        <button className="border-2 p-3 rounded-md hover:opacity-70">
          {isLoading ? "로딩 중 ..." : "로그인"}
        </button>
      </form>

      {error !== "" && <span className="text-red-500 my-2">{error}</span>}

      <div className="flex flex-col gap-y-2 ">
        <span className="sm:text-sm md:text-lg">
          비밀번호를 잊었다면?{" "}
          <button
            onClick={() => navigate("/reset-password")}
            className="link link-primary ml-1"
          >
            비밀번호 초기화
          </button>
        </span>
        <span className="sm:text-sm md:text-lg">
          회원가입을 안했다면?{" "}
          <Link className="link link-primary ml-1" to="/create-account">
            회원가입 하러가기
          </Link>
        </span>
        <GithubLogin />
      </div>
    </div>
  );
}
