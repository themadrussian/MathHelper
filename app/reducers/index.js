import { combineReducers } from 'redux';
import * as problemsReducer from './reducers';

export default combineReducers(Object.assign(
  problemsReducer,
));
