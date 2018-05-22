import { withStart, withSuccess, withFail } from '../../Utils/withSuffix';
import createAction from '../../Utils/createAction';
import Status from '../../../Enums/Status';

// Constants
export const LOAD_FILTER = 'LOAD_FILTER';
export const LOAD_FILTERS = 'LOAD_FILTERS';
export const SELECT_FILTER = 'SELECT_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';

// Initial State
const initialState = {
  status: {},
  values: {},
  selected: {},
};

function saveFilter(filters, filterType, payload) {
  const { values, ...rest } = filters;
  return { ...rest, values: { ...values, [filterType]: { items: payload, status: Status.SUCCESS } } };
}

function selectFilter(filters, filterType, payload) {
  const { selected, ...rest } = filters;
  return { ...rest, selected: { ...selected, [filterType]: payload } };
}

export default function reducer(filters = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case withStart(LOAD_FILTERS): {
      return { ...filters, status: Status.LOADING };
    }

    case withFail(LOAD_FILTERS): {
      return { ...filters, status: Status.FAIL };
    }

    case withSuccess(LOAD_FILTERS): {
      const { filters: newFilters } = payload;
      return { ...filters, values: newFilters, status: Status.SUCCESS };
    }

    case withStart(LOAD_FILTER): {
      const { filter } = payload;
      const { values, ...rest } = filters;
      return { ...rest, values: { ...values, [filter]: { status: Status.LOADING }} };
    }

    case withFail(LOAD_FILTER): {
      const { filter } = payload;
      const { values, ...rest } = filters;
      return { ...rest, values: { ...values, [filter]: { status: Status.FAIL }} };
    }

    case withSuccess(LOAD_FILTER): {
      const { filter, items } = payload;
      return saveFilter(filters, filter, items);
    }

    case SELECT_FILTER: {
      const { filter, value } = payload;
      return selectFilter(filters, filter, value);
    }

    case CLEAR_FILTER: {
      return { ...filters, selected: initialState.selected };
    }

    default:
      return filters;
  }
}

// Action Creators for Reducers
export const selectFilterAC = (filter, value) => createAction(SELECT_FILTER, { filter, value });
export const clearFiltersAC = () => createAction(CLEAR_FILTER);

// Selectors
export const getFiltersAll = state => state.filters.values;
export const getFiltersStatus = state => state.filters.status;
export const getSelectedFilters = state => state.filters.selected;

