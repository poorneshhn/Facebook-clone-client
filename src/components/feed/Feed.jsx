import Share from "../share/Share";
import Post from "../posts/Post";
import "./feed.css";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useSelector } from "react-redux";

function Feed({ user, profile, username }) {
  const currentUser = useSelector((state) => state.user.user._id);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const post = profile
          ? await axiosInstance.get(`/api/posts/profile/${user}`)
          : await axiosInstance.get(`/api/posts/timeline/${user}`);
        setPosts(post.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPosts();
  }, [profile, user]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {user === currentUser && <Share />}
        {posts.length !== 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <h2 style={{ fontWeight: "normal", color: "#444" }}>
            {!profile
              ? "Follow people to see their Posts!"
              : user === currentUser
              ? "Your uploaded Posts are visible here"
              : `${username} has not uploaded any Posts!`}
          </h2>
        )}
      </div>
    </div>
  );
}

export default Feed;
