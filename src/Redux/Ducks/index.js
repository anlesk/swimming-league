import { combineReducers } from 'redux';

import statistics from './Statistics';
import filters from './Filters';
import sort from './Sort';
import leaderboard from './Leaderboard';

export default combineReducers({
  statistics,
  filters,
  sort,
  leaderboard,
});
