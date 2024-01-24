import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";
import { ICommentedPost } from "./CommentTimeLine";

export default function Profile() {
  const user = auth.currentUser;
  const postMatch = useMatch("profile/post-timeLine");
  const commentMatch = useMatch("profile/comment-timeLine");
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);
  const navigate = useNavigate();
  const [commentedPost, setCommentedPost] = useState<ICommentedPost[]>([]);
  const fetchPostsAndComments = async () => {
    const postsQuery = query(collection(db, "posts"));
    const postsSnapshot = await getDocs(postsQuery);

    const postsData = [];

    for (const postDoc of postsSnapshot.docs) {
      const commentsQuery = query(
        collection(db, "posts", postDoc.id, "comments")
      );

      const commentSnapshot = await getDocs(commentsQuery);
      const commentData = commentSnapshot.docs.map((likeDoc) => likeDoc.data());

      postsData.push({
        postId: postDoc.id,
        comment: commentData,
      });
    }

    return postsData;
  };

  // fetchPostsAndComments().then((res) => console.log(res));

  useEffect(() => {
    const getMyCommentedPost = async () => {
      const allPosts = await fetchPostsAndComments();

      const postsWithLikesCountGreaterThanTen = allPosts.filter((post) =>
        post.comment.some((item) => item.userId_comment === user?.uid)
      );
      return postsWithLikesCountGreaterThanTen;
    };
    getMyCommentedPost().then((res) => setCommentedPost([...res]));
  }, [user?.uid]);

  useEffect(() => {
    if (!user) {
      navigate("/free");
    }
  }, [navigate, user]);

  // console.log(avatar);
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarurl = await getDownloadURL(result.ref);

      setAvatar(avatarurl);

      try {
        setLoading(true);
        await updateProfile(user!, {
          photoURL: avatarurl,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }

      location.reload();
    }
  };

  const deletePhoto = async () => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, `avatars/${user?.uid}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((e) => {
        // Uh-oh, an error occurred!
        console.log(e);
      });

    setAvatar("");

    await updateProfile(user!, {
      photoURL: "",
    });

    location.reload();
  };
  const handleChanegName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleUpdateName = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const innerText = e.currentTarget.innerText;
    setUpdate((prev) => !prev);

    if (innerText === "변경 완료") {
      // 프로필 업데이트
      if (name.length < 2) {
        alert("2자리 이상 입력해주세요.");
        return;
      } else {
        const q1 = query(
          collection(db, "posts"),
          where("userId", "==", user?.uid)
        );
        const q2 = query(
          collectionGroup(db, "comments"),
          where("userId_comment", "==", user?.uid)
        );

        const snapshot = await getDocs(q1);
        setNameLoading(true);
        const res = snapshot.docs.map((doc) => {
          return doc.id;
        });
        const commentRes = (await getDocs(q2)).docs.map((doc) => doc.id);
        // console.log(commentRes);

        try {
          for (let i = 0; i < res.length; i++) {
            const postsRef = doc(db, "posts", res[i]);

            await updateDoc(postsRef, {
              userName: name,
            });
          }
          if (name !== "") {
            await updateProfile(user!, {
              displayName: name,
            });
          }
          for (let i = 0; i < commentedPost.length; i++) {
            const postsRef = doc(
              db,
              "posts",
              commentedPost[i].postId,
              "comments",
              commentRes[i]
            );
            await updateDoc(postsRef, {
              username_comment: name,
            });
          }
        } catch (e) {
          console.log(e);
        }
        setNameLoading(false);
      }
      location.reload();
    }
  };

  // console.log(commentedPost)
  return (
    <div className="flex flex-col items-center relative">
      <div className="grid grid-cols-9 grid-rows-1 w-full items-center">
        {loading && (
          <div className="text-center absolute left-0 right-0 m-auto">
            <span className="loading loading-dots loading-lg "></span>
          </div>
        )}
        <label
          htmlFor="avatarInput"
          className="flex flex-col items-center justify-center gap-y-3 col-start-5 "
        >
          {avatar ? (
            <div className="avatar">
              <div className="sm:w-14 md:w-24 rounded-full cursor-pointer">
                <img src={avatar} alt="" />{" "}
              </div>
            </div>
          ) : (
            <FaUserCircle className="text-5xl cursor-pointer " />
          )}
        </label>
        <input
          onChange={handleAvatarChange}
          className="hidden"
          type="file"
          accept="image/*"
          id="avatarInput"
        />

        <span className="sm:text-[11px] md:text-base col-span-4 flex items-center gap-x-2 opacity-50">
          <FaArrowLeft />
          프로필을 클릭해 프로필 사진을 바꿔보세요
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-3 mt-3">
        {update ? (
          <input
            type="text"
            placeholder={user?.displayName || "익명"}
            className="input input-bordered input-primary w-full max-w-xs"
            value={name}
            onChange={handleChanegName}
            maxLength={10}
          />
        ) : (
          <span className="text-2xl">{user?.displayName || "익명"}</span>
        )}
        <button
          onClick={handleUpdateName}
          className="btn btn-outline btn-success sm:btn-sm md:btn-md"
        >
          {/* {update ? "변경 완료" : "닉네임 변경"} */}
          {nameLoading ? "변경 중..." : update ? "변경 완료" : "닉네임 변경"}
        </button>
        <button
          onClick={deletePhoto}
          className="btn btn-outline btn-error sm:btn-sm md:btn-md"
        >
          사진 삭제
        </button>
      </div>

      <div className="flex w-full justify-evenly my-10 sm:text-sm md:text-xl">
        <Link to="post-timeLine">
          <button
            className={`${
              postMatch
                ? "opacity-70 underline underline-offset-8 decoration-pink-700 decoration-double decoration-2"
                : ""
            }`}
          >
            내가 쓴 글
          </button>
        </Link>
        <Link to="comment-timeLine">
          <button
            className={`${
              commentMatch
                ? "opacity-70 underline underline-offset-8 decoration-pink-700 decoration-double decoration-2"
                : ""
            }`}
          >
            댓글 단 글
          </button>
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

//flex flex-col items-center justify-center
