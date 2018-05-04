import { set, map } from 'lodash';

import { withStart, withSuccess, withFail } from '../../Utils/withSuffix';
import createAction from '../../Utils/createAction';
import Status from '../../../Enums/Status';

// Constants
export const LOAD_FILTER = 'LOAD_FILTER';
export const SELECT_FILTER = 'SELECT_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';

// Initial State
const initialState = {
  items: {},
  selected: {},
};

function saveFilter(filters, filterType, payload) {
  return { ...filters, [filterType]: { items: payload, status: Status.SUCCESS } };
}

function selectFilter(filters, filterType, payload) {
  return { ...set(filters, [filterType, 'selected'], payload)};
}

export default function reducer(filters = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case [withStart(LOAD_FILTER)]: {
      const { filter } = payload;
      return { ...set(filters, `${filter}.status`, Status.LOADING) };
    }

    case [withFail(LOAD_FILTER)]: {
      const { filter } = payload;
      return { ...set(filters, `${filter}.status`, Status.FAIL) };
    }

    case [withSuccess(LOAD_FILTER)]: {
      const { filter, items } = payload;
      return saveFilter(filters, filter, items);
    }

    case SELECT_FILTER: {
      const { filter, value } = payload;
      return selectFilter(filters, filter, value);
    }

    case CLEAR_FILTER: {
      return map(filters, ({ selected, ...rest }) => ({ ...rest }));
    }

    default:
      return filters;
  }
}

// Action Creators for Reducers
export const selectFilterAC = (filter, value) => createAction(SELECT_FILTER, { filter, value });
export const clearFiltersAC = () => createAction(CLEAR_FILTER);

// Selectors
export const getFiltersAll = state => state.filters;
export const getSelectedFilters = state => map(state.filters, filter => filter.selected);

