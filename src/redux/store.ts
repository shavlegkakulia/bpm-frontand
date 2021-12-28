import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { TranslateReducer } from './reducers/translate.reducer';
import { AuthReducer } from './reducers/auth.reducer';

const reducers = combineReducers({TranslateReducer, AuthReducer});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;