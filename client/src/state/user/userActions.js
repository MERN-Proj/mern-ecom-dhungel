import { LOGGED_IN, LOGGED_OUT } from './userActionTypes';

export const addAuthenticatedUser = (payload) => {
  return { type: LOGGED_IN, payload };
};

export const logOutUser = () => {
  return {
    type: LOGGED_OUT,
  };
};
