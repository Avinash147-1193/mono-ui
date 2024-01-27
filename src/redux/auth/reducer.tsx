// reducer.tsx
import { SET_AUTH_TOKEN, AuthActionTypes } from "./action";

interface AuthState {
  access_token: string | null;
}

const initialState: AuthState = {
  access_token: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
