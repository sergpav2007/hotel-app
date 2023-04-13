import rootReducer from './reducers';
import middleware from './middleware';
// import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
  // middleware: [composeWithDevTools(applyMiddleware(middleware))]
});

export default store;