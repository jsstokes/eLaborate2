import {LAB_ACTION_TYPES} from './lab.reducer';

export const setCurrentLab = lab => ({
    type: LAB_ACTION_TYPES.SET_CURRENT_LAB,
    payload: lab
})