// reducer.tsx
import { SET_AUTH_TOKEN, SET_AUTH_PROFILE, SET_AUTH_LIKED_POSTS, SET_AUTH_POST, SET_AUTH_LIKE_REACT, AuthActionTypes } from "./action";

interface AuthState {
  data: string | null;
  profile: [] | null;
  likedPost: [] | null;
  likeReacts: [] | null;
  post: [] | null;
}

const initialState: AuthState = {
  data: null,
  profile: null,
  likedPost: null,
  likeReacts: null,
  post: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        data: action.payload,
      };
    case SET_AUTH_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_AUTH_LIKED_POSTS:
      return {
        ...state,
        likedPost: action.likedPost,
      };
    case SET_AUTH_POST:
      return {
        ...state,
        post: action.post,
      };

    case SET_AUTH_LIKE_REACT:
      return {
        ...state,
        likeReacts: action.likeReacts,
      };
    default:
      return state; // Ensure you have a default case to handle unknown actions
  }
};

export default authReducer;
