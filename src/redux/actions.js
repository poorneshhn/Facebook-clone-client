import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  USER_FOLLOW,
  USER_UNFOLLOW,
} from "./action.types";

export const loginAction = () => ({
  type: LOGIN_ACTION,
});

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const loginSuccessful = (user) => ({
  type: LOGIN_SUCCESSFUL,
  payload: user,
});

export const followUser = (user) => ({
  type: USER_FOLLOW,
  payload: user,
});

export const unFollowUser = (user) => ({
  type: USER_UNFOLLOW,
  payload: user,
});

export const logoutAction = () => ({
  type: LOGOUT_ACTION,
});
