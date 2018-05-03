import { withStart, withSuccess, withFail } from '../../Utils/withSuffix';
import createAction from '../../Utils/createAction';
import Status from '../../../Enums/Status';

// Constants
export const LOAD_LEADERBOARD = 'LOAD_LEADERBOARD';

// Initial State
const initialState = {};

export default function reducer(leaderboard = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case [withStart(LOAD_LEADERBOARD)]: {
      return { ...leaderboard, status: Status.LOADING };
    }

    case [withFail(LOAD_LEADERBOARD)]: {
      return { ...leaderboard, status: Status.LOADING };
    }

    case [withSuccess(LOAD_LEADERBOARD)]: {
      const { items } = payload;
      return { items, status: Status.SUCCESS };
    }

    default:
      return leaderboard;
  }
}

// Action Creators for Reducers
export const loadLeaderboardAC = () => createAction(LOAD_LEADERBOARD);

// Selectors
export const getLeaderboard = state => state.leaderboard;
