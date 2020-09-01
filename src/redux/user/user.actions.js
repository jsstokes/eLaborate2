import { USER_ACTION_TYPES } from './user.reducer';

export const setCurrentUser = user => ({
    type: USER_ACTION_TYPES.SET_CURRENT_USER
})