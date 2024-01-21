import Slider, { Settings } from "react-slick";
import Post from "./Post";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { DocumentData, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { useData } from "../fetch";
import EmptyPost from "./EmptyPost";

interface IHotPost {
  postId: string;
  likes: DocumentData[];
}
export default function HotPost() {
  const posts = useData();
  const sliderRef = useRef<Slider>(null);
  const [hotposts, setHotpost] = useState<IHotPost[]>([]);

  const fetchPostsAndLikes = async () => {
    const postsQuery = query(collection(db, "posts"));
    const postsSnapshot = await getDocs(postsQuery);

    const postsData = [];

    for (const postDoc of postsSnapshot.docs) {
      const likesQuery = query(collection(db, "posts", postDoc.id, "likes"));

      const likesSnapshot = await getDocs(likesQuery);
      const likesData = likesSnapshot.docs.map((likeDoc) => likeDoc.data());

      postsData.push({
        postId: postDoc.id,
        likes: likesData,
      });
    }

    return postsData;
  };

  useEffect(() => {
    const getPostsWithLikesCountGreaterThanTen = async () => {
      const allPosts = await fetchPostsAndLikes();

      const postsWithLikesCountGreaterThanTen = allPosts.filter(
        (post) => post.likes.reduce((acc, cur) => (acc += cur.like), 0) >= 10
      );
      return postsWithLikesCountGreaterThanTen;
    };
    getPostsWithLikesCountGreaterThanTen().then((res) => setHotpost([...res]));
  }, []);

  const hotPostList = posts.filter(
    (post) => hotposts.findIndex((hotpost) => hotpost.postId === post.id) !== -1
  );

  const emptyList = new Array(20).fill(null);
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="py-3 mt-5 flex flex-col gap-y-3 ">
      <div className="flex justify-between text-3xl px-3">
        <h2 className="text-2xl">인기글 🔥</h2>
        <div className=" flex gap-x-3">
          <button
            className="rounded-full border-2 "
            onClick={() => sliderRef?.current?.slickPrev()}
          >
            <IoIosArrowBack />
          </button>
          <button
            className="rounded-full border-2 "
            onClick={() => sliderRef?.current?.slickNext()}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {hotPostList.length === 0
          ? emptyList.map((_, index) => (
              <Link key={index} className="p-3" to={"/"}>
                <EmptyPost />
              </Link>
            ))
          : hotPostList.map((hotpost) => {
              return (
                <Link
                  className="p-3"
                  key={hotpost.id}
                  to={`/post-detail/${hotpost.id}`}
                >
                  <Post {...hotpost} />
                </Link>
              );
            })}
      </Slider>
    </div>
  );
}
