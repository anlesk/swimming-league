import { all } from 'redux-saga/effects';

import { watchLoadLeaderboard } from './LoadLeaderboard';
import { watchLoadStatistics } from './LoadStatistics';


export default function* () {
  yield all([
    watchLoadLeaderboard(),
    watchLoadStatistics(),
  ]);
}
