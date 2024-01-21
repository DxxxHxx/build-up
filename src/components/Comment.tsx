import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { useComment } from "../fetch";
import ChatBubble from "./ChatBubble";
import { useNavigate } from "react-router-dom";

type IComment = { docId: string };
export default function Comment({ docId }: IComment) {
  const [comment, setCommnets] = useState("");
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;
  const navigate = useNavigate();
  const commentList = useComment(docId);
  //   console.log(user);
  const onCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommnets(e.currentTarget.value);
  };

  const onClick = async () => {
    if (comment === "") return;
    if (!user) {
      alert("로그인 후 댓글 작성이 가능합니다.");
      navigate("/login");
      return;
    }
    // console.log(comment);
    try {
      setLoading(true);
      await addDoc(collection(db, "posts", docId, "comments"), {
        comment,
        username_comment: user?.displayName,
        createdAt_comment: Date.now(),
        userId_comment: user?.uid,
      });
      setCommnets("");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-y-3 pb-36">
      <div className="text-xl">
        <span>댓글</span>
      </div>

      <div className="flex flex-col gap-y-3">
        <textarea
          value={comment}
          onChange={onCommentsChange}
          className="textarea textarea-primary w-full h-[100px] resize-none"
          placeholder="댓글을 입력하세요."
        ></textarea>
        <button
          onClick={onClick}
          className="btn btn-outline btn-primary sm:btn-sm md:btn-md ml-auto"
        >
          {loading ? "등록 중..." : "댓글 등록"}
        </button>
      </div>

      <ul className="w-4/5 m-auto">
        {commentList.map((item, index) => (
          <li key={`${item.createdAt_comment}_${index}`}>
            <ChatBubble {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
