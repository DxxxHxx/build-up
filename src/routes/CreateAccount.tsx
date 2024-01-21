import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../manageLoginState";

export default function CreateAccount() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    switch (id) {
      case "name":
        setInfo((prev) => {
          return {
            ...prev,
            name: value,
          };
        });
        break;
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

    // loading || info에 하나라도 빈 데이터가 있으면 리턴
    if (isLoading || Object.keys(info).some((item) => item === "")) return;
    try {
      //submit되는 순간 계정을 만드는 중이니까 로딩으로 표시
      setIsLoading(true);
      // 1. 계정 생성
      const { user } = await createUserWithEmailAndPassword(
        auth,
        info.email,
        info.password
      );
      // console.log(user);
      // 2. 유저 프로필 설정
      await updateProfile(user, { displayName: info.name });

      setLogin();
      // 3. 홈페이지로 이동
      navigate("/free");
    } catch (e) {
      // credit이 실패하면 catch로 이동, 비밀번호 유효하지 않거나 메일 중복
      if (e instanceof FirebaseError) {
        setError(e.code);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-3 border-2 border-black flex flex-col items-center">
      <h1 className="text-3xl mb-7">회원가입</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
        <label htmlFor="name">
          닉네임{" "}
          <input
            maxLength={10}
            value={info.name}
            autoComplete="true"
            onChange={onChange}
            required
            id="name"
            type="text"
            placeholder="입력"
            className="input input-bordered input-primary w-full max-w-xs mt-2"
          />
        </label>
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

        <button className="border-2 p-3 rounded-md mt-5">
          {isLoading ? "로딩 중 ..." : "회원가입"}
        </button>
        {error && <span className="text-center text-red-600">{error}</span>}
      </form>
    </div>
  );
}
