import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Login from "../routes/Login";
import CreateAccount from "../routes/CreateAccount";
import ResetPassword from "../routes/ResetPassword";
import Profile from "../routes/Profile";
import Posts from "../routes/Posts";
import FreeTab from "../routes/FreeTab";
import MorningSoccerTab from "../routes/MorningSoccerTab";
import CreateNewPost from "../routes/CreateNewPost";
import PostDetail from "../routes/PostDetail";
import Banner from "./Banner";
import MoveTop from "./MoveTop";
import PostTimeLine from "../routes/PostTimeLine";
import CommentTimeLine from "../routes/CommentTimeLine";
import HotPost from "./HotPost";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <MoveTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <HotPost />
              <Posts />
            </>
          }
        >
          <Route path="free" element={<FreeTab />} />
          <Route path="morning-soccer" element={<MorningSoccerTab />} />
        </Route>
        <Route path="/profile" element={<Profile />}>
          <Route path="post-timeLine" element={<PostTimeLine />} />
          <Route path="comment-timeLine" element={<CommentTimeLine />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-new-post" element={<CreateNewPost />} />
        <Route path="/post-detail/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
