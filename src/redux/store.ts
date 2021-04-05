import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { TranslateReducer } from './reducers/translate.reducer';

const reducers = combineReducers({TranslateReducer});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;