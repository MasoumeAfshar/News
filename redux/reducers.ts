import { combineReducers } from 'redux';
import { apiReducers } from '../api/apiReducers';
import searchSlice from './searchSlice';

const rootReducer = combineReducers({
  search: searchSlice,
  ...apiReducers,
});

export default rootReducer;
