import "./topbar.css";
import { Search, Person, Notifications, Chat } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import SearchResult from "../searchresult/SearchResult";
import debounce from "lodash.debounce";
import { logoutAction } from "../../redux/actions";

const fetchUser = async (searchValue, cb) => {
  if (searchValue.length > 1) {
    try {
      let resData = await axiosInstance.get(
        `api/users/search/users?q=${searchValue}`
      );
      cb(resData.data);
    } catch (error) {
      cb([]);
      console.log(error.response);
    }
  }
};

const effFunc = debounce((searchValue, cb) => {
  return fetchUser(searchValue, cb);
}, 500);

export default function Topbar({ user }) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const userProfileImagePresent = useSelector(
    (state) => state.user.user.profileImagePresent
  );

  document.addEventListener("click", (e) => {
    if (e.target.className !== "searchInput") {
      setSearchValue("");
    }
  });

  const handleChange = (text) => {
    setSearchValue(text);
    setSearchResult(["Loading..."]);
  };

  useEffect(() => {
    effFunc(searchValue, (resData) => {
      setSearchResult(resData);
      console.log(resData, "debounced function running times");
    });
  }, [searchValue]);

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Facebook-Clone</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            className="searchInput"
            placeholder="Search for People..."
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className="searchResults">
          {searchValue?.length > 1 ? (
            <SearchResult result={searchResult} currentUser={user} />
          ) : null}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={`/`} style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Timeline</span>
          </Link>
          <Link
            to={`/profile/${user}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="topbarLink">Profile</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        <Link to={`/profile/${user}`}>
          <img
            src={
              userProfileImagePresent
                ? `/api/users/profile/${user}/image`
                : `/images/noprofileImage.png`
            }
            alt=""
            className="topbarImage"
          />
        </Link>
        <div className="logoutButton">
          <ul className="logoutLink">
            <li onClick={logoutHandler}>Log out?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
