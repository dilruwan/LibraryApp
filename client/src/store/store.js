import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import bookReducer from '../reducers/bookReducer';
import sessionReducer from '../reducers/sessionReducer';

const store = createStore(
    combineReducers({
        books: bookReducer,
        session: sessionReducer
    }),
    applyMiddleware(
        thunk
    )
);

export default store;