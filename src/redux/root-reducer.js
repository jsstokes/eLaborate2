import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import labReducer from './lab/lab.reducer';

export default combineReducers({
    user: userReducer,
    lab: labReducer
})