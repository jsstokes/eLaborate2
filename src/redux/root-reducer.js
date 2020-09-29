import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import labReducer from './lab/lab.reducer';
import workshopReducer from './workshop/workshop.reducer'

export default combineReducers({
    user: userReducer,
    lab: labReducer,
    workshop: workshopReducer
})