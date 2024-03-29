import { newsAPI } from './news'

export const apiReducers = {
  [newsAPI.reducerPath]: newsAPI.reducer,
};
