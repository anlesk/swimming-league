import { combineReducers } from 'redux';

import statistics from './Statistics';
import filters from './Filters';
import leaderboard from './Leaderboard';

export default combineReducers({
  statistics,
  filters,
  leaderboard,
});
