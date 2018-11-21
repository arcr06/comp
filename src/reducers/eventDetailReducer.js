import {SET_EVENT_DETAIL} from '../actions/types';
const initailState = {
    data: [],
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
        'IT_QUIZ'
    ]
};

export default function(state = initailState, action) {
    switch(action.type) {
        case SET_EVENT_DETAIL: {
            return {
                ...state,
                data: action.payload
            }
        }
        default :
            return state
    }
}