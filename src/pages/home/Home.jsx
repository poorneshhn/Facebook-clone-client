import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import "./home.css";

export default function Home({ user }) {
  const [userObject, setUserObject] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await axiosInstance.get(`/api/users/${user._id}`);
        setUserObject(data.data);
      } catch (error) {
        console.log("from home fetching user ", error.response);
      }
    };
    fetchUser();
  }, [user]);

  return (
    <>
      <Topbar user={user._id} />
      <div className="homeContainer">
        <Sidebar />
        <Feed user={user._id} />
        <Rightbar user={userObject} />
      </div>
    </>
  );
}
