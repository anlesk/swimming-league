import createAction from '../../Utils/createAction';
import SortDirection from '../../../Enums/SortDirection';

// Constants
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY';

// Initial State
const initialState = {
  sortBy: 'position',
  sortDirection: SortDirection.ASC,
};

export default function reducer(sort = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_SORT_BY: {
      const { sortBy } = payload;
      const { sortDirection: oldSD, sortBy: oldSortBy } = sort;
      const sortDirection = sortBy === oldSortBy && oldSD === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;

      return { sortBy, sortDirection  };
    }

    default:
      return sort;
  }
}

// Action Creators for Reducers
export const changeSortByAC = sortBy => createAction(CHANGE_SORT_BY, { sortBy });

// Selectors
export const getSortBy = state => state.sort.sortBy;
export const getSortDirection = state => state.sort.sortDirection;

