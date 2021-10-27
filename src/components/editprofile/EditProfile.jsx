import Modal from "react-modal";
import { Edit } from "@material-ui/icons";
import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccessful } from "../../redux/actions";
import "./editProfile.css";

Modal.setAppElement("#root");

function EditProfile({ currentUser, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const dispatch = useDispatch();

  const openCloseModal = () => {
    setIsOpen(!isOpen);
  };

  // form data
  const [username, setUsername] = useState(currentUser.username);
  const [description, setDescription] = useState(
    currentUser.description ? currentUser.description : ""
  );
  const [relationship, setRelationship] = useState(
    currentUser.relationship ? currentUser.relationship : 1
  );
  const [city, setCity] = useState(currentUser.city ? currentUser.city : "");
  const [from, setFrom] = useState(currentUser.from ? currentUser.from : "");

  const submitProfileData = async (e) => {
    e.preventDefault();

    console.log("Save button clicked");
    const data = new FormData();

    data.append("username", username);
    data.append("description", description);
    data.append("relationship", relationship);
    data.append("city", city);
    data.append("from", from);

    if (profilePhoto) {
      data.append("profilePicture", profilePhoto);
      data.append("profileImagePresent", true);
    }
    if (coverImage) {
      data.append("coverPicture", coverImage);
      data.append("coverImagePresent", true);
    }

    try {
      const profileSubmitResponse = await axiosInstance.patch(
        `/api/users/update/profile/${user._id}`,
        data
      );

      dispatch(loginSuccessful(profileSubmitResponse.data));
      window.location.reload();
      console.log(profileSubmitResponse.data);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="modalWindow">
      <div className="editProfileButton">
        <button className="editProfile" onClick={openCloseModal}>
          <span className="editProfileText">Edit Profile</span>
          <Edit className="editIcon" />
        </button>
      </div>
      <Modal isOpen={isOpen} className="modal" overlayClassName="overlay">
        <h2 className="profileEditTitle">Edit Profile Details</h2>
        <hr className="profileEditHr" />

        {profilePhoto && (
          <img
            src={URL.createObjectURL(profilePhoto)}
            id="profilePhoto"
            className="profileImageDemo"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
            alt=""
          />
        )}

        <form onSubmit={(e) => submitProfileData(e)}>
          <div className="profileInputs">
            <label className="profileLabels" htmlFor="profilePhoto">
              Profile Photo
            </label>
            <input
              type="file"
              id="profilePhoto"
              className="profilePhoto"
              accept=".img,.jpg,.jpeg,.png"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
          </div>
          <div className="profileInputs">
            <label className="profileLabels" htmlFor="profilePhoto">
              Cover Image
            </label>
            <input
              type="file"
              id="coverPhoto"
              className="coverPhoto"
              accept=".img,.jpg,.jpeg,.png"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>
          <div className="profileInputs">
            <label className="profileLabels" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="ex: kevin..."
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="profileInputs">
            <label className="profileLabels" htmlFor="description">
              Profile Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              cols="30"
              rows="1"
              placeholder="Hi, I am an artist. I love to socialize and open to talks..."
              value={description}
            ></textarea>
          </div>
          <div className="profileInputs">
            <label htmlFor="relationship">Relationship</label>
            <select
              id="relationship"
              defaultValue={currentUser.relationship}
              onChange={(e) => setRelationship(e.target.value)}
            >
              {[
                { value: 1, name: "Single" },
                { value: 2, name: "Married" },
                { value: 3, name: "Committed" },
              ].map((item) => {
                return (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="profileInputs">
            <label className="profileLabels" htmlFor="username">
              Currently living in
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              id="username"
              placeholder="ex: Bengaluru..."
              value={city}
            />
          </div>
          <div className="profileInputs">
            <label className="profileLabels" htmlFor="username">
              Hometown
            </label>
            <input
              onChange={(e) => setFrom(e.target.value)}
              type="text"
              id="username"
              placeholder="ex: Mumbai..."
              value={from}
            />
          </div>
          <div className="profileInputButtons">
            <button className="closeModal" onClick={openCloseModal}>
              Cancel
            </button>
            <button className="saveDetails" type="submit">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditProfile;
