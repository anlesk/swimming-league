import { takeEvery, call, put } from 'redux-saga/effects';

import {
  LOAD_STATISTICS,
} from '../../Ducks/Statistics';
import Services from '../../../Services';
import { createStartAction, createSuccessAction, createFailAction } from '../../Utils/withSuffix';


export function* loadStatistics({ payload: { id } = {} }) {
  try {
    const loadStatisticsStart = yield call(createStartAction, LOAD_STATISTICS, { id });
    yield put(loadStatisticsStart);

    const {
      controlLessonResultsConnection: { edges = [] } = {},
    } = yield call(Services.GraphQLService.loadStatistics, id);

    const loadStatisticsSuccess = yield call(createSuccessAction, LOAD_STATISTICS, { id, items: edges });
    yield put(loadStatisticsSuccess);
  } catch (e) {
    const loadStatisticsFail = yield call(createFailAction, LOAD_STATISTICS, { id });
    yield put(loadStatisticsFail);
  }
}

export function* watchLoadStatistics() {
  yield takeEvery(LOAD_STATISTICS, loadStatistics);
}
