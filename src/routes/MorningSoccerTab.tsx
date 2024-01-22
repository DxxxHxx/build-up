import { useEffect, useState } from "react";
import { IPosts } from "../components/ShowPosts";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { IpostFilteringAtom, postFilteringAtom } from "../recoil";
import Post from "../components/Post";
import { LuSearchX } from "react-icons/lu";
import { Link } from "react-router-dom";
import Pagenation, { itemLimit } from "../components/Pagenation";

export default function MorningSoccerTab() {
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
  // console.log(filteredPost);

  useEffect(() => {
    let unSubscribe: Unsubscribe | null = null;

    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        where("majorCategory", "==", "조기축구 모집")
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
        <Pagenation category="조기축구 모집" />
      ) : filteredPost.length === 0 ? (
        <NotfoundPost />
      ) : (
        <TestShowFilterPost data={filteredPost} />
      )}
    </div>
  );
}

interface TestFilter {
  data: IPosts[];
}
export const TestShowFilterPost = ({ data }: TestFilter) => {
  const [list, setList] = useState<IPosts[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(list.length / itemLimit);

  useEffect(() => {
    setList(data);
  }, [data]);

  const paginate = (list: IPosts[], currentPage: number, itemLimit: number) => {
    const startIndex = (currentPage - 1) * itemLimit;
    const endIndex = startIndex + itemLimit;
    return list.slice(startIndex, endIndex);
  };

  const paginatedData = paginate(list, currentPage, itemLimit);

  // console.log("totalPage:", totalPages, "page:", currentPage);
  // console.log(list);
  return (
    <div>
      <div className="mt-10 grid md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7 ">
        {paginatedData.map((item) => (
          <Link to={`/post-detail/${item?.id}`} key={item.id}>
            <Post {...item} />
          </Link>
        ))}
      </div>

      <div className="join grid grid-cols-2 ml-auto mt-7 sm:w-full md:w-1/3 lg:w-1/4">
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          className={`join-item btn btn-outline ${
            currentPage === 1 && "btn-disabled"
          }`}
        >
          Previous page
        </button>

        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          className={`join-item btn btn-outline ${
            totalPages === currentPage && "btn-disabled"
          }`}
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export const NotfoundPost = () => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="text-2xl flex gap-x-3 items-center">
        <LuSearchX className="text-3xl" />
        <h1>결과 없음</h1>
      </div>
    </div>
  );
};
