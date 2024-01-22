import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IPosts } from "./ShowPosts";
import { IoEyeOutline } from "react-icons/io5";

export default function Post(props: IPosts) {
  const createdTime = new Date(props.createdAt)
    .toLocaleString()
    .split(" ")
    .join("");

  const updateView = async () => {
    const postsRef = doc(db, "posts", `${props.id}`);
    await updateDoc(postsRef, {
      view: increment(+1),
    });
  };
  return (
    <div
      onClick={updateView}
      className="sm:mb-3 md:mb-0 border-2 rounded-2xl p-5 flex flex-col gap-3 cursor-pointer hover:scale-110 transition-all duration-300"
    >
      <div className="flex gap-x-2">
        <div className="badge badge-primary badge-outline">{props.tag1}</div>
        <div className="badge badge-primary badge-outline">{props.tag2}</div>
      </div>
      <span className="text-sm text-gray-400">생성일 : {createdTime}</span>
      <span className="text-xl">{props.title}</span>
      <div className="divider"></div>
      <div className="flex justify-between items-center">
        <span className="">{props.userName}</span>
        <div className="flex items-center gap-x-1">
          <IoEyeOutline />
          <span>{props.view}</span>
        </div>
      </div>
    </div>
  );
}
