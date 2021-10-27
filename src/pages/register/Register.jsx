import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, loginFailed, loginSuccessful } from "../../redux/actions";
import { CircularProgress } from "@material-ui/core";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const displatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  const userCreds = {
    username,
    password,
    email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    displatch(loginAction());

    const confirmPasswordText = document.querySelector(".error-message");
    const passwordInput = document.querySelector("#password");
    const confirmPasswordInput = document.querySelector("#confirmpassword");

    if (password !== confirmpassword) {
      confirmPasswordText.style.display = "block";
      passwordInput.style.border = "2px solid red";
      confirmPasswordInput.style.border = "2px solid red";
      confirmPasswordText.innerHTML = "Password does not match";
      displatch(loginFailed());
    } else {
      confirmPasswordText.style.display = "none";
      passwordInput.style.border = "1px solid gray";
      confirmPasswordInput.style.border = "1px solid gray";
      try {
        const user = await axiosInstance.post("/users/register", userCreds);
        if (user.data._id) {
          displatch(loginSuccessful(user.data));
        }
      } catch (error) {
        displatch(loginFailed(error.response));

        if (error.response.data.error.keyPattern.email === 1) {
          confirmPasswordText.innerHTML = "Already registered! Try logging in";
          confirmPasswordText.style.display = "block";
        } else {
          confirmPasswordText.innerHTML =
            "Server error! Please try again later";
          confirmPasswordText.style.display = "block";
        }
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook Clone</h3>
          <span className="loginDesc">
            Connect with your friends and family on the largest social platform
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <input
              className="loginInput"
              type="text"
              name="username"
              id="username"
              placeholder="Name"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="loginInput"
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="loginInput"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              minLength="6"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="loginInput"
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="error-message">Password does not match!</p>
            <button className="loginButton" disabled={isLoading}>
              {isLoading ? <CircularProgress htmlColor="white" /> : "Sign Up"}
            </button>
            <Link to="/login" className="loginRegisterLink">
              <button className="loginRegisterButton" disabled={isLoading}>
                {isLoading ? (
                  <CircularProgress htmlColor="white" />
                ) : (
                  "Login to your Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
