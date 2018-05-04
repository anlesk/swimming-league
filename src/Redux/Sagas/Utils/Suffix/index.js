import { put } from 'redux-saga/effects';

import { withStart, withSuccess, withFail } from '../../../Utils/withSuffix';


export function putStart(code = '', payload = {}) {
  return put(withStart(code, payload));
}

export function putSuccess(code = '', payload = {}) {
  return put(withSuccess(code, payload));
}

export function putFail(code = '', payload = {}) {
  return put(withFail(code, payload));
}
