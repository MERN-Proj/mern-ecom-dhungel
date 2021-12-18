import { LOADING_FINISH, LOADING_START } from './loadingActionTypes';

const initialState = false;

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return true;
    case LOADING_FINISH:
      return false;
    default:
      return state;
  }
};
