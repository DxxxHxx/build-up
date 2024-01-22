import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!confirm(`${email}으로 비밀번호 재설정 코드를 발송합니다.`)) return;

    await sendPasswordResetEmail(auth, email);
    alert("이메일을 확인해주세요.");
    navigate("/login");
  };
  return (
    <div className="p-3 flex flex-col justify-center items-center">
      <h1 className="sm:text-sm md:text-2xl mb-5">
        가입하셨던 이메일을 입력해주세요.
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex gap-x-3 justify-center items-end"
      >
        <label htmlFor="resetPassword">
          이메일
          <input
            value={email}
            onChange={onChange}
            required
            id="resetPassword"
            type="email"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </label>
        <button className="btn text-lg">제출</button>
      </form>
    </div>
  );
}
