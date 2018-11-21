import { combineReducers }  from 'redux';
import user from './userReducer';
import eventDetail from './eventDetailReducer';

export default combineReducers({
    user,
    eventDetail,
});