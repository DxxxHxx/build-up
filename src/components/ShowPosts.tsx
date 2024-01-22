import Post from "./Post";
import { Link } from "react-router-dom";
// import { useData } from "../fetch";

export interface IPosts {
  post: string;
  userId: string;
  userName: string;
  createdAt: number;
  id: string;
  majorCategory: string;
  tag1: string;
  tag2: string;
  title: string;
  view: number;
}
interface IShowPosts {
  data: IPosts[];
  filter?: object;
}
export default function ShowPosts({ data }: IShowPosts) {
  // const emptyList = new Array(20).fill(null);

  // console.log(filter);
  // const posts=useData()
  // console.log(posts.)
  return (
    <>
      <div className="mt-10 grid md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7 ">
        {data.map((post) => (
          <Link key={post.id} to={`/post-detail/${post.id}`}>
            <Post {...post} />
          </Link>
        ))}
      </div>
    </>
  );
}
