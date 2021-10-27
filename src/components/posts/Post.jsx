import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

function Post({ post }) {
  const [user, setUser] = useState({});

  const currentUser = useSelector((state) => state.user.user._id);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await axiosInstance.get(`/api/users/${post.userId}`);
        setUser(user.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, [post.userId]);

  const [like, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = async () => {
    try {
      axiosInstance.put(`/api/posts/${post._id}/like`, { userId: currentUser });
      setLikes(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (error) {}
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser));
  }, [currentUser, post.likes]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={
                user.profileImagePresent
                  ? `/api/users/profile/${user._id}/image`
                  : `/images/noprofileImage.png`
              }
              alt=""
            />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          {post.filePresent ? (
            <img
              className="postImg"
              src={`/api/posts/${post._id}/posts/images`}
              alt="postimage"
            />
          ) : null}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/images/like/like.png"
              alt="like"
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src="/images/like/heartlike.jpg"
              alt="heart"
              onClick={likeHandler}
            />

            <span className="postLikeCounter">{like} people like this</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{/*comments*/}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
