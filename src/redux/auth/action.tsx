// action.tsx
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

// Action Types
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";

// Action Creators
interface SetAuthTokenAction {
  type: typeof SET_AUTH_TOKEN;
  payload: string;
}

export type AuthActionTypes = SetAuthTokenAction;

// Thunk Action
export const loginUser =
  (access_token: string): ThunkAction<void, RootState, unknown, AuthActionTypes> =>
  async (dispatch: Dispatch) => {
    // You can add any logic for decrypting user data using the token
    // and dispatch additional actions to store user information if needed.

    dispatch({
      type: SET_AUTH_TOKEN,
      payload: access_token,
    });
  };
