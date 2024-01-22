import { IPosts } from "../components/ShowPosts";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { IpostFilteringAtom, postFilteringAtom } from "../recoil";
import { NotfoundPost, TestShowFilterPost } from "./MorningSoccerTab";
import Pagenation from "../components/Pagenation";

export default function FreeTab() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const filterValue = useRecoilValue<IpostFilteringAtom>(postFilteringAtom);
  const resetFilter = useResetRecoilState(postFilteringAtom);

  const beforeFiltering = Object.values(filterValue).every(
    (item) => item === ""
  );
  const filteredPost = posts.filter((item) => {
    if (filterValue.tag1 === "" && filterValue.tag2 !== "") {
      return filterValue.tag2 === item.tag2;
    } else if (filterValue.tag1 !== "" && filterValue.tag2 === "") {
      return filterValue.tag1 === item.tag1;
    } else if (filterValue.tag1 !== "" && filterValue.tag2 !== "") {
      return item.tag1 === filterValue.tag1 && item.tag2 === filterValue.tag2;
    }
  });
  // console.log(filteredPost)

  useEffect(() => {
    let unSubscribe: Unsubscribe | null = null;

    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        where("majorCategory", "==", "자유")
      );

      unSubscribe = onSnapshot(postsQuery, (snapshot) => {
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
            like,
            view,
          } = doc.data();
          return {
            post,
            createdAt,
            userId,
            userName,
            majorCategory,
            tag1,
            tag2,
            id: doc.id,
            title,
            like,
            view,
          };
        });
        setPosts(posts);
      });
    };
    fetchPosts();
    return () => {
      unSubscribe && unSubscribe();
    };
  }, []);

  useEffect(() => {
    resetFilter();
  }, [resetFilter]);

  return (
    <div>
      {beforeFiltering ? (
        <Pagenation category={"자유"} />
      ) : filteredPost.length === 0 ? (
        <NotfoundPost />
      ) : (
        <TestShowFilterPost data={filteredPost} />
      )}
    </div>
  );
}
