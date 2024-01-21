import { useEffect, useRef, useState } from "react";
import DropdownFilterList from "../components/DropdownFilterList";
import { getLogin } from "../manageLoginState";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { postCategoryAtom } from "../recoil";
import TextEditor from "../components/TextEditor";

export default function CreateNewPost() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allSubmitted, setAllSubmitted] = useState(false);
  // const category = useRecoilValue(postCategoryAtom);
  const [category, setCategory] = useRecoilState(postCategoryAtom);

  // console.log(category);

  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!getLogin()) {
      navigate("/free");
    }
  }, [navigate]);

  useEffect(() => {
    if (allSubmitted) {
      titleRef.current?.focus();
    }
  }, [allSubmitted]);
  ///////////////////////////////////
  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(text);
    const user = auth.currentUser;
    try {
      setIsLoading(true);

      await addDoc(collection(db, "posts"), {
        post: text,
        createdAt: Date.now(),
        userName: user?.displayName,
        userId: user?.uid,
        majorCategory: category[0],
        tag1: category[1],
        tag2: category[2],
        title,
        like: 0,
      });
    } catch (e) {
      console.log(e);
      alert("양식을 모두 채워주세요.");
    } finally {
      setIsLoading(false);
      navigate("/free");
      setCategory([]);
    }
  };

  const handleSetSubmitted = () => setAllSubmitted(true);
  return (
    <div className="w-full relative">
      <DropdownFilterList setSubmitted={handleSetSubmitted} />
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-y-3"
      >
        <input
          ref={titleRef}
          required
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="제목"
          className="w-full border-2 mt-3 py-2 px-5 text-lg input input-bordered input-primary rounded-xl"
        />
        {/* <textarea
          required
          placeholder="글을 작성 해 주세요."
          value={text}
          onChange={onChangeTextarea}
          name=""
          id=""
          className="textarea textarea-primary w-full min-h-96 mt-5 border-2 p-3 placeholder:text-lg"
        ></textarea> */}
        <TextEditor value={text} onChangeValue={setText} />
        <button id="submit-btn" className="btn btn-primary btn-outline">
          {isLoading ? "업로드 중 ..." : "업로드"}
        </button>
      </form>
    </div>
  );
}
