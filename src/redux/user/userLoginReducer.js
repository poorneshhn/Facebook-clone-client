import {
  LOGIN_ACTION,
  LOGIN_FAILED,
  LOGIN_SUCCESSFUL,
  LOGOUT_ACTION,
  USER_FOLLOW,
  USER_UNFOLLOW,
} from "../action.types";

const initial_state = {
  user: null,
  isLogged: false,
  isLoading: false,
  errors: null,
};

const loginReducer = (state = initial_state, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        user: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        errors: action.payload,
        user: null,
      };
    case USER_FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case USER_UNFOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (followUser) => followUser !== action.payload
          ),
        },
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        user: null,
        isLogged: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
