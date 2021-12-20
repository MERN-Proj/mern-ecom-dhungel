import { LOGGED_IN, LOGGED_OUT } from './userActionTypes';

const initialState = null;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, ...action.payload };
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
};
