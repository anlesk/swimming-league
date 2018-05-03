import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../Ducks';
import rootSaga from '../Sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware);
let composeEnhancers = compose;

if (process.env.NODE_ENV  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const store = createStore(reducer, {}, composeEnhancers(enhancer));
sagaMiddleware.run(rootSaga);
if (process.env.NODE_ENV ) {
  window.store = store;
}
export default store;

