import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import "./share.css";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import axiosInstance from "../../axiosInstance";

function Share() {
  const user = useSelector((state) => state.user.user);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  let description = useRef("");

  const locationHandler = (e) => {
    setLoading(true);

    if (
      window.confirm(
        "Do you want to share your location as a post with your friends?"
      )
    ) {
      navigator.geolocation.getCurrentPosition((position) => {
        description.current.value =
          description.current.value + " Latitude: " + position.coords.latitude;
        description.current.value =
          description.current.value +
          " Longitude: " +
          position.coords.longitude;
      });
    }
    setLoading(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (description.current.value || file) {
      const data = new FormData();
      data.append("description", description.current.value || "");
      data.append("userId", user._id);

      if (file) {
        data.append("file", file);
        data.append("filePresent", true);
      }
      try {
        const res = await axiosInstance.post("/api/posts", data);

        if (res.status === 200) {
          alert(res.data);
          window.location.reload();
        }
      } catch (error) {
        console.log(error.response);
      }
    } else {
      alert("Please enter a description or upload an image to share");
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            alt="share"
          />
          <input
            placeholder={`whats on your mind ${user.username}?`}
            className="shareInput"
            ref={description}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareUploadImg">
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="uploadedImage"
            />
            <Cancel
              className="imageUploadCancel"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={(e) => submitHandler(e)}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onClick={function () {
                  document.querySelector("#file").value = null;
                }}
                onChange={(e) => setFile(e.target.files[0])}
                hidden
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Tag(Does not work)</span>
            </div>

            <div className="shareOption" onClick={(e) => locationHandler(e)}>
              <Room htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">
                {loading ? <CircularProgress /> : "Location"}
              </span>
            </div>

            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings(Does not work)</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
