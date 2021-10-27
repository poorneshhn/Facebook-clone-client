import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../axiosInstance";
import "./profile.css";

function Profile({ currentUser }) {
  const [user, setUser] = useState({});
  const userId = useParams().id;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axiosInstance.get(`/api/users/${userId}`);
        setUser(user.data);
      } catch (error) {
        console.log("from profile fetching user ", error.response);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      <Topbar user={currentUser._id} />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverImagePresent
                    ? `/api/users/cover/${userId}/image`
                    : `/loadingGIFs/facebookLoading1.gif`
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profileImagePresent
                    ? `/api/users/profile/${userId}/image`
                    : `/images/noprofileImage.png`
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">
                {user.description || "no description available, please update"}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed profile={true} user={user._id} username={user.username} />
            <Rightbar user={user} profile={true} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
