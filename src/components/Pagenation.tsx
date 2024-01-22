import { useState, useEffect } from "react";
import ShowPosts, { IPosts } from "./ShowPosts";
import {
  collection,
  endBefore,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useData } from "../fetch";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { inputAtom } from "../recoil";
import ShowSearchPost from "./ShowSearchPost";

interface IPagenation {
  category: string;
  // searchString:string
}

export const itemLimit = 12;
export default function Pagenation({ category }: IPagenation) {
  const [list, setList] = useState<IPosts[]>([]);
  const [page, setPage] = useState(1);
  const { pathname } = useLocation();

  const posts = useData();
  const divideTabPosts = posts.filter((post) => {
    if (pathname === "/free") {
      return post.majorCategory === "자유";
    } else {
      return post.majorCategory === "조기축구 모집";
    }
  });
  const lastPage = Math.ceil(divideTabPosts.length / itemLimit);

  const inputValue = useRecoilValue(inputAtom);

  const searchList = divideTabPosts.filter(
    (post) => post.title.indexOf(inputValue) !== -1 && inputValue !== ""
  );

  useEffect(() => {
    (async () => {
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(itemLimit),
        where("majorCategory", "==", category)
      );

      onSnapshot(postsQuery, (snapshot) => {
        // let items=[];
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
            title,
            view,
            id: doc.id,
          };
        });
        setList(posts);
      });
    })();
  }, [category]);

  ////////////////////////////

  const showNext = (item: IPosts) => {
    if (list.length === 0) {
      alert("Thats all we have for now !");
    } else {
      const fetchNextData = async () => {
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          limit(itemLimit),
          where("majorCategory", "==", category),
          startAfter(item.createdAt)
        );

        onSnapshot(postsQuery, (snapshot) => {
          // let items=[];
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
              title,
              view,
              id: doc.id,
            };
          });
          setList(posts);
          setPage((prev) => (prev += 1));
        });
      };
      fetchNextData();
    }
  };

  const showPrevious = (item: IPosts) => {
    if (list.length === 0) {
      alert("Thats all we have for now !");
    } else {
      const fetchPreviousData = async () => {
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          limitToLast(itemLimit),
          where("majorCategory", "==", category),
          endBefore(item.createdAt)
        );

        onSnapshot(postsQuery, (snapshot) => {
          // let items=[];
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
              title,
              view,
              id: doc.id,
            };
          });
          setList(posts);
          setPage((prev) => (prev -= 1));
        });
      };
      fetchPreviousData();
    }
  };
  // console.log('lastpage:',lastPage,'now:',page);
  // console.log(inputValue==='')
  // const searchResultList=list.filter(item=>item.title.includes(inputValue))
  // console.log(searchResultList)

  return (
    <div>
      {inputValue === "" ? (
        <div>
          <ShowPosts data={list} />
          <div className="join grid grid-cols-2 ml-auto mt-7 sm:w-full md:w-1/3 lg:w-1/4 pt-3">
            <button
              onClick={() => {
                showPrevious(list[0]);
              }}
              className={`join-item btn btn-outline ${
                page === 1 && "btn-disabled"
              }`}
            >
              Previous page
            </button>

            <button
              onClick={() => {
                showNext(list[list.length - 1]);
              }}
              className={`join-item btn btn-outline ${
                lastPage === page && "btn-disabled"
              }`}
            >
              Next page
            </button>
          </div>
        </div>
      ) : (
        <ShowSearchPost data={searchList} />
      )}
    </div>
  );
}
