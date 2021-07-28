/*
An action, is an object that contains the payload of information.
They are the only source of information for the Redux store to be updated.
Reducers update store based on the value of the action
*/
import axios from 'axios'
import { FETCH_USER } from './types'

//redux thunk sees function instead action and automatically passes dispatch func to it
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });//after we finish with the axios,then we do dispatch to all reducers
};

export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post('/api/stripe',token);
    dispatch({type:FETCH_USER, payload:res.data});
};

