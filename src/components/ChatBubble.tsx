import { deleteDoc, doc } from "firebase/firestore";
import { IComments } from "../fetch";
import { auth, db } from "../firebase";
import { useParams } from "react-router-dom";

export default function ChatBubble(props: IComments) {
  const user = auth.currentUser;
  const { id } = useParams();

  const createdTime = new Date(props.createdAt_comment).toLocaleString();

  const handleDeleteComment = async () => {
    // await addDoc(collection(db, "posts", docId, "comments"), {
    //   comment,
    //   username_comment: user?.displayName,
    //   createdAt_comment: Date.now(),
    //   userId_comment: user?.uid,
    // });

    try {
      await deleteDoc(doc(db, "posts", `${id}`, "comments", props.id));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      className={`chat my-3 flex flex-col gap-y-1 ${
        user?.uid === props.userId_comment ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-header mr-2">{props.username_comment}</div>
      <div className="chat-bubble">{props.comment}</div>
      <div className="chat-footer opacity-50 sm:text-[11px]">{createdTime}</div>
      {user?.uid === props.userId_comment && (
        <div>
          <button
            onClick={handleDeleteComment}
            className="btn btn-outline btn-error sm:btn-sm md:btn-md"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
