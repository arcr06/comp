import {SET_TOKEN,SET_TYPES, SET_EVENT_DETAIL} from './types';
export const setTypes = data  => {
    return {
        type: SET_TYPES,
        payload: data
    }
}
export const setToken = data => {
    return  {
        type: SET_TOKEN,
        payload: data
    }
}
export const setEventDetail = data => {
    return {
        type: SET_EVENT_DETAIL,
        payload: data
    }
}
 