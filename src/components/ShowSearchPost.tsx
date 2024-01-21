import { useEffect, useState } from "react";
import { IPosts } from "./ShowPosts";
import { itemLimit } from "./Pagenation";
import { Link } from "react-router-dom";
import Post from "./Post";
import { NotfoundPost } from "../routes/MorningSoccerTab";

interface IShowSearchPost {
  data: IPosts[];
}
export default function ShowSearchPost({ data }: IShowSearchPost) {
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

  // console.log("len:", totalPages, "page:", currentPage);
  //   console.log(list);
  return (
    <div>
      {list.length > 0 ? (
        <>
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
        </>
      ) : (
        <NotfoundPost />
      )}
    </div>
  );
}
