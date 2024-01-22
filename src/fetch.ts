import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import { IPosts } from "./components/ShowPosts";

export const useData = () => {
  const [post, setPost] = useState<IPosts[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
      );
      onSnapshot(postsQuery, (snapshot) => {
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
            id: doc.id,
            title,
            view,
          };
        });
        setPost(posts);
      });
    };
    fetchPosts();
  }, []);

  return post;
};

export interface IComments {
  createdAt_comment: string;
  username_comment: string;
  comment: string;
  userId_comment: string;
  id: string;
}
export const useComment = (docId: string) => {
  const [comments, setComments] = useState<IComments[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "posts", docId, "comments"),
        orderBy("createdAt_comment", "asc")
      );
      onSnapshot(postsQuery, (snapshot) => {
        const comments = snapshot.docs.map((doc) => {
          const {
            createdAt_comment,
            userId_comment,
            username_comment,
            comment,
          } = doc.data();
          return {
            createdAt_comment,
            userId_comment,
            username_comment,
            comment,
            id: doc.id,
          };
        });
        setComments(comments);
      });
    };
    fetchPosts();
  }, [docId]);

  return comments;
};

export interface ILikes {
  like: number;
  userId: string;
  id: string;
}
export const useLike = (docId: string) => {
  const [likes, setLikes] = useState<ILikes[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const postsQuery = query(collection(db, "posts", docId, "likes"));
      onSnapshot(postsQuery, (snapshot) => {
        const likes = snapshot.docs.map((doc) => {
          const { like, userId } = doc.data();
          return {
            like,
            userId,
            id: doc.id,
          };
        });
        setLikes(likes);
      });
    };
    fetchLikes();
  }, [docId]);

  return likes;
};
