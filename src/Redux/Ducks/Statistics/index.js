import { get } from 'lodash';

import { withStart, withSuccess, withFail } from '../../Utils/withSuffix';
import createAction from '../../Utils/createAction';
import Status from '../../../Enums/Status';

// Constants
export const LOAD_STATISTICS = 'LOAD_STATISTICS';
export const SHOW_STATISTICS = 'SHOW_STATISTICS';
export const HIDE_STATISTICS = 'HIDE_STATISTICS';

// Initial State
const initialState = {};

export default function reducer(statistics = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case withStart(LOAD_STATISTICS): {
      const { id } = payload;
      const items = get(statistics, `${id}.items`);
      return { ...statistics, [id]: { items, status: Status.LOADING }};
    }

    case withFail(LOAD_STATISTICS): {
      const { id } = payload;
      const items = get(statistics, `${id}.items`);
      return { ...statistics, [id]: { items, status: Status.FAIL }};
    }

    case withSuccess(LOAD_STATISTICS): {
      const { id, items } = payload;
      return { ...statistics, [id]: { items, status: Status.SUCCESS }};
    }

    case SHOW_STATISTICS: {
      const { id } = payload;
      return { ...statistics, statisticsShownForId: id };
    }

    case HIDE_STATISTICS: {
      return { ...statistics, statisticsShownForId: null };
    }

    default:
      return statistics;
  }
}

// Action Creators for Reducers
export const loadStatisticsAC = id => createAction(LOAD_STATISTICS, { id });
export const showStatisticsAC = id => createAction(SHOW_STATISTICS, { id });
export const hideStatisticsAC = () => createAction(HIDE_STATISTICS);

// Selectors
export const getStatistics = state => state.statistics;

