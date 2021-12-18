import { LOADING_FINISH, LOADING_START } from './loadingActionTypes';

export const loadingStart = () => {
  return { type: LOADING_START };
};

export const loadingFinish = () => {
  return {
    type: LOADING_FINISH,
  };
};
