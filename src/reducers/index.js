import numberChange from './QuantityAction';
import customerLoginStatus from './LoginAction';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    numberChange, customerLoginStatus
});

export default rootReducer;