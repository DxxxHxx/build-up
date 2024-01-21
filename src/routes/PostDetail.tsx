import { useNavigate, useParams } from "react-router-dom";
import { useData, useLike } from "../fetch";
import Comment from "../components/Comment";
import { IoMdArrowBack } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { User } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { hotPostListAtom } from "../recoil";
import TextEditor, { ShowTextEditor } from "../components/TextEditor";

export default function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = auth.currentUser;
  const posts = useData();
  // console.log(user)
  const post = posts.find((item) => item.id === id);
  const createdTime = new Date(post?.createdAt as number).toLocaleString();

  const tag1 = post?.majorCategory === "자유" ? "유형" : "구";
  const tag2 = post?.majorCategory === "자유" ? "리그" : "포지션";

  const [updateState, setUpdateState] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedPost, setUpdatedPost] = useState("");

  useEffect(() => {
    if (post?.title !== undefined) {
      setUpdatedTitle(`${post?.title}`);
    }
  }, [post?.title]);

  // const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.currentTarget.value);
  };

  // const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setUpdatedPost(e.currentTarget.value);
  //   if (textareaRef?.current !== null) {
  //     textareaRef.current.style.height = "auto";
  //     textareaRef.current.style.height =
  //       textareaRef.current.scrollHeight + "px";
  //   }
  // };
  const handleDeleteClick = async () => {
    if (confirm("이 게시글을 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "posts", `${id}`));
      navigate(-1);
      return;
    }
  };

  const handleUpdateClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const innerText = e.currentTarget.innerText;
    setUpdateState((prev) => !prev);

    if (innerText === "수정") {
      setUpdatedPost(post?.post as string);
    }

    if (innerText === "수정 완료") {
      if (updatedTitle === "" || updatedPost === "") return;

      const postsRef = doc(db, "posts", `${id}`);
      await updateDoc(postsRef, {
        title: updatedTitle,
        post: updatedPost,
      });
    }
  };

  // const autoSize = useCallback(() => {
  //   if (textareaRef.current !== null) {
  //     const obj = textareaRef.current;
  //     obj.style.height = "auto";
  //     obj.style.height = obj.scrollHeight + "px";
  //   }
  // }, []);

  // useEffect(() => {
  //   autoSize();
  // }, [updatedPost, autoSize]);

  return (
    <>
      {posts.length !== 0 ? (
        <div className=" w-4/5 m-auto p-3 mt-3">
          <div className="flex flex-col gap-y-5 sm:border-b-2 md:border-b-4 py-5">
            <IoMdArrowBack
              onClick={() => navigate(-1)}
              className="sm:text-2xl md:text-3xl lg:text-4xl cursor-pointer"
            />
            {updateState ? (
              <input
                value={updatedTitle}
                onChange={handleTitleChange}
                placeholder={post?.title}
                className="rounded-xl input input-bordered input-primary"
              />
            ) : (
              <div className="sm:text-xl md:text-2xl">{post?.title}</div>
            )}

            <div className="text-lg flex sm:flex-col sm:gap-y-5 md:flex-row md:justify-between md:items-center">
              <div>
                {post?.userName}
                <span className="text-slate-400 sm:text-[10px] md:text-[15px] ml-1">
                  | {createdTime}
                </span>
              </div>
              {user?.uid === post?.userId && (
                <div className="flex justify-center items-center gap-x-2 sm:btn-sm md:btn-lg">
                  <button
                    onClick={handleUpdateClick}
                    className="btn btn-outline btn-success"
                  >
                    {updateState ? "수정 완료" : "수정"}
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="btn btn-outline btn-error"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-7 flex flex-col sm:gap-y-3 md:gap-y-5 md:text-xl md:w-2/6 m-auto">
            <div className="flex gap-3  w-full justify-between">
              <span className="text-slate-500">모집구분</span>
              <span>{post?.majorCategory}</span>
            </div>

            <div className="flex gap-3  w-full justify-between">
              <span className="text-slate-500">{tag1}</span>
              <span>{post?.tag1}</span>
            </div>

            <div className="flex gap-3  w-full justify-between">
              <span className="text-slate-500">{tag2}</span>
              <span>{post?.tag2}</span>
            </div>
          </div>

          <div className="my-7">
            <div className="sm:border-b-2 md:border-b-4 py-5 text-xl mb-5">
              <span>게시 글</span>
            </div>

            {/* {updateState ? (
              <textarea
                ref={textareaRef}
                value={updatedPost}
                onChange={handlePostChange}
                className="textarea overflow-y-hidden textarea-primary resize-none w-full mt-3"
              ></textarea>
            ) : (
              <div className="py-5">{post?.post}</div>
            )} */}
            {updateState ? (
              <TextEditor onChangeValue={setUpdatedPost} value={updatedPost} />
            ) : (
              <ShowTextEditor value={post!.post} />
            )}
          </div>
          {user && <LikeBtn id={id as string} user={user} />}
          <Comment docId={id!} />
        </div>
      ) : (
        <EmptyPostDetail />
      )}
    </>
  );
}

const EmptyPostDetail = () => {
  return (
    <div className="animate-pulse  w-4/5 m-auto p-3 mt-7">
      <div className="flex flex-col gap-y-5 sm:border-b-2 md:border-b-4 py-5">
        <IoMdArrowBack className="sm:text-2xl md:text-3xl lg:text-4xl cursor-pointer" />
        <div className="sm:w-1/2 md:w-1/3 sm:h-6 md:h-10 bg-slate-700 rounded-lg"></div>

        <div className="text-lg flex sm:flex-col sm:gap-y-5 md:flex-row md:justify-between md:items-center">
          <div className="sm:w-1/3 md:w-1/4 sm:h-6 md:h-10 bg-slate-700 rounded-lg">
            {""}
            <span className="text-slate-400 sm:text-[10px] md:text-[15px] ml-1">
              {""}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col sm:gap-y-3 md:gap-y-5 md:text-xl md:w-2/6 m-auto">
        <div className="flex gap-3  w-full justify-between">
          <span className="w-1/3 h-7 bg-slate-700 rounded-lg"></span>
          <span className="w-1/3 h-7 bg-slate-700 rounded-lg">{""}</span>
        </div>

        <div className="flex gap-3  w-full justify-between">
          <span className="w-1/3 h-7 bg-slate-700 rounded-lg">{""}</span>
          <span className="w-1/3 h-7 bg-slate-700 rounded-lg">{""}</span>
        </div>

        <div className="flex gap-3  w-full justify-between">
          <span className="w-1/3 h-7 bg-slate-700 rounded-lg">{""}</span>
          <span className="w-1/3 h-7 bg-slate-700 rounded-lg">{""}</span>
        </div>
      </div>

      <div className="my-7">
        <div className="sm:border-b-2 md:border-b-4 py-5 text-xl">
          <span className="w-5 h-7 bg-slate-700 rounded-lg">{}</span>
        </div>

        <div className="py-5">{""}</div>
      </div>
    </div>
  );
};

interface ILikeBtn {
  id: string;
  user: User;
}
const LikeBtn = ({ id, user }: ILikeBtn) => {
  const setHotPost = useSetRecoilState(hotPostListAtom);
  const likes = useLike(id as string);
  const likeChecked =
    likes.findIndex((item) => item.userId === user?.uid) !== -1;
  const totalLikes = likes.reduce((acc, cur) => (acc += cur.like), 0);
  const likesDocId = likes.find((item) => item.userId === user.uid)?.id;
  // console.log(id)

  useEffect(() => {
    if (totalLikes >= 10) {
      setHotPost((prev) => [...prev, id]);
    }
  }, [id, totalLikes, setHotPost]);

  const handleLike = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    if (checked) {
      try {
        await addDoc(collection(db, "posts", `${id}`, "likes"), {
          like: 1,
          userId: user?.uid,
        });
        console.log("like!");
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await deleteDoc(doc(db, "posts", `${id}`, "likes", `${likesDocId}`));
        console.log("deleted");
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="ml-auto w-28 flex justify-center items-center gap-x-3 sm:text-sm">
      <span>좋아요 {totalLikes}</span>
      <label className="swap swap-flip text-2xl">
        {/* this hidden checkbox controls the state */}
        <input checked={likeChecked} type="checkbox" onChange={handleLike} />

        <div className="swap-on">
          <FaHeart className="fill-red-600" />
        </div>
        <div className="swap-off">
          <FaHeart />
        </div>
      </label>
    </div>
  );
};
