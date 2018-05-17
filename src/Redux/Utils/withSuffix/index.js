import Suffix from '../../Enums/Suffix';
import createAction from '../createAction';

export const withStart = type => `${type}_${Suffix.START}`;
export const withSuccess = type => `${type}_${Suffix.SUCCESS}`;
export const withFail = type => `${type}_${Suffix.FAIL}`;

export const createStartAction = (type, payload) => createAction(withStart(type), payload);
export const createSuccessAction = (type, payload) => createAction(withSuccess(type), payload);
export const createFailAction = (type, payload) => createAction(withFail(type), payload);
