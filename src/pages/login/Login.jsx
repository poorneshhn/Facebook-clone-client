import "./login.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { loginAction, loginSuccessful, loginFailed } from "../../redux/actions";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".loginInput");
    const invalidCredText = document.querySelector(".invalid-credentials");

    dispatch(loginAction());

    const data = {
      email: email,
      password: password,
    };

    try {
      const user = await axiosInstance.post("/users/login", data);
      dispatch(loginSuccessful(user.data));
      if (user) {
        for (let elem of inputs) {
          elem.style.border = "1px solid gray";
        }
      }
    } catch (error) {
      dispatch(loginFailed(error));
      if (error.response.status === 500) {
        for (let elem of inputs) {
          elem.style.border = "2px solid red";
        }
        invalidCredText.style.display = "block";
        invalidCredText.innerHTML = "Server error! Please try again later.";
      } else if (error.response.status === 404) {
        for (let elem of inputs) {
          elem.style.border = "2px solid red";
        }
        invalidCredText.style.display = "block";
      } else {
        for (let elem of inputs) {
          elem.style.border = "2px solid red";
        }
        invalidCredText.style.display = "block";
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
          <form className="loginBox" onSubmit={loginHandler}>
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
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="invalid-credentials">Invalid Credentials!</p>

            <button type="submit" className="loginButton" disabled={isLoading}>
              {isLoading ? <CircularProgress htmlColor="green" /> : "Login"}
            </button>
            <span className="loginForgot" id="email">
              Forgot Password?
            </span>
            <Link to="/register" className="loginRegisterLink">
              <button className="loginRegisterButton" disabled={isLoading}>
                {isLoading ? (
                  <CircularProgress htmlColor="white" />
                ) : (
                  "Create a new Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
