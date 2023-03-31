import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import middleware from './middleware';

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(middleware)),
);