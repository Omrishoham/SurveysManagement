import { FETCH_USER } from "../actions/types";
export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;//return user model if the string is not empty and if its empty string so return false
        default:
            return state;

    }
}