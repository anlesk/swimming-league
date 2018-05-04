import Suffix from '../../Enums/Suffix';

export const withStart = type => `${type}_${Suffix.START}`;
export const withSuccess = type => `${type}_${Suffix.SUCCESS}`;
export const withFail = type => `${type}_${Suffix.FAIL}`;
