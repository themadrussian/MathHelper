import { combineReducers } from 'redux';
import * as problemsReducer from './reducers';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const appReducer = combineReducers(Object.assign(
  problemsReducer,
));

export const reducer = (state, action) => {
  if (action.type === 'FULL_RESET') {
    state = undefined; // reset the state fully
  }
  return appReducer(state, action)
}
