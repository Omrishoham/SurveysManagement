import {combineReducers} from 'redux';
import authReducer from './authReducer'

//func that returns reducers obj
export default combineReducers({
    auth: authReducer
});