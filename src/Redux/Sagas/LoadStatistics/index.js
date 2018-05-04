import { takeEvery, call } from 'redux-saga/effects';
import { putStart, putSuccess, putFail } from '../Utils/Suffix';

import {
  LOAD_STATISTICS,
} from '../../Ducks/Statistics';
import Services from '../../../Services';


export function* loadStatistics({ payload: { id } = {} }) {
  try {
    yield call(putStart, LOAD_STATISTICS, { id });
    const result = yield call(Services.LeagueService.getStatistics, id);
    yield call(putSuccess, LOAD_STATISTICS, { id, items: result });
  } catch (e) {
    yield call(putFail, LOAD_STATISTICS, { id });
  }
}

export function* watchLoadStatistics() {
  yield takeEvery(LOAD_STATISTICS, loadStatistics);
}
