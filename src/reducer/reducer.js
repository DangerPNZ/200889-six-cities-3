import {combineReducers} from 'redux';
import {reducer as context} from './context/context.js';
import {reducer as fetchedData} from './fetched-data/fetched-data.js';
import {reducer as user} from './user/user.js';
import {ReducerName} from '../utils/constants.js';

export default combineReducers({
  [ReducerName.FETCHED_DATA]: fetchedData,
  [ReducerName.CONTEXT]: context,
  [ReducerName.USER]: user
});
