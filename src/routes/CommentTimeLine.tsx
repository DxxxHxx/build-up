import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { DocumentData, collection, getDocs, query } from "firebase/firestore";
import { useData } from "../fetch";
import Post from "../components/Post";
import { Link } from "react-router-dom";

export interface ICommentedPost {
  postId: string;
  comment: DocumentData[];
}
export default function CommentTimeLine() {
  const user = auth.currentUser;
  const [loading, setLoading] = useState(true);
  const posts = useData();
  
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

  const commentedList = posts.filter(
    (post) =>
      commentedPost.findIndex((comment) => comment.postId === post.id) !== -1
  );

  useEffect(() => {
    if (commentedList.length !== 0) {
      setLoading(false);
    }
  }, [commentedList]);

  return (
    <div className=" w-3/4 flex flex-col gap-y-5 pb-10">
      {loading ? (
        <div className="m-auto">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        commentedList.map((item) => (
          <Link key={item.id} to={`/post-detail/${item.id}`}>
            <Post {...item} />
          </Link>
        ))
      )}
    </div>
  );
}
