import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { IPosts } from "../components/ShowPosts";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { BsEmojiFrown } from "react-icons/bs";
export default function PostTimeLine() {
  const user = auth.currentUser;
  const [posts, setPosts] = useState<IPosts[]>([]);
  useEffect(() => {
    (async () => {
      const postQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(20),
        where("userId", "==", user?.uid)
      );

      onSnapshot(postQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const {
            post,
            createdAt,
            userId,
            userName,
            majorCategory,
            tag1,
            tag2,
            title,
          } = doc.data();
          return {
            post,
            createdAt,
            userId,
            userName,
            majorCategory,
            tag1,
            tag2,
            title,
            id: doc.id,
          };
        });
        setPosts(posts);
      });
    })();
  }, [user?.uid]);

  // console.log(posts);
  return (
    <div className=" w-3/4 flex flex-col gap-y-5 pb-10">
      {posts.length === 0 ? (
        <EmptyTimeLine />
      ) : (
        posts.map((post) => (
          <Link key={post.id} to={`/post-detail/${post.id}`}>
            <Post {...post} />
          </Link>
        ))
      )}
    </div>
  );
}

export const EmptyTimeLine = () => {
  return (
    <div className="flex justify-center items-center gap-x-3 sm:text-lg md:text-3xl">
      <BsEmojiFrown />
      <span>검색결과 없음</span>
    </div>
  );
};
