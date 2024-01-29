import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

// Action Types
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_AUTH_PROFILE = "SET_AUTH_PROFILE";
export const SET_AUTH_LIKE_REACT = "SET_AUTH_LIKE_REACT";
export const SET_AUTH_LIKED_POSTS = "SET_AUTH_LIKED_POSTS";
export const SET_AUTH_POST = "SET_AUTH_POST";

// Action Creators
interface SetAuthTokenAction {
  type: typeof SET_AUTH_TOKEN;
  payload: string;
}

interface SetAuthProfileAction {
  type: typeof SET_AUTH_PROFILE;
  payload: any;
}

interface SetAuthLikedPostAction {
  type: typeof SET_AUTH_LIKED_POSTS;
  payload: any;
}

interface SetAuthPostAction {
  type: typeof SET_AUTH_POST;
  payload: any;
}

interface SetAuthPostLikeReactAction {
  type: typeof SET_AUTH_LIKE_REACT;
  payload: any;
}

export type AuthActionTypes = SetAuthTokenAction | SetAuthProfileAction | SetAuthPostLikeReactAction | SetAuthPostAction | SetAuthLikedPostAction;

// Thunk Actions
export const loginUser =
  (payload: string): ThunkAction<void, RootState, unknown, SetAuthTokenAction> =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: SET_AUTH_TOKEN,
      payload: payload,
    });
  };

export const setAuthUserProfile =
  (payload: any): ThunkAction<void, RootState, unknown, SetAuthProfileAction> =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: SET_AUTH_PROFILE,
      payload: payload,
    });
  };

export const setAuthUserPost =
  (payload: any): ThunkAction<void, RootState, unknown, SetAuthPostAction> =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: SET_AUTH_POST,
      payload: payload,
    });
  };

export const setAuthUserLikedPost =
  (payload: any): ThunkAction<void, RootState, unknown, SetAuthLikedPostAction> =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: SET_AUTH_LIKED_POSTS,
      payload: payload,
    });
  };

export const setAuthUserLikeReact =
  (likeReacts: any): ThunkAction<void, RootState, unknown, SetAuthPostLikeReactAction> =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: SET_AUTH_LIKE_REACT,
      payload: likeReacts,
    });
  };
