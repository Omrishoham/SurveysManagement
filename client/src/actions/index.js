/*
An action, is an object that contains the payload of information.
They are the only source of information for the Redux store to be updated.
Reducers update store based on the value of the action
*/
import axios from 'axios'
import {FETCH_USER} from './types'

const fetchUser = () =>{
    axios.get('/api/current_user')
}