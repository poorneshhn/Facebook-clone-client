import "./rightbar.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { followUser, unFollowUser } from "../../redux/actions";
import EditProfile from "../editprofile/EditProfile";

function Rightbar({ user, profile, currentUser }) {
  const [userFriends, setUserFriends] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const friends = await axiosInstance.get(
          `/api/users/followings/${user._id}`
        );
        setUserFriends(friends.data);
        console.log(friends.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchUserFriends();
  }, [user._id]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src="/images/birthday/birthday.jpg"
            alt=""
            className="birthdayImg"
          />
          <span className="birthdayText">
            {/* <b>poornesh</b> and <b>3 others</b> have birthdays today */}
            Birthdays will be displayed here(future update)
          </span>
        </div>
        <img src="/images/ad.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Users to follow</h4>
        <ul className="rightbarFriendList">
          <li className="rightbarFriend">
            {/* <div className="rightbarProfileImgContainer">
              <img
                src="/images/Harshitha.PNG"
                alt=""
                className="rightbarProfileImg"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">John carter</span> */}
            Future update
          </li>
        </ul>
      </>
    );
  };

  const ProfileRightbar = ({ user, currentUser }) => {
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
      setIsFollowed(currentUser.following.includes(user?._id));
    }, [user, currentUser]);

    const clickHandler = async () => {
      try {
        if (isFollowed) {
          await axiosInstance.put(`/api/users/${user._id}/unfollow`, {
            userId: currentUser._id,
          });
          dispatch(unFollowUser(user._id));
          alert("Unfollowed the user");
        } else {
          await axiosInstance.put(`/api/users/${user._id}/follow`, {
            userId: currentUser._id,
          });
          dispatch(followUser(user._id));
          alert("You are now following the user");
        }
      } catch (error) {
        console.log(error.response);
      }

      setIsFollowed(!isFollowed);
    };

    return (
      <>
        {user._id === currentUser._id ? (
          <EditProfile currentUser={currentUser} user={user} />
        ) : (
          <button className="rightbarFollowButton" onClick={clickHandler}>
            {isFollowed ? "Unfollow" : "Follow"}
            {isFollowed ? <Remove /> : <Add />}
          </button>
        )}

        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City</span>
            <span className="rightbarInfoValue">{user.city || "unknown"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From</span>
            <span className="rightbarInfoValue">{user.from || "unknown"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship</span>
            <span className="rightbarInfoValue">
              {!user.relationship
                ? "unknown"
                : user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "Committed"}
            </span>
          </div>
          {user.createdAt ? (
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Joined Facebook on</span>
              <span className="rightbarInfoValue">
                {user.createdAt.split("T")[0]}
              </span>
            </div>
          ) : null}
        </div>
        <h4 className="rightbarTitle">{user.username} Follows these people</h4>
        <div className="rightbarFollowings">
          {userFriends.map((friend) => (
            <div key={friend._id} className="rightbarFollowing">
              <Link
                to={`/profile/${friend._id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={
                    friend.profileImagePresent
                      ? `/api/users/profile/${friend._id}/image`
                      : "/images/noprofileImage.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span
                  style={{ display: "block" }}
                  className="rightbarFollowingName"
                >
                  {friend.username}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? (
          <ProfileRightbar user={user} currentUser={currentUser} />
        ) : (
          <HomeRightbar />
        )}
      </div>
    </div>
  );
}

export default Rightbar;
