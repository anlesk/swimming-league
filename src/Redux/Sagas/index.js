import { all } from 'redux-saga/effects';

import { watchLoadLeaderboard } from './LoadLeaderboard';


export default function* () {
  yield all([
    watchLoadLeaderboard(),
  ]);
}
