import { combineReducers } from 'redux';
import * as problemsReducer from './problems';

export default combineReducers(Object.assign(
  problemsReducer,
));
