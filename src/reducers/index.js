import numberChange from './QuantityAction';
import customerLoginStatus from './LoginAction';
import searchResult from './SearchAction';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    numberChange, customerLoginStatus, searchResult
});

export default rootReducer;