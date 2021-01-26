import { rootReducer } from '@/_reducers';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const store = createStore(
    rootReducer,
    NODE_ENV == 'development' ? composeWithDevTools(applyMiddleware(thunk, createLogger())) : applyMiddleware(thunk),
)