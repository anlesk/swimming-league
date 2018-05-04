import { takeEvery, call, select } from 'redux-saga/effects';
import { putStart, putSuccess, putFail } from '../Utils/Suffix';

import {
  LOAD_LEADERBOARD,
} from '../../Ducks/Leaderboard';
import {
  getSelectedFilters,
} from '../../Ducks/Filters';
import Services from '../../../Services';


export function* loadLeaderboard() {
  try {
    yield call(putStart, LOAD_LEADERBOARD);
    const filters = yield select(getSelectedFilters);
    const result = yield call(Services.LeagueService.getLeaderboard, filters);
    yield call(putSuccess, LOAD_LEADERBOARD, result);
  } catch (e) {
    yield call(putFail,LOAD_LEADERBOARD);
  }
}

export function* watchLoadLeaderboard() {
  yield takeEvery(LOAD_LEADERBOARD, loadLeaderboard);
}
