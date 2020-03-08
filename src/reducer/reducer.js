import {combineReducers} from 'redux';
import {reducer as context} from './context/context.js';
import {reducer as fetchedData} from './fetched-data/fetched-data.js';

export const ReducerName = {
  FETCHED_DATA: `FETCHED_DATA`,
  CONTEXT: `CONTEXT`
};

export default combineReducers({
  [ReducerName.FETCHED_DATA]: fetchedData,
  [ReducerName.CONTEXT]: context
});
