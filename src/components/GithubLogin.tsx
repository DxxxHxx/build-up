import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
// import { useSetRecoilState } from "recoil";
import { setLogin } from "../manageLoginState";
import { FaGithub } from "react-icons/fa";
// import { isLoggedin } from "../recoil";

export default function GithubLogin() {
  const navigate = useNavigate();
  // const setIsLoggedin = useSetRecoilState(isLoggedin);
  const handleLogin = async () => {
    const provider = new GithubAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      setLogin();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <button
      onClick={handleLogin}
      className="border-2 p-3 rounded-md hover:opacity-70"
    >
      <span className="flex items-center justify-center gap-x-2">
        <FaGithub className="text-xl"/>
        깃허브로 계속하기
      </span>
    </button>
  );
}
