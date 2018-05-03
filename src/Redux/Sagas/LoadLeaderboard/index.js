import { takeLatest, call, put, select } from 'redux-saga/effects';
import { withStart, withSuccess, withFail } from '../../Utils/withSuffix';

import {
  LOAD_LEADERBOARD,
} from '../../Ducks/Leaderboard';
import {
  getSelectedFilters,
} from '../../Ducks/Filters';
import Services from '../../../Services';


export function* findMatchingJournals() {
  try {
    yield put(withStart(LOAD_LEADERBOARD));
    const filters = yield select(getSelectedFilters);
    const result = yield call(Services, filters);
    yield put(withSuccess(LOAD_LEADERBOARD, result));
  } catch (e) {
    yield put(withFail(LOAD_LEADERBOARD));
  }
}

export function* watchLoadLeaderboard() {
  yield takeLatest(LOAD_LEADERBOARD, findMatchingJournals);
}
