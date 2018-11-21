import {SET_TOKEN,SET_TYPES} from '../actions/types';

const initialState = {
    subscribed: false,
    token: '',
    types: [
        'IT_MANAGER',
        'CODING',
        'GAMING',
        'ICE_BREAKER',
        'WEB_DESIGNING',
        'TREASURE_HUNT',
        'VLOG',
        'TECH_TALK',
        'MEME',
        'VIDEO_EDITING',
        'MAD_AD',
        'IT_QUIZ',
        'ICE_BREAKER'
    ],
    subscribed_types: []
}

export default function(state = initialState,action) {
    switch(action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                subscribed: true,
                token: action.payload
            }
        }
        case SET_TYPES : {
            return {
                ...state,
                subscribed_types: action.payload
            }
        }
        default: 
            return state;
    }
}