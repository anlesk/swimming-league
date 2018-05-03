import Suffix from '../../Enums/Suffix';

export const withStart = type => type + Suffix.START;
export const withSuccess = type => type + Suffix.SUCCESS;
export const withFail = type => type + Suffix.FAIL;
export const withLoading = type => type + Suffix.LOADING;