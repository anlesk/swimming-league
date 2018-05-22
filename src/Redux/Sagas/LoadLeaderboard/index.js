import { takeEvery, call, select, put } from 'redux-saga/effects';

import {
  LOAD_LEADERBOARD,
} from '../../Ducks/Leaderboard';
import { LOAD_FILTER, LOAD_FILTERS } from '../../Ducks/Filters';
import {
  getSelectedFilters,
} from '../../Ducks/Filters';
import Services from '../../../Services';
import { createStartAction, createSuccessAction, createFailAction } from "../../Utils/withSuffix";
import Filter from '../../../Enums/Filter';


const loadableFilters = [Filter.CITY, Filter.AGE_GROUP, Filter.SEX].reduce((memo, filter) => ({ ...memo, [filter]: filter }), {});
const sexFilterValues = [
  {
    id: 'male',
    name: 'М',
  },
  {
    id: 'female',
    name: 'Ж',
  }
]

export function* loadLeaderboard() {
  try {
    const loadLeaderboardStart = yield call(createStartAction, LOAD_LEADERBOARD);
    yield put(loadLeaderboardStart);

    // for (const filter in loadableFilters) {
    //   const loadFilterStart = yield call(createStartAction, LOAD_FILTER, { filter });
    //   yield put(loadFilterStart);
    // }
    const loadFiltersStart = yield call(createStartAction, LOAD_FILTERS);
    yield put(loadFiltersStart);

    const filters = yield select(getSelectedFilters);
    const {
      cities = [],
      ageGroups = [],
      controlLessonResultsConnection,
    } = yield call(Services.GraphQLService.loadData, filters);

    const loadLeaderboardSuccess = yield call(createSuccessAction, LOAD_LEADERBOARD, controlLessonResultsConnection);
    yield put(loadLeaderboardSuccess);

    // const loadFilterSuccess = yield call(createSuccessAction, LOAD_FILTER, { filter: 'ageGroup', items: ageGroups });
    // yield put(loadFilterSuccess);

    const loadFiltersSuccess = yield call(createSuccessAction, LOAD_FILTERS, { filters: {
      [Filter.AGE_GROUP]: ageGroups,
      [Filter.CITY]: cities,
      [Filter.SEX]: sexFilterValues,
    }});
    yield put(loadFiltersSuccess);

    // yield call(putSuccess, LOAD_FILTER, { filter: 'city', items: cities });
    // yield call(putSuccess, LOAD_FILTER, { filter: 'sex', items: cities });
    // yield call(putSuccess, LOAD_LEADERBOARD, controlLessonResultsConnection);
  } catch (e) {
    const loadLeaderboardFail = yield call(createFailAction, LOAD_LEADERBOARD);
    yield put(loadLeaderboardFail);

    const loadFiltersFail = yield call(createFailAction, LOAD_FILTERS);
    yield put(loadFiltersFail);
    // for (const filter in ['city', 'sex', 'ageGroup']) {
    //   const loadFilterFail = yield call(createFailAction, LOAD_FILTER, { filter });
    //   yield put(loadFilterFail);
    // }
  }
}

export function* watchLoadLeaderboard() {
  yield takeEvery(LOAD_LEADERBOARD, loadLeaderboard);
}
